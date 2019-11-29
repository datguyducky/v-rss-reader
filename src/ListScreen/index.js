import React, { Component } from 'react';
import { View, Text, } from 'react-native';

export default class ListScreen extends Component {
	static navigationOptions = () => {
		return {
			headerTitle: 'RSS Feeds',
		}
	}

	render() {
		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eceff1'}}>
				<Text> This is my List screen </Text>
			</View>
		);
	}
}