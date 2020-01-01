import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import SettingsCard from './SettingsCard';
import SettingsTheme from './SettingsTheme';
import SettingsStats from './SettingsStats';

export default class Settings extends Component {
	static navigationOptions = () => {
		return {
			headerTitle: 'Settings',
			headerTitleStyle: {
				fontFamily: 'Muli-ExtraBold'
			}
		}
	}

	render() {
		return(
			<View style={{marginTop: 6}}>
				<StatusBar backgroundColor='#0080B0' barStyle="light-content" />

				<SettingsCard />
				<SettingsTheme />
				<SettingsStats />
			</View>
		);
	}
}