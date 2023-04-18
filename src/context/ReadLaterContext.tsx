import React, { createContext, ReactElement, useContext } from 'react';
import { FeedItem } from 'react-native-rss-parser';

import { useReadLater } from '../hooks/useReadLater';

interface ReadLaterContextValue {
	readLaterFeedsCategories: FeedItem[];
	addToReadLater: (feed: FeedItem) => Promise<void>;
	removeFromReadLater: (id: string) => Promise<void>;
	isSavedInReadLater: (id: string) => boolean;
}

const ReadLaterContext = createContext<ReadLaterContextValue>({
	readLaterFeedsCategories: [],
	addToReadLater: async () => {},
	removeFromReadLater: async () => {},
	isSavedInReadLater: () => false,
});

export const ReadLaterProvider = ({ children }: { children: ReactElement }) => {
	const { readLaterFeedsCategories, addToReadLater, removeFromReadLater, isSavedInReadLater } =
		useReadLater();

	return (
		<ReadLaterContext.Provider
			value={{
				readLaterFeedsCategories,
				addToReadLater,
				removeFromReadLater,
				isSavedInReadLater,
			}}
		>
			{children}
		</ReadLaterContext.Provider>
	);
};

export const useReadLaterContext = () => useContext(ReadLaterContext);
