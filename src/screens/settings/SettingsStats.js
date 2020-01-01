import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


export default class SettingsStats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			launch_date: '',
			clicks_count: '',
			streak_count: {}
		}
	}

	async componentDidMount() {
		let launch_date = await AsyncStorage.getItem('launch_date');
		let clicks_count = await AsyncStorage.getItem('clicks_count');
		let streak_count = await AsyncStorage.getItem('streak_count');
		streak_count = JSON.parse(streak_count);

		if(launch_date !== null) { this.setState({launch_date: launch_date}) };
		if(clicks_count !== null) { this.setState({clicks_count: clicks_count}) };
		if(streak_count !== null) { this.setState({streak_count: streak_count}) };
	}

	render() {
		const launch_date = this.state.launch_date;
		const clicks_count = this.state.clicks_count;
		const streak_count = this.state.streak_count;

		return(
			<View style={{paddingHorizontal: 16, marginTop: 21}}>
				<Text style={styles.settings_catHeader}> 
					STATS:
				</Text>
				
				<View>
					<Text style={styles.stats_item}>
						Total number of news opened: {clicks_count}
					</Text>
					<Text style={styles.stats_item}>
						First use of Just News: {"\n"}{launch_date}
					</Text>
					<Text style={styles.stats_item}>
						Current reading streak: {streak_count.streak}
					</Text>
					<Text style={styles.stats_item}>
						Longest reading streak: {streak_count.record}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	settings_catHeader: {
		fontSize: 21,
		fontFamily: 'Muli-Regular',
		marginBottom: 6
	},

	stats_item: {
		fontFamily: 'OpenSans-Regular',
		fontSize: 16,
		opacity: 0.7,
		textAlign: 'center'
	}
})