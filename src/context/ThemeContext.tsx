import { createContext, ReactNode, useCallback, useState } from 'react';
import { useColorScheme } from 'react-native';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { useMMKVString } from 'react-native-mmkv';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

import { darkTheme, lightTheme } from '@theme/colors';

import { theme as createdTheme } from '../theme';

export enum THEMES {
	light = 'light',
	dark = 'dark',
	auto = 'auto',
}

type ThemeTypes = THEMES.dark | THEMES.light | THEMES.auto;

const themes = {
	light: lightTheme,
	dark: darkTheme,
};

export const ThemeContext = createContext({
	theme: THEMES.light,
	setTheme: (newTheme: ThemeTypes) => {},
	getTheme: (): ThemeTypes => THEMES.light,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const colorScheme = useColorScheme();

	const [appTheme = THEMES.dark, setAppTheme] = useMMKVString('appTheme');

	const [localTheme, setLocalTheme] = useState<ThemeTypes>(
		(appTheme || THEMES.light) as ThemeTypes,
	);

	const handleThemeChange = useCallback(async (newTheme: ThemeTypes) => {
		setAppTheme(newTheme);
		setLocalTheme(newTheme);

		// Changing the gesture/navigation bottom bar background color for Android to make sure it matches with the rest of the app
		let newNavigationBarColor;
		if (newTheme === THEMES.auto) {
			newNavigationBarColor =
				themes[colorScheme === 'light' ? THEMES.light : THEMES.dark].base[0];
		} else {
			newNavigationBarColor = themes[newTheme].base[0];
		}

		await setBackgroundColorAsync(newNavigationBarColor);
	}, []);

	const getTheme = () => {
		if (localTheme === THEMES.auto) {
			return colorScheme === 'light' ? THEMES.light : THEMES.dark;
		} else {
			return localTheme;
		}
	};

	return (
		<ThemeContext.Provider value={{ theme: localTheme, setTheme: handleThemeChange, getTheme }}>
			<StyledThemeProvider
				theme={{
					...createdTheme,
					colors: {
						...themes[getTheme()],
					},
				}}
			>
				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	);
};
