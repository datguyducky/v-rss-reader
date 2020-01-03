import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import SettingsCard from './SettingsCard';
import SettingsTheme from './SettingsTheme';
import SettingsStats from './SettingsStats';

export default class Settings extends Component {
	static navigationOptions = (navigation) => {
		return {
			headerTitle: 'Settings',
			headerTitleStyle: {
				fontFamily: 'Muli-ExtraBold'
			},
			headerStyle: {
				backgroundColor: navigation.screenProps.themeColor
			}
		}
	}

	render() {

		return(
			<View style={{marginTop: 6}}>
				<SettingsCard />
				<SettingsTheme />
				<SettingsStats />
			</View>
		);
	}
}