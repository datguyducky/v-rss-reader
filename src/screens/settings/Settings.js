import React, { Component } from 'react';
import { View } from 'react-native';
import { TouchableNativeFeedback,  } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';

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
			headerLeft: () => (
				<TouchableNativeFeedback>
				<Icon 
					name="arrow-left" 
					size={24}
					onPress={() => navigation.navigation.navigate('Read')}
					style={{padding: 15}}
					color="#fff"
				/>
				</TouchableNativeFeedback>
			),
			headerStyle: {
				backgroundColor: navigation.screenProps.themeColor
			}
		}
	}

	render() {
		let themeColor = this.props.screenProps.themeColor;

		let themeMode = this.props.screenProps.themeMode;
		let themeBgColor = '#fbfbfb';
		let themeTColor = '#000';

		if(themeMode === 'true') {
			themeBgColor = '#333';
			themeTColor = '#fff'; 
		};
		

		return(
			<View style={{paddingTop: 6, backgroundColor: themeBgColor, minHeight: '100%'}}>
				<SettingsCard 
					themeColor={themeColor}
					themeTColor={themeTColor}
					themeBgColor={themeBgColor}
				/>
				<SettingsTheme 
					themeColor={themeColor}
					themeTColor={themeTColor}
				/>
				<SettingsStats 
					themeColor={themeColor}
					themeTColor={themeTColor}
				/>
			</View>
		);
	}
}