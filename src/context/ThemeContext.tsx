import { createContext, ReactNode, useCallback, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

import { theme as createdTheme } from '../theme';
import { darkTheme, lightTheme } from '../theme/colors';

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

	const handleThemeChange = useCallback((newTheme: ThemeTypes) => {
		setAppTheme(newTheme);
		setLocalTheme(newTheme);
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
