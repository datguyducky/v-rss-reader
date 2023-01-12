import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Header } from './components/Header';
import { HeaderBack } from './components/HeaderBack';
import { Navigation } from './components/Navigation';
import { Category } from './views/Category';
import { Feed } from './views/Feed';
import { Read } from './views/Read';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
			tabBar={props => <Navigation {...props} />}
		>
			<Stack.Screen name="Read" component={Read} />
		</Tab.Navigator>
	);
};

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
			<BottomSheetModalProvider>
				<SafeAreaProvider>
					<NavigationContainer onReady={onLayoutRootView}>
						<Stack.Navigator
							screenOptions={{
								headerShadowVisible: false,
								header: () => <Header />,
							}}
						>
							<Stack.Screen name="TabScreen" component={TabScreen} />

							<Stack.Group
								screenOptions={{
									header: props => <HeaderBack {...props} />,
									animation: 'fade_from_bottom',
								}}
							>
								<Stack.Screen name="Feed" component={Feed} />
								<Stack.Screen name="Category" component={Category} />
							</Stack.Group>
						</Stack.Navigator>
					</NavigationContainer>
				</SafeAreaProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

registerRootComponent(App);
