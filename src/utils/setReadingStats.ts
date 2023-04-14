import AsyncStorage from '@react-native-async-storage/async-storage';

import { STATS_STORAGE_KEYS, statsValuesFromStorage } from './getReadingStats';

export const resetReadingStats = async () => {
	try {
		await AsyncStorage.multiRemove(STATS_STORAGE_KEYS);
	} catch (error) {
		console.error('Something went wrong when resetting reading statistics');
	}
};

export const setReadingStats = async () => {
	let {
		feedsOpened,
		feedsPerDay,
		currentStreak,
		longestStreak,
		currentStreakStart,
		longestStreakStart,
		longestStreakEnd,
	} = await statsValuesFromStorage();

	// Not sure how I feel about using this variables here, but from all the things that I've tried this is one, is the only that really worked.
	// As this is used to make sure that all the data (from storage) in this function is synced, so the proper "if" statements can be used.

	// Get today's date
	const today = new Date().toISOString().slice(0, 10);

	// Check if user already clicked on a feed today
	const clickedToday = feedsPerDay[today] !== undefined;

	// Update feeds opened count
	feedsOpened += 1;

	// Update feeds opened per day
	const clicksForToday = feedsPerDay[today] || 0;
	feedsPerDay = { ...feedsPerDay, [today]: (feedsPerDay?.[today] || 0) + 1 };

	// This checks how many days passed from the last time that a feed was opened (0 and 1 are fine, more than that breaks the streak)
	const localFeedsPerDayArray = Object.keys(feedsPerDay);
	const millisecondsPerDay = 1000 * 60 * 60 * 24;
	const timeDiff =
		localFeedsPerDayArray.length > 1
			? Date.parse(localFeedsPerDayArray[localFeedsPerDayArray.length - 1]) -
			  Date.parse(localFeedsPerDayArray[localFeedsPerDayArray.length - 2])
			: 0;
	const daysDiff = Math.floor(timeDiff / millisecondsPerDay);

	// Here we start the consecutive days count
	if (!clickedToday && currentStreakStart === null) {
		currentStreak = 0;
		currentStreakStart = today;
	}
	// This start the consecutive days count again, after it was reset to 0 when the streak was broken
	else if (currentStreak === 0 && clicksForToday === 0 && currentStreakStart) {
		currentStreak += 1;
	}
	// Here we add another day to the consecutive days count - as long as it was the first feed press today
	// and as long as today is the next day after the last time that feed was opened
	else if (currentStreak > 0 && clicksForToday === 0 && daysDiff <= 1) {
		currentStreak += 1;
	}
	// This reset the consecutive days count when the streak is broken by opening a feed later than an another day from the last time that it was opened
	else if (daysDiff > 1) {
		// end longest streak?
		if (currentStreak === longestStreak) {
			longestStreakEnd = Object.keys(feedsPerDay)[Object.keys(feedsPerDay).length - 1];
		}

		currentStreak = 0;
		currentStreakStart = today;
	}

	// Update longest streak count and start date
	if (currentStreak >= longestStreak && currentStreakStart !== null) {
		longestStreak = currentStreak;
		longestStreakStart = currentStreakStart;
	}

	// Save all updated statistics to AsyncStorage
	const dataToSave = [
		['@statistics_feedsOpened', feedsOpened.toString()],
		...(Object.keys(feedsPerDay).length > 0
			? [['@statistics_feedsPerDay', JSON.stringify(feedsPerDay)]]
			: []),
		['@statistics_currentStreak', currentStreak.toString()],
		['@statistics_longestStreak', longestStreak.toString()],
		...(currentStreakStart ? [['@statistics_currentStreakStart', currentStreakStart]] : []),
		...(longestStreakStart ? [['@statistics_longestStreakStart', longestStreakStart]] : []),
		...(longestStreakEnd ? [['@statistics_longestStreakEnd', longestStreakEnd]] : []),
	] as [string, string][];

	try {
		await AsyncStorage.multiSet(dataToSave);
	} catch (error) {
		console.error('Error saving updated stats:', error);
	}
};
