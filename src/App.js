import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

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
const Stack = createStackNavigator();

import { DarkTheme, WhiteTheme } from './styles/Themes';
import { ThemeProvider } from 'styled-components';

import AsyncStorage from '@react-native-community/async-storage';


const App = () => {
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
				const USER_STATS = {
					app_launch: '',
					news_opened: 0,
					reading_streak: 0,
					reading_longest_streak: 0,
					last_day: 0
				};


				let LAUNCH = new Date();
				LAUNCH.setMinutes(LAUNCH.getDate() - LAUNCH.getTimezoneOffset());
				let TODAY = new Date(LAUNCH);

				// date when app was first launched (YEAR-MONTH-DAY H:M)
				LAUNCH = LAUNCH.toJSON().slice(0, 16).replace('T', ' ');

				// setting today as a initial date for lastDay key (used later by reading_streak)
				USER_STATS.last_day = TODAY;


				// everything to AsyncStorage
				USER_STATS.app_launch = LAUNCH;
				AsyncStorage.setItem('user_stats', JSON.stringify(USER_STATS));
			};
		}; loadStats();
	}, []);


	return (
		<ThemeProvider theme={WhiteTheme}>
			<NavigationContainer ref={navigationRef}>
				<StatusBar barStyle='dark-content' animated={true} backgroundColor={WhiteTheme.MAIN_BG}/>

				<Stack.Navigator
					screenOptions={{
						headerStyle: {
							backgroundColor: '#fff',
							elevation: 0
						},
						headerTintColor: '#050505',
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
