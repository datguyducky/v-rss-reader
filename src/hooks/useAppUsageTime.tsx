import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useMMKVNumber, useMMKVObject } from 'react-native-mmkv';

import { DEFAULT_SETTINGS_VALUES } from '../common/constants';
import { SettingsFormValues } from '../forms/SettingsForm';

// While this uses MMKV storage for storing related data I'm not sure if this is a good idea, as it is not recommended to use that library as a "database" - not sure if this case
// counts as this, but if there would be reports of slow performance then it's possible that this part of the app causes it.
export const useAppUsageTime = () => {
	const [appSettings = DEFAULT_SETTINGS_VALUES] =
		useMMKVObject<SettingsFormValues>('appSettings');

	const [appState, setAppState] = useState(AppState.currentState);
	const [startTime = null, setStartTime] = useMMKVNumber('statistics.startTime');
	const [appUsageTime = 0, setAppUsageTime] = useMMKVNumber('statistics.appUsageTime');

	const updateElapsedTime = () => {
		if (!appSettings.disableReadingStatistics) {
			if (startTime) {
				const elapsedTimeInMinutes = Math.round((Date.now() - startTime) / 60000);

				setAppUsageTime(appUsageTime + elapsedTimeInMinutes);
			}

			setStartTime(undefined);
		}
	};

	useEffect(() => {
		// Making sure that startTime is set when app it's just freshly opened
		if (startTime === null) {
			setStartTime(Date.now());
		}

		const appStateListener = (nextAppState: AppStateStatus) => {
			if (!appSettings.disableReadingStatistics) {
				if (appState.match(/inactive|background/) && nextAppState === 'active') {
					// App has become active again, so start tracking time
					setStartTime(Date.now());
				} else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
					// App has been minimized, so stop tracking time and update elapsed time
					updateElapsedTime();
				}
				setAppState(nextAppState);
			}
		};

		const subscription = AppState.addEventListener('change', appStateListener);

		return () => {
			subscription.remove();
		};
	}, [appState, startTime, appSettings.disableReadingStatistics]);

	const reset = () => {
		setStartTime(undefined);
		setAppUsageTime(undefined);
	};

	const formattedAppUsageTime = appUsageTime.toString().padStart(2, '0');

	return {
		appUsageTime: formattedAppUsageTime,
		retrieveAppUsageTime: updateElapsedTime,
		resetAppUsageTime: reset,
	};
};
