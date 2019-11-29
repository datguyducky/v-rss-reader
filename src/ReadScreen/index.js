 // @refresh reset

import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as rssParser from 'react-native-rss-parser';

export default class ReadScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: () => (
				<TouchableHighlight>
					<Icon 
					name="user" 
					size={24}
					onPress={() => navigation.navigate('Profile')}
					style={{marginLeft: 16}}
					/>
				</TouchableHighlight>
			),
			headerTitle: 'Just News',
			headerTitleStyle: { 
				flex: 1, 
				textAlign: 'center',
				fontWeight: 'bold',
				textTransform: 'uppercase'
			},
			headerRight: () => (
				<TouchableHighlight>
					<Icon 
					name="rss"
					size={24}
					onPress={() => navigation.navigate('List')}
					style={{marginRight: 16}}
					/>
				</TouchableHighlight>
			)
		};
	}

	render() {
		return (
			<Text>:d</Text>
		);
	}
}