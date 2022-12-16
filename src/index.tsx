import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';

import { Read } from './views/Read';
import { Filters } from './drawers/Filters';
import { Feeds } from './drawers/Feeds';
import { QuickSettings } from './drawers/QuickSettings';

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
			<SafeAreaProvider>
				<NavigationContainer onReady={onLayoutRootView}>
					<Stack.Navigator
						screenOptions={{
							headerShadowVisible: false,
							header: props => <Header {...props} />,
						}}
					>
						<Stack.Screen name="TabScreen" component={TabScreen} />

						<Stack.Group
							screenOptions={{
								presentation: 'containedTransparentModal',
								headerShown: false,
							}}
						>
							<Stack.Screen name="Filters" component={Filters} />
							<Stack.Screen name="Feeds" component={Feeds} />
							<Stack.Screen name="QuickSettings" component={QuickSettings} />
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};

registerRootComponent(App);
