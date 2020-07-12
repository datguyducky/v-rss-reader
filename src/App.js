import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// navigation.navigate inside App.js
import { navigationRef } from './globals/RootNavigation';
import * as RootNavigation from './globals/RootNavigation';

// screens
import Home from './screens/Home'; 
import NewCategory from './screens/NewCategory';
import About from './screens/About';
import Settings from './screens/Settings';
import NewFeed from './screens/NewFeed';
import EditCategory from './screens/EditCategory';
import EditFeed from './screens/EditFeed';
// end of screens

import { NavMoreBtn } from './components';

import { DarkTheme, LightTheme } from './styles/Themes';
import { ThemeProvider } from 'styled-components';

import AsyncStorage from '@react-native-community/async-storage';

import { defaultStats, defaultSettings } from './globals/Helpers';


const Stack = createStackNavigator();
const App = () => {
	const [appTheme, set_appTheme] = useState('LightTheme');
	const colorScheme = useColorScheme();
	const [settingsCheck, set_settingsCheck] = useState('');


	const popupRoutes = (eventName, index) => {
		// return when user clicks outside of popup menu
		if(eventName !== 'itemSelected') return;

		// new category
		if(index === 0) RootNavigation.navigate('NewCat');
		// about
		if(index === 1) RootNavigation.navigate('About');
		// settings
		if(index === 2) RootNavigation.navigate('Settings');
	}

	
	useEffect(() => {
		const loadStats = async () => {
			let result = await AsyncStorage.getItem('user_stats');
			result = JSON.parse(result);

			// with initial launch of the app save default USER_STATS object to AsyncStorage
			// with a current date for a launch app
			if(result === null) {
				defaultStats();
			};
		}; loadStats();
	}, []);


	React.useLayoutEffect(() => {
		const loadSettings = async () => {
			let USER_SETTINGS = await AsyncStorage.getItem('user_settings');
			USER_SETTINGS = JSON.parse(USER_SETTINGS);

			if(USER_SETTINGS === null) {
				defaultSettings();
				set_appTheme('LightTheme');

			} else {
				if(USER_SETTINGS.theme === 'light') { set_appTheme('LightTheme') }
				if(USER_SETTINGS.theme === 'dark') { set_appTheme('DarkTheme') }
				if(USER_SETTINGS.theme === 'system') {
					if(colorScheme === 'light') {
						set_appTheme('LightTheme');
					}

					if(colorScheme === 'dark') {
						set_appTheme('DarkTheme');
					}
				}
			}

			SplashScreen.hide();
		}; loadSettings();
	}, [settingsCheck])


	return (
		<ThemeProvider 
			theme={
				appTheme === 'DarkTheme'
				? DarkTheme
				: LightTheme
			}
		>
			<NavigationContainer ref={navigationRef}>
				<StatusBar 
					barStyle={
						appTheme === 'DarkTheme' 
						? 'white-content'
						: 'dark-content'
					}
					animated={true} 
					backgroundColor={
						appTheme === 'DarkTheme' 
						? DarkTheme.MAIN_BG
						: LightTheme.MAIN_BG
					}
				/>

				<Stack.Navigator
					screenOptions={{
						headerStyle: {
							backgroundColor: appTheme === 'DarkTheme' ? DarkTheme.MAIN_BG : LightTheme.MAIN_BG,
							elevation: 0
						},
						headerTintColor: appTheme === 'DarkTheme' ? DarkTheme.MAIN_TEXT : LightTheme.MAIN_TEXT,
						headerTitleStyle: {
							fontWeight: '600',
							fontFamily: 'Muli-Bold'
						}
					}}
					initialRouteName='Home'
				>
					<Stack.Screen 
						name='Home' 
						component={Home}
						options={{
							title: 'V - RSS Reader',
							headerRight: () => (
								<NavMoreBtn
									actions={[
										'New category', 
										'About',
										'Settings'
									]} 
									onPress={popupRoutes}
									iconSize={24}
								/>
							),
							headerLeftContainerStyle: {
								paddingLeft: 6
							},
							headerRightContainerStyle: {
								paddingRight: 6
							}
						}}
					/>

					<Stack.Screen
						name='NewCat'
						component={NewCategory}
						options={{
							title: 'New Category',
							headerRightContainerStyle: {
								paddingRight: 6
							}
						}}
					/>

					<Stack.Screen
						name='About'
						component={About}
						options={{
							title: 'About'
						}}
					/>

					<Stack.Screen
						name='Settings'
						component={Settings}
						options={{
							title: 'Settings'
						}}
						initialParams={{
							set_settingsCheck: set_settingsCheck
						}}
					/>

					<Stack.Screen
						name='NewFeed'
						component={NewFeed}
						options={{
							title: 'New RSS feed',
							headerRightContainerStyle: {
								paddingRight: 6
							}
						}}
					/>

					<Stack.Screen
						name='EditFeed'
						component={EditFeed}
						options={{
							title: 'Edit Feed',
							headerRightContainerStyle: {
								paddingRight: 6
							}
						}}
					/>

					<Stack.Screen 
						name='EditCat'
						component={EditCategory}
						options={{
							title: 'Edit Category',
							headerRightContainerStyle: {
								paddingRight: 6
							}
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);

}; export default App;
