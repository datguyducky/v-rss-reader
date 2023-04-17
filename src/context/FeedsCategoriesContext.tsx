import React, { createContext, ReactElement, useContext } from 'react';

import useFeedsCategories from '../hooks/useFeedsCategories';
import { SearchResult } from '../utils/findItemAndParentById';

interface FeedsCategoriesContextValue {
	feedsCategories: Record<string, unknown>[];
	onlyFeeds: Record<string, unknown>[];
	onlyCategories: Record<string, unknown>[];
	findFeedCategory: (id: string) => Promise<SearchResult | undefined>;
	createFeed: (newFeed: unknown) => Promise<void>;
	createCategory: (newCategory: unknown) => Promise<void>;
	editFeed: (id: string, newValues: Record<string, unknown>) => Promise<void>;
	editCategory: (id: string, newValues: Record<string, unknown>) => Promise<void>;
	deleteItem: (id: string) => Promise<void>;
	activeItem: Record<string, unknown> | null;
	setStorageActiveItem: (value: unknown) => void;
	setActiveItem: () => void;
}

const FeedsCategoriesContext = createContext<FeedsCategoriesContextValue>({
	feedsCategories: [],
	onlyFeeds: [],
	onlyCategories: [],
	findFeedCategory: async () => undefined,
	createFeed: async () => undefined,
	createCategory: async () => undefined,
	editFeed: async () => undefined,
	editCategory: async () => undefined,
	deleteItem: async () => undefined,
	activeItem: null,
	setStorageActiveItem: (value: unknown) => {},
	setActiveItem: async () => {},
});

export const FeedsCategoriesProvider = ({ children }: { children: ReactElement }) => {
	const {
		feedsCategories,
		onlyFeeds,
		onlyCategories,
		findFeedCategory,
		createFeed,
		createCategory,
		editFeed,
		editCategory,
		deleteItem,
		activeItem,
		setStorageActiveItem,
		setActiveItem,
	} = useFeedsCategories();

	return (
		<FeedsCategoriesContext.Provider
			value={{
				feedsCategories,
				onlyFeeds,
				onlyCategories,
				findFeedCategory,
				createFeed,
				createCategory,
				editFeed,
				editCategory,
				deleteItem,
				activeItem,
				setStorageActiveItem,
				setActiveItem,
			}}
		>
			{children}
		</FeedsCategoriesContext.Provider>
	);
};

export const useFeedsCategoriesContext = () => useContext(FeedsCategoriesContext);
