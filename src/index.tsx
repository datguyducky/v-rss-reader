import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { AddDecider } from './drawers/AddDecider';
import { Read } from './views/Read';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

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
		<NavigationContainer onReady={onLayoutRootView}>
			<Tab.Navigator
				screenOptions={{
					headerShadowVisible: false,
					header: () => <Header />,
				}}
				tabBar={props => <Navigation {...props} />}
			>
				<Tab.Screen name="Read" component={Read} />

				<Tab.Screen name="Add" component={AddDecider} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

registerRootComponent(App);
