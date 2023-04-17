import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FeedsCategoriesProvider } from './context/FeedsCategoriesContext';
import { ThemeProvider } from './context/ThemeContext';
import { Routes } from './routing/Routes';

SplashScreen.preventAutoHideAsync();

export const storage = new MMKV();

const App = () => {
	const [fontsLoaded] = useFonts({
		'Montserrat-Bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
		'Montserrat-Medium': require('../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
		'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
		'Montserrat-SemiBold': require('../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
		'Montserrat-Light': require('../assets/fonts/Montserrat/Montserrat-Light.ttf'),
		'Raleway-Bold': require('../assets/fonts/Raleway/Raleway-Bold.ttf'),
		'Raleway-Medium': require('../assets/fonts/Raleway/Raleway-Medium.ttf'),
		'Raleway-Regular': require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
		'Raleway-SemiBold': require('../assets/fonts/Raleway/Raleway-SemiBold.ttf'),
		'Raleway-Light': require('../assets/fonts/Raleway/Raleway-Light.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider>
				<FeedsCategoriesProvider>
					<BottomSheetModalProvider>
						<SafeAreaProvider>
							<NavigationContainer onReady={onLayoutRootView}>
								<Routes />
							</NavigationContainer>
						</SafeAreaProvider>
					</BottomSheetModalProvider>
				</FeedsCategoriesProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
};

registerRootComponent(App);
