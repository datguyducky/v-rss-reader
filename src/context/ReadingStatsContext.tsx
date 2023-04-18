import React, { createContext, ReactElement, useContext } from 'react';

import { useReadingStats } from '../hooks/useReadingStats';

interface ReadingStatsContextValue {
	feedsOpened: string;
	averageFeedsPerDay: string;
	currentStreak: string;
	longestStreak: string;
	currentStreakAverageFeedsPerDay: string;
	longestStreakAverageFeedsPerDay: string;
	resetReadingStats: () => Promise<void>;
	handleReadingStats: () => Promise<void>;
}

const ReadingStatsContext = createContext<ReadingStatsContextValue>({
	feedsOpened: '00',
	averageFeedsPerDay: '00',
	currentStreak: '00',
	longestStreak: '00',
	currentStreakAverageFeedsPerDay: '00',
	longestStreakAverageFeedsPerDay: '00',
	resetReadingStats: async () => {},
	handleReadingStats: async () => {},
});

export const ReadingStatsProvider = ({ children }: { children: ReactElement }) => {
	const {
		feedsOpened,
		averageFeedsPerDay,
		currentStreak,
		longestStreak,
		currentStreakAverageFeedsPerDay,
		longestStreakAverageFeedsPerDay,
		resetReadingStats,
		handleReadingStats,
	} = useReadingStats();

	return (
		<ReadingStatsContext.Provider
			value={{
				feedsOpened,
				averageFeedsPerDay,
				currentStreak,
				longestStreak,
				currentStreakAverageFeedsPerDay,
				longestStreakAverageFeedsPerDay,
				resetReadingStats,
				handleReadingStats,
			}}
		>
			{children}
		</ReadingStatsContext.Provider>
	);
};

export const useReadingStatsContext = () => useContext(ReadingStatsContext);
