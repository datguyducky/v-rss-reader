import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
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
 * - and of course we also have extra "helper" functions to retrieve and save data in AsyncStorage
 */

const READ_LATER_FEEDS_CATEGORIES_KEY = '@storage_readLaterFeedsCategories';

export const useReadLater = () => {
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');
	const [stateReadLaterFeedsCategories, setStateReadLaterFeedsCategories] = useState<FeedItem[]>(
		[],
	);

	useEffect(() => {
		async function getReadLaterFeedsCategories() {
			let readLaterFeedsCategories = [];

			try {
				const readLaterFeedsCategoriesValue = await AsyncStorage.getItem(
					READ_LATER_FEEDS_CATEGORIES_KEY,
				);
				readLaterFeedsCategories =
					readLaterFeedsCategoriesValue !== null
						? JSON.parse(readLaterFeedsCategoriesValue)
						: [];
			} catch (error) {
				console.error('Error loading feeds and categories', error);
			}

			setStateReadLaterFeedsCategories(readLaterFeedsCategories);
		}

		getReadLaterFeedsCategories();
	}, []);

	const setStorageReadLaterFeedsCategories = async (value: FeedItem[]) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(READ_LATER_FEEDS_CATEGORIES_KEY, jsonValue);
		} catch (error) {
			console.log('Something went wrong when trying to save feed to read later', error);
		}
	};

	const sortedReadLaterFeedsCategories = stateReadLaterFeedsCategories.sort((a, b) => {
		const dateA = new Date(a.published);
		const dateB = new Date(b.published);
		if (feedFilters.SORT_BY === 'OLDEST') {
			return dateA.getTime() - dateB.getTime();
		} else {
			return dateB.getTime() - dateA.getTime();
		}
	});

	const isSavedInReadLater = (id: string) =>
		stateReadLaterFeedsCategories.some(item => item.id === id);

	const addToReadLater = async (feed: FeedItem) => {
		if (!isSavedInReadLater(feed.id)) {
			await setStorageReadLaterFeedsCategories([...stateReadLaterFeedsCategories, feed]);
			setStateReadLaterFeedsCategories(prevReadLaterFeedsCategories => [
				...prevReadLaterFeedsCategories,
				feed,
			]);
		}
	};

	const removeFromReadLater = async (id: string) => {
		if (isSavedInReadLater(id)) {
			const clearedReadLaterFeedsCategories = stateReadLaterFeedsCategories.filter(
				item => item.id !== id,
			);

			await setStorageReadLaterFeedsCategories(clearedReadLaterFeedsCategories);
			setStateReadLaterFeedsCategories(clearedReadLaterFeedsCategories);
		}
	};

	const resetReadLater = async () => {
		await AsyncStorage.removeItem(READ_LATER_FEEDS_CATEGORIES_KEY);
		setStateReadLaterFeedsCategories([]);
	};

	return {
		addToReadLater,
		removeFromReadLater,
		isSavedInReadLater,
		readLaterFeedsCategories: sortedReadLaterFeedsCategories,
		resetReadLater,
	};
};
