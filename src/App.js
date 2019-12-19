/**
 * @format
 * @flow
*/

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

//screens
import ReadScreen from './ReadScreen';
import ProfileScreen from './ProfileScreen';
import ListScreen from './ListScreen';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends React.Component {
	async componentDidMount() {
		let launch_date = await AsyncStorage.getItem('launch_date');

		if(launch_date === null) {
			var LD = new Date();
			LD.setMinutes(LD.getMinutes() - LD.getTimezoneOffset());
			LD = LD.toJSON().slice(0, 16).replace('T', ' ');

			await AsyncStorage.setItem('launch_date', LD)
		}

		let s_darkMode = await AsyncStorage.getItem('s_darkMode');
	}

	render() {
	 	return <AppContainer />;
	}
}

const RootStack = createStackNavigator(
	{
		Home: ReadScreen,
		Profile: ProfileScreen,
		List: ListScreen
	},
	{
		initialRouteName: 'Profile',
		/* The header config from HomeScreen is now here */
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#0080B0',
			},
			headerTintColor: '#fff'
		},
	},
);
  
const AppContainer = createAppContainer(RootStack);
  
  