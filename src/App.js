import React from 'react';
import { StatusBar } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

// navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// navigation.navigate inside App.js
import { navigationRef } from './utils/RootNavigation';
import * as RootNavigation from './utils/RootNavigation';

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

	return (
		<NavigationContainer ref={navigationRef}>
			<StatusBar barStyle='dark-content' animated={true} backgroundColor='#fff'/>

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
	);

}; export default App;
