/**
 * @format
 * @flow
*/
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

//screens
import Feeds from './screens/feeds/Feeds';
import Read from './screens/read/Read';
import Settings from './screens/settings/Settings'


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			themeColor: '#0080B0',
			themeMode: 'false'
		}
	}

	async componentDidMount() {
		let launch_date = await AsyncStorage.getItem('launch_date');

		if(launch_date === null) {
			var LD = new Date();
			LD.setMinutes(LD.getMinutes() - LD.getTimezoneOffset());
			LD = LD.toJSON().slice(0, 16).replace('T', ' ');

			await AsyncStorage.setItem('launch_date', LD);
		}

		let themeColor = await AsyncStorage.getItem('themeColor');
		this.setState({themeColor: themeColor});

		let themeMode = await AsyncStorage.getItem('themeMode');
		this.setState({themeMode: themeMode});
	}

	render() {
	 	return <AppContainer screenProps={{themeColor: this.state.themeColor, themeMode: this.state.themeMode}}/>;
	}
}

const RootStack = createStackNavigator(
	{
		Read: Read, //home screen
		Feeds: Feeds,
		Settings: Settings
	},
	{
		initialRouteName: 'Read',
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#0080B0',
			},
			headerTintColor: '#fff'
		},
	},
);
  
const AppContainer = createAppContainer(RootStack);
  
  