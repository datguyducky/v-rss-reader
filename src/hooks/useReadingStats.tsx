import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useMMKVNumber, useMMKVObject, useMMKVString } from 'react-native-mmkv';

export const useReadingStats = () => {
	/**
	 * App usage stats - storage/state
	 */
	const [appState, setAppState] = useState(AppState.currentState);
	const [startTime = null, setStartTime] = useMMKVNumber('statistics.startTime');
	const [appUsageTime = 0, setAppUsageTime] = useMMKVNumber('statistics.appUsageTime');

	/**
	 * Feeds opened statistics - storage/state
	 */
	const [feedsOpened = 0, setFeedsOpened] = useMMKVNumber('statistics.feedsOpened');
	const [feedsPerDay = {}, setFeedsPerDay] =
		useMMKVObject<Record<string, number>>('statistics.feedsPerDay');
	const [currentStreak = 0, setCurrentStreak] = useMMKVNumber('statistics.currentStreak');
	const [longestStreak = 0, setLongestStreak] = useMMKVNumber('statistics.longestStreak');
	const [currentStreakStart = null, setCurrentStreakStart] = useMMKVString(
		'statistics.currentStreakStart',
	);
	const [longestStreakStart = null, setLongestStreakStart] = useMMKVString(
		'statistics.longestStreakStart',
	);
	const [longestStreakEnd = null, setLongestStreakEnd] = useMMKVString(
		'statistics.longestStreakEnd',
	);

	/**
	 * App usage stats - methods
	 */
	const updateElapsedTime = () => {
		if (startTime) {
			const elapsedTimeInMinutes = Math.round((Date.now() - startTime) / 60000);

			setAppUsageTime(appUsageTime + elapsedTimeInMinutes);
		}
		setStartTime(undefined);
	};

	useEffect(() => {
		// Making sure that startTime is set when app it's just freshly opened
		if (startTime === null) {
			setStartTime(Date.now());
		}

		const appStateListener = (nextAppState: AppStateStatus) => {
			if (appState.match(/inactive|background/) && nextAppState === 'active') {
				// App has become active again, so start tracking time
				setStartTime(Date.now());
			} else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
				// App has been minimized, so stop tracking time and update elapsed time
				updateElapsedTime();
			}
			setAppState(nextAppState);
		};

		const subscription = AppState.addEventListener('change', appStateListener);

		return () => {
			subscription.remove();
		};
	}, [appState, startTime]);

	/**
	 * Feeds opened statistics - storage/state
	 */
	const handleFeedPressStats = () => {
		// Not sure how I feel about using this variables here, but from all the things that I've tried this is one, is the only that really worked.
		// As this is used to make sure that all the data (from storage) in this function is synced, so the proper "if" statements can be used.
		let copyCurrentStreak = currentStreak;
		let copyCurrentStreakStart = currentStreakStart;
		let copyFeedsPerDay = feedsPerDay;

		// Get today's date
		const today = new Date().toISOString().slice(0, 10);

		// Check if user already clicked on a feed today
		const clickedToday = feedsPerDay[today] !== undefined;

		// Update feeds opened countsa
		setFeedsOpened(feedsOpened + 1);

		// Update feeds opened per day
		const clicksForToday = feedsPerDay[today] || 0;
		setFeedsPerDay({ ...feedsPerDay, [today]: clicksForToday + 1 });
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
			setCurrentStreak(current => (current || 0) + 1);

			copyCurrentStreak += 1;
		}
		// Here we add another day to the consecutive days count - as long as it was the first feed press today
		// and as long as today is the next day after the last time that feed was opened
		else if (currentStreak > 0 && clicksForToday === 0 && daysDiff <= 1) {
			setCurrentStreak(current => (current || 0) + 1);

			copyCurrentStreak += 1;
		}
		// This reset the consecutive days count when the streak is broken by opening a feed later than an another day from the last time that it was opened
		else if (daysDiff > 1) {
			// end longest streak?
			if (currentStreak === longestStreak) {
				setLongestStreakEnd(Object.keys(feedsPerDay)[Object.keys(feedsPerDay).length - 1]);
			}

			setCurrentStreak(0);
			setCurrentStreakStart(today);

			copyCurrentStreak = 0;
			copyCurrentStreakStart = today;
		}

		// Update longest streak count and start date
		if (copyCurrentStreak >= longestStreak && copyCurrentStreakStart !== null) {
			setLongestStreak(copyCurrentStreak);
			setLongestStreakStart(copyCurrentStreakStart);
		}
	};

	const reset = () => {
		// Feeds opened statistics - reset storage
		setFeedsOpened(undefined);
		setFeedsPerDay(undefined);
		setCurrentStreak(undefined);
		setLongestStreak(undefined);
		setCurrentStreakStart(undefined);
		setLongestStreakStart(undefined);
		setLongestStreakEnd(undefined);

		// App usage stats - reset storage
		setStartTime(undefined);
		setAppUsageTime(undefined);
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
	const formattedAppUsageTime = appUsageTime.toString().padStart(2, '0');

	return {
		// Feeds opened statistics - returned methods/data
		feedsOpened: formattedFeedsOpened,
		averageFeedsPerDay: formattedAverageFeedsPerDay,
		currentStreak: formattedCurrentStreak,
		longestStreak: formattedLongestStreak,
		currentStreakAverageFeedsPerDay: formattedCurrentStreakAverageFeedsPerDay,
		longestStreakAverageFeedsPerDay: formattedLongestStreakAverageFeedsPerDay,
		handleFeedPressStats,
		// App usage stats - returned methods/data
		appUsageTime: formattedAppUsageTime,
		retrieveElapsedTime: updateElapsedTime,
		// Reset method
		reset,
	};
};
