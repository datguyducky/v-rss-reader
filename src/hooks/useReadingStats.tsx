import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const STATS_STORAGE_KEYS = [
	'@statistics_feedsOpened',
	'@statistics_feedsPerDay',
	'@statistics_currentStreak',
	'@statistics_longestStreak',
	'@statistics_currentStreakStart',
	'@statistics_longestStreakStart',
	'@statistics_longestStreakEnd',
];

export const useReadingStats = () => {
	const [feedsOpened, setFeedsOpened] = useState(0);
	const [feedsPerDay, setFeedsPerDay] = useState<Record<string, number>>({});
	const [currentStreak, setCurrentStreak] = useState(0);
	const [longestStreak, setLongestStreak] = useState(0);
	const [currentStreakStart, setCurrentStreakStart] = useState<string | null>(null);
	const [longestStreakStart, setLongestStreakStart] = useState<string | null>(null);
	const [longestStreakEnd, setLongestStreakEnd] = useState<string | null>(null);

	useEffect(() => {
		const fetchStatsFromStorage = async () => {
			try {
				const [
					[, feedsOpenedValue],
					[, feedsPerDayValue],
					[, currentStreakValue],
					[, longestStreakValue],
					[, currentStreakStartValue],
					[, longestStreakStartValue],
					[, longestStreakEndValue],
				] = await AsyncStorage.multiGet(STATS_STORAGE_KEYS);

				setFeedsOpened(feedsOpenedValue !== null ? parseInt(feedsOpenedValue, 10) : 0);
				setFeedsPerDay(feedsPerDayValue !== null ? JSON.parse(feedsPerDayValue) : {});
				setCurrentStreak(
					currentStreakValue !== null ? parseInt(currentStreakValue, 10) : 0,
				);
				setLongestStreak(
					longestStreakValue !== null ? parseInt(longestStreakValue, 10) : 0,
				);
				setCurrentStreakStart(
					currentStreakStartValue !== null ? currentStreakStartValue : null,
				);
				setLongestStreakStart(
					longestStreakStartValue !== null ? longestStreakStartValue : null,
				);
				setLongestStreakEnd(longestStreakEndValue !== null ? longestStreakEndValue : null);
			} catch (error) {
				console.error('Error loading reading stats:', error);
			}
		};

		fetchStatsFromStorage();
	}, []);

	const handleReadingStats = async () => {
		// Not sure how I feel about using these variables here, but from all the things that I've tried this is one, is the only that really worked.
		// As this is used to make sure that all the data (from storage) in this function is synced, so the proper "if" statements can be used.
		let copyFeedsOpened = feedsOpened;
		let copyFeedsPerDay = feedsPerDay;
		let copyCurrentStreak = currentStreak;
		let copyCurrentStreakStart = currentStreakStart;
		let copyLongestStreak = longestStreak;
		let copyLongestStreakStart = longestStreakStart;
		let copyLongestStreakEnd = longestStreakEnd;

		// Get today's date
		const today = new Date().toISOString().slice(0, 10);

		// Check if user already clicked on a feed today
		const clickedToday = feedsPerDay[today] !== undefined;

		// Update feeds opened count
		setFeedsOpened(prevFeedsOpened => prevFeedsOpened + 1);
		copyFeedsOpened += 1;

		// Update feeds opened per day
		const clicksForToday = feedsPerDay[today] || 0;
		setFeedsPerDay(prevFeedsPerDay => ({
			...prevFeedsPerDay,
			[today]: (prevFeedsPerDay?.[today] || 0) + 1,
		}));
		copyFeedsPerDay = { ...copyFeedsPerDay, [today]: (copyFeedsPerDay?.[today] || 0) + 1 };

		// This checks how many days passed from the last time that a feed was opened (0 and 1 are fine, more than that breaks the streak)
		const localFeedsPerDayArray = Object.keys(copyFeedsPerDay);
		const millisecondsPerDay = 1000 * 60 * 60 * 24;
		const timeDiff =
			localFeedsPerDayArray.length > 1
				? Date.parse(localFeedsPerDayArray[localFeedsPerDayArray.length - 1]) -
				  Date.parse(localFeedsPerDayArray[localFeedsPerDayArray.length - 2])
				: 0;
		const daysDiff = Math.floor(timeDiff / millisecondsPerDay);

		// Here we start the consecutive days count
		if (!clickedToday && currentStreakStart === null) {
			setCurrentStreak(0);
			setCurrentStreakStart(today);

			copyCurrentStreak = 0;
			copyCurrentStreakStart = today;
		}
		// This start the consecutive days count again, after it was reset to 0 when the streak was broken
		else if (currentStreak === 0 && clicksForToday === 0 && currentStreakStart) {
			setCurrentStreak(prevCurrentStreak => prevCurrentStreak + 1);

			copyCurrentStreak += 1;
		}
		// Here we add another day to the consecutive days count - as long as it was the first feed press today
		// and as long as today is the next day after the last time that feed was opened
		else if (currentStreak > 0 && clicksForToday === 0 && daysDiff <= 1) {
			setCurrentStreak(prevCurrentStreak => prevCurrentStreak + 1);

			copyCurrentStreak += 1;
		}
		// This reset the consecutive days count when the streak is broken by opening a feed later than another day from the last time that it was opened
		else if (daysDiff > 1) {
			// end longest streak?
			if (currentStreak === longestStreak) {
				setLongestStreakEnd(Object.keys(feedsPerDay)[Object.keys(feedsPerDay).length - 1]);
				copyLongestStreakEnd =
					Object.keys(feedsPerDay)[Object.keys(feedsPerDay).length - 1];
			}

			setCurrentStreak(0);
			setCurrentStreakStart(today);

			copyCurrentStreak = 0;
			copyCurrentStreakStart = today;
		}

		// Update the longest streak count and start date
		if (copyCurrentStreak >= longestStreak && copyCurrentStreakStart !== null) {
			setLongestStreak(copyCurrentStreak);
			setLongestStreakStart(copyCurrentStreakStart);

			copyLongestStreak = copyCurrentStreak;
			copyLongestStreakStart = copyCurrentStreakStart;
		}

		// Save all updated statistics to AsyncStorage
		const dataToSave = [
			['@statistics_feedsOpened', copyFeedsOpened.toString()],
			...(Object.keys(copyFeedsPerDay).length > 0
				? [['@statistics_feedsPerDay', JSON.stringify(copyFeedsPerDay)]]
				: []),
			['@statistics_currentStreak', copyCurrentStreak.toString()],
			['@statistics_longestStreak', copyLongestStreak.toString()],
			...(copyCurrentStreakStart
				? [['@statistics_currentStreakStart', copyCurrentStreakStart]]
				: []),
			...(copyLongestStreakStart
				? [['@statistics_longestStreakStart', copyLongestStreakStart]]
				: []),
			...(copyLongestStreakEnd
				? [['@statistics_longestStreakEnd', copyLongestStreakEnd]]
				: []),
		] as [string, string][];

		try {
			await AsyncStorage.multiSet(dataToSave);
		} catch (error) {
			console.error('Error saving updated stats', error);
		}
	};

	// Reset storage and local state to initial values
	const resetReadingStats = async () => {
		try {
			await AsyncStorage.multiRemove(STATS_STORAGE_KEYS);
			setFeedsOpened(0);
			setFeedsPerDay({});
			setCurrentStreak(0);
			setLongestStreak(0);
			setCurrentStreakStart(null);
			setLongestStreakStart(null);
			setLongestStreakEnd(null);
		} catch (error) {
			console.error('Something went wrong when resetting reading statistics', error);
		}
	};

	// Calculate average feeds opened per day
	const totalFeeds = Object.values(feedsPerDay).reduce((a, b) => a + b, 0);
	const totalDays = Object.keys(feedsPerDay).length;
	const averageFeedsPerDay = totalDays > 0 ? totalFeeds / totalDays : 0;

	// Calculate average feeds opened per day for current streak
	let currentStreakTotalFeedsOpened = 0;
	let currentStreakDays = 0;

	if (currentStreakStart) {
		for (const dateStr in feedsPerDay) {
			const date = new Date(dateStr);
			if (date >= new Date(currentStreakStart) && date <= new Date()) {
				currentStreakTotalFeedsOpened += feedsPerDay[dateStr];
				currentStreakDays++;
			}
		}
	}

	const currentStreakAverageFeedsPerDay =
		currentStreakDays > 0 ? currentStreakTotalFeedsOpened / currentStreakDays : 0;

	// Calculate average feeds opened per day for the longest streak
	let longestStreakTotalFeedsOpened = 0;
	let longestStreakDays = 0;

	if (longestStreakStart) {
		for (const dateStr in feedsPerDay) {
			const date = new Date(dateStr);
			if (
				date >= new Date(longestStreakStart) &&
				date <= new Date(longestStreakEnd || new Date().toISOString().slice(0, 10))
			) {
				longestStreakTotalFeedsOpened += feedsPerDay[dateStr];
				longestStreakDays++;
			}
		}
	}

	const longestStreakAverageFeedsPerDay =
		longestStreakDays > 0 ? longestStreakTotalFeedsOpened / longestStreakDays : 0;

	// Adding leading zero, and making sure that float numbers are fixed to two decimal points
	const formatFixedNumber = (num: number) => {
		if (Number.isInteger(num)) {
			return num.toString().padStart(2, '0');
		} else {
			const formatted = num.toFixed(2);
			return formatted.padStart(5, '0');
		}
	};

	// Transforming all the numbers that will be returned to a correct formats
	const formattedFeedsOpened = feedsOpened.toString().padStart(2, '0');
	const formattedAverageFeedsPerDay = formatFixedNumber(averageFeedsPerDay);
	const formattedCurrentStreak = currentStreak.toString().padStart(2, '0');
	const formattedLongestStreak = longestStreak.toString().padStart(2, '0');
	const formattedCurrentStreakAverageFeedsPerDay = formatFixedNumber(
		currentStreakAverageFeedsPerDay,
	);
	const formattedLongestStreakAverageFeedsPerDay = formatFixedNumber(
		longestStreakAverageFeedsPerDay,
	);

	return {
		feedsOpened: formattedFeedsOpened,
		averageFeedsPerDay: formattedAverageFeedsPerDay,
		currentStreak: formattedCurrentStreak,
		longestStreak: formattedLongestStreak,
		currentStreakAverageFeedsPerDay: formattedCurrentStreakAverageFeedsPerDay,
		longestStreakAverageFeedsPerDay: formattedLongestStreakAverageFeedsPerDay,
		resetReadingStats,
		handleReadingStats,
	};
};
