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

export default class App extends React.Component {
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
		initialRouteName: 'Home',
		/* The header config from HomeScreen is now here */
		defaultNavigationOptions: {
		},
	},
  );
  
const AppContainer = createAppContainer(RootStack);
  
  