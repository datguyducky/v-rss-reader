import React, { createContext, ReactElement, useContext } from 'react';

import { CategoryFormValues } from '@forms/CategoryForm/CategoryForm';
import { FeedFormValues } from '@forms/FeedForm/FeedForm';
import useFeedsCategories, { Category, Feed } from '@hooks/useFeedsCategories';
import { SearchResult } from '@utils/findItemAndParentById';

interface FeedsCategoriesContextValue {
	feedsCategories: (Feed | Category)[];
	onlyFeeds: Feed[];
	onlyCategories: Category[];
	findFeedCategory: (id: string) => Promise<SearchResult | undefined>;
	createFeed: (newFeed: FeedFormValues) => Promise<void>;
	createCategory: (newCategory: CategoryFormValues) => Promise<void>;
	editFeed: (id: string, newValues: FeedFormValues) => Promise<void>;
	editCategory: (id: string, newValues: CategoryFormValues) => Promise<void>;
	deleteItem: (id: string) => Promise<void>;
	activeItem: Feed | Category | null;
	setStorageActiveItem: (value: Feed | Category) => void;
	setActiveItem: (id?: string) => void;
	resetFeedsCategories: () => Promise<void>;
	resetActiveItem: () => Promise<void>;
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
	setStorageActiveItem: () => {},
	setActiveItem: async () => {},
	resetFeedsCategories: async () => {},
	resetActiveItem: async () => {},
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
		resetFeedsCategories,
		resetActiveItem,
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
				resetFeedsCategories,
				resetActiveItem,
			}}
		>
			{children}
		</FeedsCategoriesContext.Provider>
	);
};

export const useFeedsCategoriesContext = () => useContext(FeedsCategoriesContext);
