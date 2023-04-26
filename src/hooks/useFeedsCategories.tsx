import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMMKVObject } from 'react-native-mmkv';
import uuid from 'react-native-uuid';

import { DEFAULT_SETTINGS_VALUES } from '@common/constants';
import { CategoryFormValues } from '@forms/CategoryForm/CategoryForm';
import { FeedFormValues } from '@forms/FeedForm/FeedForm';
import { SettingsFormValues } from '@forms/SettingsForm';
import { findItemAndParentById } from '@utils/findItemAndParentById';

export const FEEDS_CATEGORIES_STORAGE_KEY = '@storage_feedsCategories';
export const ACTIVE_ITEM_STORAGE_KEY = '@storage_activeItem';

export interface Feed {
	id: string;
	type: 'FEED';
	createdAt: string;
	name: string;
	url: string;
}

export interface Category {
	id: string;
	type: 'CATEGORY';
	createdAt: string;
	name: string;
	feeds: Feed[];
}

function useFeedsCategories() {
	const [appSettings = DEFAULT_SETTINGS_VALUES] =
		useMMKVObject<SettingsFormValues>('appSettings');

	const [stateFeedsCategories, setStateFeedsCategories] = useState<(Feed | Category)[]>([]);
	const [onlyFeeds, setOnlyFeeds] = useState<Feed[]>([]);
	const [onlyCategories, setOnlyCategories] = useState<Category[]>([]);

	const [stateActiveItem, setStateActiveItem] = useState<Feed | Category | null>(null);

	useEffect(() => {
		const getFeedsCategories = async () => {
			let feedsCategories: (Feed | Category)[] = [];

			try {
				const feedsCategoriesValue = await AsyncStorage.getItem(
					FEEDS_CATEGORIES_STORAGE_KEY,
				);
				feedsCategories =
					feedsCategoriesValue !== null ? JSON.parse(feedsCategoriesValue) : [];
			} catch (error) {
				console.error('Error loading feeds and categories', error);
			}

			const sortedFeedsCategories = sortFeedsCategories(feedsCategories);
			const sortedOnlyFeeds = sortOnlyFeeds(sortedFeedsCategories);
			const sortedOnlyCategories = sortOnlyCategories(sortedFeedsCategories);

			setStateFeedsCategories(sortedFeedsCategories);
			setOnlyFeeds(sortedOnlyFeeds);
			setOnlyCategories(sortedOnlyCategories);
		};

		getFeedsCategories();
	}, [appSettings.sortAlphabetically]);

	const sortFeedsCategories = (feedsCategories: (Feed | Category)[]) => {
		return feedsCategories
			.map(item => {
				const objectToSort = { ...item };
				if (objectToSort.type === 'CATEGORY') {
					objectToSort.feeds = objectToSort.feeds.sort((a, b) =>
						(appSettings.sortAlphabetically ? a : b).name.localeCompare(
							(appSettings.sortAlphabetically ? b : a).name,
							undefined,
							{
								ignorePunctuation: true,
								sensitivity: 'base',
							},
						),
					);
				}

				return objectToSort;
			})
			.sort((a, b) =>
				(appSettings.sortAlphabetically ? a : b).name.localeCompare(
					(appSettings.sortAlphabetically ? b : a).name,
					undefined,
					{
						ignorePunctuation: true,
						sensitivity: 'base',
					},
				),
			);
	};

	const sortOnlyFeeds = (feedsCategories: (Feed | Category)[], sortFirst = false) => {
		let sortedFeedsCategories = feedsCategories;

		if (sortFirst) {
			sortedFeedsCategories = sortFeedsCategories(feedsCategories);
		}

		return sortedFeedsCategories.flatMap(item => (item.type === 'FEED' ? item : []));
	};

	const sortOnlyCategories = (feedsCategories: (Feed | Category)[], sortFirst = false) => {
		let sortedFeedsCategories = feedsCategories;

		if (sortFirst) {
			sortedFeedsCategories = sortFeedsCategories(feedsCategories);
		}

		return sortedFeedsCategories.flatMap(item => (item.type === 'CATEGORY' ? item : []));
	};

	const syncFeedsCategories = async (feedsCategories: (Feed | Category)[]) => {
		const sortedFeedsCategories = sortFeedsCategories(feedsCategories);
		const onlyFeeds = sortOnlyFeeds(sortedFeedsCategories);
		const onlyCategories = sortOnlyCategories(sortedFeedsCategories);

		await setStorageFeedsCategories(sortedFeedsCategories);
		setStateFeedsCategories(sortedFeedsCategories);

		setOnlyFeeds(onlyFeeds);
		setOnlyCategories(onlyCategories);
	};

	const findFeedCategory = async (id: string) => {
		const feedsCategories = await getStorageFeedsCategories();
		return findItemAndParentById(id, feedsCategories);
	};

	const getStorageFeedsCategories = async () => {
		let feedsCategories: (Feed | Category)[] = [];

		try {
			const feedsCategoriesValue = await AsyncStorage.getItem(FEEDS_CATEGORIES_STORAGE_KEY);
			feedsCategories = feedsCategoriesValue !== null ? JSON.parse(feedsCategoriesValue) : [];
		} catch (error) {
			console.error('Error loading feeds and categories', error);
		}

		return feedsCategories;
	};

	const setStorageFeedsCategories = async (value: (Feed | Category)[]) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(FEEDS_CATEGORIES_STORAGE_KEY, jsonValue);
		} catch (error) {
			console.log(
				'Something went wrong when trying to save data to feeds and categories storage',
				error,
			);
		}
	};

	const createFeed = async (newFeed: FeedFormValues) => {
		const feedsCategories = await getStorageFeedsCategories();
		const { category, ...newFeedData } = newFeed;

		const newFeedObject: Feed = {
			...newFeedData,
			id: uuid.v4() as string,
			type: 'FEED',
			createdAt: new Date().toISOString(),
		};

		if (category) {
			/**
			 * Here we find the category that was selected by user, by using `id` field.
			 * Then we add this new category under the "feeds" field on that category,
			 * and we save all of that back to MMKV storage.
			 */
			const itemsWithNewItem = feedsCategories.map(item => {
				if (item.id === category && item.type === 'CATEGORY') {
					return { ...item, feeds: [...item.feeds, newFeedObject] };
				} else {
					return item;
				}
			});

			await syncFeedsCategories(itemsWithNewItem);
		} else {
			await syncFeedsCategories([...feedsCategories, newFeedObject]);
		}
	};

	const createCategory = async (newCategory: CategoryFormValues) => {
		const feedsCategories = await getStorageFeedsCategories();

		const newCategoryObject: Category = {
			...newCategory,
			id: uuid.v4() as string,
			type: 'CATEGORY',
			feeds: [],
			createdAt: new Date().toISOString(),
		};

		await syncFeedsCategories([...feedsCategories, newCategoryObject]);
	};

	const editFeed = async (id: string, newValues: FeedFormValues) => {
		const { category, ...values } = newValues;
		const feedsCategories = await getStorageFeedsCategories();

		const feedToEdit = await findFeedCategory(id);

		if (!feedToEdit?.item) {
			throw new Error('FEED_DOES_NOT_EXIST');
		}

		// Making sure that the edited values are also synced with the activeItemDetails object
		if (id === stateActiveItem?.id) {
			await setStorageActiveItem({ ...feedToEdit?.item, ...values });
			setStateActiveItem({ ...feedToEdit?.item, ...values });
		}

		// Removing it from one category and putting it under another one
		if (feedToEdit?.parent?.id && category !== feedToEdit?.parent?.id) {
			const afterRemoveData = feedsCategories.map(obj => {
				if (
					obj.id === feedToEdit?.parent?.id &&
					'feeds' in obj &&
					obj.feeds &&
					obj.feeds.length > 0
				) {
					obj.feeds = obj.feeds.filter(feed => feed.id !== id);
					return obj;
				}

				return obj;
			});

			// Putting it under different category
			if (category) {
				const editedFeedsCategories = afterRemoveData.map(item => {
					const newItem = { ...item };

					if (newItem.id === category && newItem.type === 'CATEGORY') {
						if (feedToEdit?.item) {
							const newValues = { ...feedToEdit.item } as Feed;

							newItem.feeds = [...newItem.feeds, { ...newValues, ...values }];
						}
					}

					return newItem;
				});

				await syncFeedsCategories(editedFeedsCategories);
			}
			// Putting it under the root array
			else {
				const editedFeedsCategories = [
					...afterRemoveData,
					{ ...feedToEdit?.item, ...values },
				];

				await syncFeedsCategories(editedFeedsCategories);
			}
		}
		// Editing it when category was not changed
		else if (category === feedToEdit?.parent?.id) {
			// When feed is under category
			if (feedToEdit?.parent?.id) {
				const editedFeedsCategories = feedsCategories.map(item => {
					const newItem = { ...item };

					if (newItem.id === category && newItem.type === 'CATEGORY') {
						newItem.feeds = newItem.feeds.map(feedItem =>
							feedItem.id === id ? { ...feedItem, ...values } : { ...feedItem },
						);
					}

					return newItem;
				});

				await syncFeedsCategories(editedFeedsCategories);
			}
			// When feed is under the root category
			else {
				const editedFeedsCategories = feedsCategories.map(item =>
					item.id === id ? { ...item, ...values } : { ...item },
				);

				await syncFeedsCategories(editedFeedsCategories);
			}
		}
		// When feed is under the root array, and we try to move it under a category
		else if (category && !feedToEdit?.parent?.id) {
			const afterRemoveData = feedsCategories.filter(obj => obj.id !== id);

			const editedFeedsCategories = afterRemoveData.map(item => {
				const newItem = { ...item };

				if (newItem.id === category && newItem.type === 'CATEGORY') {
					if (feedToEdit?.item) {
						const newValues = { ...feedToEdit.item } as Feed;

						newItem.feeds = [...newItem.feeds, { ...newValues, ...values }];
					}
				}

				return newItem;
			});

			await syncFeedsCategories(editedFeedsCategories);
		}
	};

	const editCategory = async (id: string, newValues: CategoryFormValues) => {
		const categoryToEdit = (await findFeedCategory(id))?.item;
		const feedsCategories = await getStorageFeedsCategories();

		if (!categoryToEdit) {
			throw new Error('CATEGORY_DOES_NOT_EXIST');
		}

		const updatedList = feedsCategories.map(category => {
			if (category.id === id) {
				// Here are making sure that activeItemDetails are in synced
				if (id === stateActiveItem?.id) {
					setStorageActiveItem({ ...category, ...newValues });
					setStateActiveItem({ ...category, ...newValues });
				}

				return { ...category, ...newValues };
			} else {
				return category;
			}
		});

		await syncFeedsCategories(updatedList);
	};

	const deleteItem = async (id: string) => {
		const feedsCategories = await getStorageFeedsCategories();

		// I feel like this should be done using .filter() method (or maybe something else) but for some reason with code similar to this one, feeds of category never got updated correctly so for now I'm using simple map
		const clearedFeedsCategories = feedsCategories
			.map(item => {
				if (item.type === 'CATEGORY') {
					if (item.id === id) {
						return false; // Remove category
					} else {
						const updatedFeeds = item.feeds.filter(feed => feed.id !== id); // When needed remove feed from a category
						return { ...item, feeds: updatedFeeds }; // Return updated category
					}
				} else {
					if (item.id === id) {
						return false; // Remove feed
					} else {
						return item; // Return feed without updating it
					}
				}
			})
			.filter(Boolean); // Filter our boolean values - items that got removed

		await syncFeedsCategories(clearedFeedsCategories as (Feed | Category)[]);
	};

	useEffect(() => {
		const fetchActiveItem = async () => {
			try {
				const activeItemValue = await AsyncStorage.getItem(ACTIVE_ITEM_STORAGE_KEY);
				setStateActiveItem(activeItemValue !== null ? JSON.parse(activeItemValue) : null);
			} catch (error) {
				console.error('Error loading active item', error);
			}
		};

		fetchActiveItem();
	}, []);

	const setStorageActiveItem = async (value: Feed | Category) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(ACTIVE_ITEM_STORAGE_KEY, jsonValue);
		} catch (error) {
			console.error('Something went wrong when trying to set active item to storage', error);
		}
	};

	const setActiveItem = async (id?: string) => {
		if (id) {
			const foundItem = (await findFeedCategory(id))?.item;

			if (foundItem) {
				await setStorageActiveItem(foundItem);
				setStateActiveItem(foundItem);
			}
		} else {
			await AsyncStorage.removeItem(ACTIVE_ITEM_STORAGE_KEY);
			setStateActiveItem(null);
		}
	};

	const resetFeedsCategories = async () => {
		await AsyncStorage.removeItem(FEEDS_CATEGORIES_STORAGE_KEY);
		setStateFeedsCategories([]);
		setOnlyFeeds([]);
		setOnlyCategories([]);
	};
	const resetActiveItem = async () => {
		await AsyncStorage.removeItem(ACTIVE_ITEM_STORAGE_KEY);
		setStateActiveItem(null);
	};

	return {
		feedsCategories: stateFeedsCategories,
		onlyFeeds,
		onlyCategories,
		findFeedCategory,
		createFeed,
		createCategory,
		editFeed,
		editCategory,
		deleteItem,
		activeItem: stateActiveItem,
		setStorageActiveItem,
		setActiveItem,
		resetFeedsCategories,
		resetActiveItem,
	};
}

export default useFeedsCategories;
