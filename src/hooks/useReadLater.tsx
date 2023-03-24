import { useMMKVObject } from 'react-native-mmkv';
import { FeedItem } from 'react-native-rss-parser';

import { DEFAULT_FILTERS_VALUES } from '../common/constants';
import { FilterFormValues } from '../drawers/Filters';

/**
 * As this is quite a simple hook I feel like there is no need to describe methods used here separately, so I will describe all of them in this one comment.
 * It's possible in the app to save a specific feed to a "read later" storage, just a name implies -> for reading it later. We of course also support removing an item from that storage.
 *
 * Here's a short description of each method used in here:
 * - "sortedReadFeedsCategories" - here we just sort all feeds (as it's the case on other views in the app) based on the user settings;
 * - "isSavedInReadLater" - as name implies, we check if a specific item is stored in the "read later" storage,
 * 							we use this method as a validation method before removing or adding an item to a storage, and also as way to decide what to render;
 * - "addToReadLater" - here just save passed item to the storage (we also make sure that it doesn't exist in it before adding it there);
 * - "removeFromReadLater" - as name implies, we remove item from the storage;
 */
export const useReadLater = () => {
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');
	const [readLaterFeedsCategories = [], setReadLaterFeedsCategories] = useMMKVObject<FeedItem[]>(
		'readLaterFeedsCategories',
	);

	const sortedReadLaterFeedsCategories = readLaterFeedsCategories.sort((a, b) => {
		const dateA = new Date(a.published);
		const dateB = new Date(b.published);
		if (feedFilters.SORT_BY === 'OLDEST') {
			return dateA.getTime() - dateB.getTime();
		} else {
			return dateB.getTime() - dateA.getTime();
		}
	});

	const isSavedInReadLater = (id: string) =>
		readLaterFeedsCategories.some(item => item.id === id);

	const addToReadLater = (feed: FeedItem) => {
		if (!isSavedInReadLater(feed.id)) {
			setReadLaterFeedsCategories([...readLaterFeedsCategories, feed]);
		}
	};

	const removeFromReadLater = (id: string) => {
		if (isSavedInReadLater(id)) {
			const clearedReadLaterFeedsCategories = readLaterFeedsCategories.filter(
				item => item.id !== id,
			);

			setReadLaterFeedsCategories(clearedReadLaterFeedsCategories);
		}
	};

	return {
		addToReadLater,
		removeFromReadLater,
		isSavedInReadLater,
		readLaterFeedsCategories: sortedReadLaterFeedsCategories,
	};
};
