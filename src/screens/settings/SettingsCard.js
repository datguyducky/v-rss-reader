import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

import AsyncStorage from '@react-native-community/async-storage';


export default class SettingsCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			s_feedNews: 1,
			s_totNews: 5,
		}
	};

	async componentDidMount() {
		let s_feedNews = await AsyncStorage.getItem('s_feedNews');
		let s_totNews = await AsyncStorage.getItem('s_totNews');

		if(s_feedNews !== null) { this.setState({s_feedNews: s_feedNews}) };
		if(s_totNews !== null) { this.setState({s_totNews: s_totNews}) }
	}
	

	render() {
		let s_feedNews = parseInt(this.state.s_feedNews);
		let s_totNews = parseInt(this.state.s_totNews);

		return (
			<View style={styles.settings_wrapper}>
				<Text style={styles.settings_catHeader}>FEED:</Text>
				<View>
					<Text style={styles.set_item}>
						Numbers of news per feed (1-12):
					</Text>
					<View style={{alignItems: 'center', marginBottom: 18, justifyContent: 'center'}}>
						<Slider 
							style={{width: '64%'}}
							minimumValue={1}
							maximumValue={12}
							value={s_feedNews}
							step={1}
							onValueChange={value => this.setState({s_feedNews: value})}
							minimumTrackTintColor='#1575a0'
							maximumTrackTintColor='gray'
							thumbTintColor='#1575a0'
						/>
						<Text style={styles.set_value}>
							Value: {s_feedNews}
						</Text>
					</View>
						
					<Text style={styles.set_item}>
						Acceptable number of news to display:
					</Text>
					<View style={{alignItems: 'center', marginBottom: 18, justifyContent: 'center'}}>
						<Slider 
							style={{width: '80%'}}
							minimumValue={5}
							maximumValue={150}
							value={s_totNews}
							step={1}
							onSlidingComplete={value => this.setState({s_totNews: value})}
							minimumTrackTintColor='#1575a0'
							maximumTrackTintColor='gray'
							thumbTintColor='#1575a0'
						/>
						<Text style={styles.set_value}>
							Value: {s_totNews}
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	settings_wrapper: {
		paddingHorizontal: 16
	},

	statsWrapper: {
		paddingHorizontal: 16,
		paddingVertical: 15,
	},

	stats_header: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 8,
	},

	stats_item: {
		fontSize: 12,
		fontFamily: 'monospace',
		textTransform: 'uppercase',
		textAlign: 'center',
		marginBottom: 8
	},

	set_item: {
		fontSize: 16,
		marginBottom: 4,
		fontFamily: 'OpenSans-Regular',
		opacity: 0.7,
		textAlign: 'center'
	},

	set_value: { 
		textTransform: 'uppercase', 
		fontSize: 12,
		fontFamily: 'OpenSans-Bold',
		opacity: 0.45
	},

	settingsWrapper: {
		paddingHorizontal: 16,
		paddingVertical: 15,
	},

	settings_catHeader: {
		fontSize: 21,
		fontFamily: 'Muli-Regular'
	}
})