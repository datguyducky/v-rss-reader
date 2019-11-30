import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class ListScreen extends Component {
	static navigationOptions = () => {
		return {
			headerTitle: 'RSS Feeds',
		}
	}

	render() {
		return(
			<View>
				<Text>ble</Text>
			</View>
		);
	}
}