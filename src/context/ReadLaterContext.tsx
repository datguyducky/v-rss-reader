import React, { createContext, ReactElement, useContext } from 'react';

import { useReadLater } from '@hooks/useReadLater';

import { RssFeedItem } from '../@types';

interface ReadLaterContextValue {
	readLaterFeedsCategories: RssFeedItem[];
	addToReadLater: (feed: RssFeedItem) => Promise<void>;
	removeFromReadLater: (id: string) => Promise<void>;
	isSavedInReadLater: (id: string) => boolean;
	resetReadLater: () => Promise<void>;
}

const ReadLaterContext = createContext<ReadLaterContextValue>({
	readLaterFeedsCategories: [],
	addToReadLater: async () => {},
	removeFromReadLater: async () => {},
	isSavedInReadLater: () => false,
	resetReadLater: async () => {},
});

export const ReadLaterProvider = ({ children }: { children: ReactElement }) => {
	const {
		readLaterFeedsCategories,
		addToReadLater,
		removeFromReadLater,
		isSavedInReadLater,
		resetReadLater,
	} = useReadLater();

	return (
		<ReadLaterContext.Provider
			value={{
				readLaterFeedsCategories,
				addToReadLater,
				removeFromReadLater,
				isSavedInReadLater,
				resetReadLater,
			}}
		>
			{children}
		</ReadLaterContext.Provider>
	);
};

export const useReadLaterContext = () => useContext(ReadLaterContext);
