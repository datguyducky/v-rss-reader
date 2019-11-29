import React, { Component } from 'react';
import { View, Text, } from 'react-native';

export default class ProfileScreen extends Component {
	static navigationOptions = () => {
		return {
			headerTitle: 'Profile',
		}
	}
	render() {
		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eceff1'}}>
				<Text> This is my Profile screen </Text>
			</View>
		);
	}
}