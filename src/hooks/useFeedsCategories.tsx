import { useMMKVObject } from 'react-native-mmkv';
import uuid from 'react-native-uuid';
import { DEFAULT_FILTERS_VALUES } from '../common/constants';
import { FilterFormValues } from '../drawers/Filters';

export const useFeedsCategories = () => {
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');

	const [feedsCategories = [], setFeedsCategories] = useMMKVObject('feedsCategories');
	const [activeItemDetails, storageSetActiveItemDetails] = useMMKVObject('activeItemDetails');

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

	const findFeedCategory = (id: string) => feedsCategories.find(item => item.id === id);

	const setActiveItemDetails = (id?: string) => {
		if (id) {
			const foundItem = findFeedCategory(id);

			return storageSetActiveItemDetails(foundItem);
		}

		storageSetActiveItemDetails(undefined);
	};

	const deleteItem = (id: string) => {
		const afterDeleteItems = feedsCategories.filter(obj => obj.id !== id);
		setFeedsCategories(afterDeleteItems);
	};

	const editCategory = (id: string, newValues: Record<string, unknown>) => {
		const categoryToEdit = findFeedCategory(id);

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

	const editFeed = (id: string, newValues: Record<string, unknown>) => {
		/**
		 * Here we need to do couple of things to correctly update a feed:
		 * 	- first we need to check that the feed we try to edit even exists
		 * 	- then we find that feed we try to edit (it may be just in the root array or inside one of the "feeds" fields on a category)
		 * 	- then we need to edit the values of that feed
		 * 	- and we need to do one of those things:
		 * 		- remove it from root array and add it under an existing category
		 * 		- remove it from one category and add it under a different one
		 * 		- remove it from a category and add it in the root array of thw items
		 * 	- and then we save all of these changes to storage and hope that it works :)
		 */
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
	};
};
