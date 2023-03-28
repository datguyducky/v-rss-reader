import { useMMKVObject } from 'react-native-mmkv';
import uuid from 'react-native-uuid';
import { DEFAULT_FILTERS_VALUES } from '../common/constants';
import { FilterFormValues } from '../drawers/Filters';
import { findItemAndParentById } from '../utils/findItemAndParentById';

export const useFeedsCategories = () => {
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');

	const [feedsCategories = [], setFeedsCategories] = useMMKVObject('feedsCategories');
	const [activeItemDetails, storageSetActiveItemDetails] = useMMKVObject('activeItemDetails');

	// TODO: It should be sorted alphabetically
	/**
	 * Before doing anything else with the feeds and categories array, we first sort it by the 'createdAt' field.
	 * It's possible to sort it by latest or oldest feeds/categories.
	 *
	 * Also, it's worth mentioning that the 'feeds' field for each category is sorted with the same principle as the main one is.
	 */
	const sortedFeedsCategories = feedsCategories
		.map(item => ({
			...item,
			feeds: item?.feeds
				? item.feeds.sort(
						(a, b) =>
							`${feedFilters.SORT_BY === 'OLDEST' ? '' : '-'}` +
							a.createdAt.localeCompare(b.createdAt),
				  )
				: undefined,
		}))
		.sort(
			(a, b) =>
				`${feedFilters.SORT_BY === 'OLDEST' ? '' : '-'}` +
				a.createdAt.localeCompare(b.createdAt),
		);

	const onlyFeeds = sortedFeedsCategories.filter(o => o.type === 'FEED');
	const onlyCategories = sortedFeedsCategories.filter(o => o.type === 'CATEGORY');

	const createFeed = newFeed => {
		const { category, ...newFeedData } = newFeed;

		const newFeedObject = {
			...newFeedData,
			id: uuid.v4(),
			type: 'FEED',
			createdAt: new Date().toISOString(),
		};

		if (category) {
			/**
			 * Here we find the category that was selected by user, by using `id` field.
			 * Then we add this new category under the "feeds" field on that category
			 * and the we save all of that back to MMKV storage.
			 */
			const itemsWithNewItem = feedsCategories.map(item => {
				if (item.id === category) {
					return { ...item, feeds: [...item.feeds, newFeedObject] };
				} else {
					return item;
				}
			});

			return setFeedsCategories(itemsWithNewItem);
		}

		return setFeedsCategories([...feedsCategories, newFeedObject]);
	};

	const createCategory = newCategory => {
		setFeedsCategories([
			...feedsCategories,
			{
				...newCategory,
				id: uuid.v4(),
				type: 'CATEGORY',
				feeds: [],
				createdAt: new Date().toISOString(),
			},
		]);
	};

	const findFeedCategory = (id: string) => findItemAndParentById(id, feedsCategories);

	const setActiveItemDetails = (id?: string) => {
		if (id) {
			const foundItem = findFeedCategory(id)?.item;

			return storageSetActiveItemDetails(foundItem);
		}

		storageSetActiveItemDetails(undefined);
	};

	const deleteItem = (id: string) => {
		const clearedFeedsCategories = feedsCategories
			.map(obj => {
				if (obj.id === id) {
					return null;
				}

				const newObj = { ...obj };

				if (newObj.feeds) {
					newObj.feeds = newObj.feeds.filter(feed => {
						if (feed.id === id) {
							return false;
						}

						return true;
					});
				}

				return newObj;
			})
			.filter(Boolean);

		setFeedsCategories(clearedFeedsCategories);
	};

	const editCategory = (id: string, newValues: Record<string, unknown>) => {
		const categoryToEdit = findFeedCategory(id)?.item;

		if (!categoryToEdit) {
			throw new Error('CATEGORY_DOES_NOT_EXIST');
		}

		const updatedList = feedsCategories.map(category => {
			if (category.id === id) {
				// Here are making sure that activeItemDetails are in synced
				if (id === activeItemDetails?.id) {
					storageSetActiveItemDetails({ ...category, ...newValues });
				}

				return { ...category, ...newValues };
			} else {
				return category;
			}
		});

		setFeedsCategories(updatedList);
	};

	/**
	 * We can edit a feed in a variety of ways:
	 * - values can be just changed, without moving it somewhere else;
	 * - feed can be be moved from root array to one of the categories;
	 * - feed can be moved from one category to another
	 * - move it from a category to the root array
	 */
	const editFeed = (id: string, newValues: Record<string, unknown>) => {
		const { category, ...values } = newValues;

		const feedToEdit = findFeedCategory(id);

		if (!feedToEdit?.item) {
			throw new Error('FEED_DOES_NOT_EXIST');
		}

		// Making sure that the edited values are also synced with the activeItemDetails object
		if (id === activeItemDetails?.id) {
			storageSetActiveItemDetails({ ...feedToEdit?.item, ...values });
		}

		// Removing it from one category and putting it under another one
		if (feedToEdit?.parent?.id && category !== feedToEdit?.parent?.id) {
			const afterRemoveData = feedsCategories.map(obj => {
				if (obj.id === feedToEdit?.parent?.id && obj.feeds && obj.feeds.length > 0) {
					obj.feeds = obj.feeds.filter(feed => feed.id !== id);
					return obj;
				}

				return obj;
			});

			// Putting it under different category
			if (category) {
				const editedFeedsCategories = afterRemoveData.map(item =>
					item.id === category
						? { ...item, feeds: [...item.feeds, { ...feedToEdit?.item, ...values }] }
						: { ...item },
				);

				return setFeedsCategories(editedFeedsCategories);
			}
			// Putting it under the root array
			else {
				const editedFeedsCategories = [
					...afterRemoveData,
					{ ...feedToEdit?.item, ...values },
				];

				return setFeedsCategories(editedFeedsCategories);
			}
		}
		// Editing it when category was not changed
		else if (category === feedToEdit?.parent?.id) {
			// When feed is under category
			if (feedToEdit?.parent?.id) {
				const editedFeedsCategories = feedsCategories.map(item =>
					item.id === category
						? {
								...item,
								feeds: item.feeds.map(feedItem =>
									feedItem.id === id
										? { ...feedItem, ...values }
										: { ...feedItem },
								),
						  }
						: { ...item },
				);

				return setFeedsCategories(editedFeedsCategories);
			}
			// When feed is under the root category
			else {
				const editedFeedsCategories = feedsCategories.map(item =>
					item.id === id ? { ...item, ...values } : { ...item },
				);

				return setFeedsCategories(editedFeedsCategories);
			}
		}
		// When feed is under the root array and we try to move it under a category
		else if (category && !feedToEdit?.parent?.id) {
			const afterRemoveData = feedsCategories.filter(obj => obj.id !== id);

			const editedFeedsCategories = afterRemoveData.map(item =>
				item.id === category
					? {
							...item,
							feeds: [...item.feeds, { ...feedToEdit?.item, ...values }],
					  }
					: { ...item },
			);

			return setFeedsCategories(editedFeedsCategories);
		}
	};

	// TODO: Check if listeners for changes are needed to make sure that all the data/changes are synced across the whole app.
	return {
		onlyFeeds,
		onlyCategories,
		createFeed,
		createCategory,
		feedsCategories: sortedFeedsCategories,
		findFeedCategory,
		activeItemDetails,
		setActiveItemDetails,
		deleteItem,
		editCategory,
		editFeed,
	};
};
