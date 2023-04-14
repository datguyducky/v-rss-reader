import AsyncStorage from '@react-native-async-storage/async-storage';

export const STATS_STORAGE_KEYS = [
	'@statistics_feedsOpened',
	'@statistics_feedsPerDay',
	'@statistics_currentStreak',
	'@statistics_longestStreak',
	'@statistics_currentStreakStart',
	'@statistics_longestStreakStart',
	'@statistics_longestStreakEnd',
];

export const statsValuesFromStorage = async () => {
	let feedsOpened = 0;
	let feedsPerDay: Record<string, number> = {};
	let currentStreak = 0;
	let longestStreak = 0;
	let currentStreakStart: string | null = null;
	let longestStreakStart: string | null = null;
	let longestStreakEnd: string | null = null;

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
		feedsOpened = feedsOpenedValue !== null ? parseInt(feedsOpenedValue, 10) : 0;
		feedsPerDay = feedsPerDayValue !== null ? JSON.parse(feedsPerDayValue) : {};
		currentStreak = currentStreakValue !== null ? parseInt(currentStreakValue, 10) : 0;
		longestStreak = longestStreakValue !== null ? parseInt(longestStreakValue, 10) : 0;
		currentStreakStart = currentStreakStartValue !== null ? currentStreakStartValue : null;
		longestStreakStart = longestStreakStartValue !== null ? longestStreakStartValue : null;
		longestStreakEnd = longestStreakEndValue !== null ? longestStreakEndValue : null;
	} catch (error) {
		console.error('Error loading reading stats:', error);
	}

	return {
		feedsOpened,
		feedsPerDay,
		currentStreak,
		longestStreak,
		currentStreakStart,
		longestStreakStart,
		longestStreakEnd,
	};
};

export const getReadingStats = async () => {
	const {
		feedsOpened,
		feedsPerDay,
		currentStreak,
		longestStreak,
		currentStreakStart,
		longestStreakStart,
		longestStreakEnd,
	} = await statsValuesFromStorage();

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
	};
};
