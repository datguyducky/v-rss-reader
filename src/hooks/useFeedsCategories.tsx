import { useMMKVObject } from 'react-native-mmkv';
import uuid from 'react-native-uuid';

export const useFeedsCategories = () => {
	const [feedsCategories = [], setFeedsCategories] = useMMKVObject('feedsCategories');

	const sortBySetting = 'LATEST'; // TODO: Use storage here.

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
							`${sortBySetting === 'OLDEST' ? '' : '-'}` +
							a.createdAt.localeCompare(b.createdAt),
				  )
				: undefined,
		}))
		.sort(
			(a, b) =>
				`${sortBySetting === 'OLDEST' ? '' : '-'}` + a.createdAt.localeCompare(b.createdAt),
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
			return setFeedsCategories(
				feedsCategories.map(item => {
					if (item.id === category) {
						console.log({ ...item, feeds: [...item.feeds, newFeedObject] }?.feeds);
						return { ...item, feeds: [...item.feeds, newFeedObject] };
					} else {
						return item;
					}
				}),
			);
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

	// TODO: Add delete function for both categories and feeds.
	// TODO: Add edit function for both categories and feeds.
	// TODO: Check if listeners for changes are needed to make sure that all the data/changes are synced across the whole app.

	return {
		onlyFeeds,
		onlyCategories,
		createFeed,
		createCategory,
		feedsCategories: sortedFeedsCategories,
	};
};
