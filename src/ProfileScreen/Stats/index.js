import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';

import Styles from './style';
import Theme from '../../GlobalStyles/Theme';
import AsyncStorage from '@react-native-community/async-storage';


export default class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			launch_date: '',
			clicks_count: '',
			streak_count: {},
			s_feedNews: 1,
			s_totNews: 5,
			s_darkMode: 'false'
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


		let s_feedNews = await AsyncStorage.getItem('s_feedNews');
		let s_totNews = await AsyncStorage.getItem('s_totNews');

		if(s_feedNews !== null) { this.setState({s_feedNews: s_feedNews}) };
		if(s_totNews !== null) { this.setState({s_totNews: s_totNews}) }


		let s_darkMode = await AsyncStorage.getItem('s_darkMode');
		if(s_darkMode !== null) { this.setState({s_darkMode: s_darkMode}) };
	}

	render() {
		const launch_date = this.state.launch_date;
		const clicks_count = this.state.clicks_count;
		const streak_count = this.state.streak_count;
		const dark_mode = this.state.s_darkMode;

		const color_main = dark_mode === 'false' ? Theme.Light : Theme.Dark;
		const color_text = dark_mode === 'false' ? Theme.Light_Text : Theme.Dark_Text;
		

		return(
			<View style={[color_main, {flex: 1}]}>
				<View style={Styles.settingsWrapper}>
				<Text style={[Styles.stats_header, color_text]}>
						SETTINGS:
				</Text>
					<View>
						<Text style={[Styles.set_item, color_text]}>
							Max number of news from 1 feed (1-12):
						</Text>
						<Slider 
							style={{width: '64%', marginLeft: 'auto', marginRight: 'auto'}}
							minimumValue={1}
							maximumValue={12}
							value={this.state.s_feedNews}
							step={1}
							onSlidingComplete={value => this.setState({s_feedNews: value})}
							minimumTrackTintColor={dark_mode === 'false' ? '#1575a0' : '#efefef'}
							maximumTrackTintColor={dark_mode === 'false' ? '#1575a0' : 'gray'}
							thumbTintColor='#1575a0'
						/>
						<Text style={[Styles.set_value, color_text]}>
							Set to: {this.state.s_feedNews}
						</Text>


						<Text style={[Styles.set_item, color_text]}>
							Max number of news to show (5-150):
						</Text>
						<Slider 
							style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}
							minimumValue={5}
							maximumValue={150}
							value={this.state.s_totNews}
							step={1}
							onSlidingComplete={value => this.setState({s_totNews: value})}
							minimumTrackTintColor={dark_mode === 'false' ? '#1575a0' : '#efefef'}
							maximumTrackTintColor={dark_mode === 'false' ? '#1575a0' : 'gray'}
							thumbTintColor='#1575a0'
						/>
						<Text style={[Styles.set_value, color_text]}>
							Set to: {this.state.s_totNews}
						</Text>
					</View>


					<View style={{ marginRight: 'auto', marginLeft: 'auto'}}>
						<TouchableOpacity 
							activeOpacity={0.3} 
							onPress={async () => {
								let mode = await AsyncStorage.getItem('s_darkMode');
								mode = mode === 'false' ? 'true' : 'false';
								this.setState({s_darkMode: mode});
									
								await AsyncStorage.setItem('s_darkMode', mode);
								this.props.renderChanges();
							}}
							style={{flexDirection: 'row', alignItems: 'center'}}
						>
						<Text style={[color_text, {marginRight: 12, fontSize: 18}]}>DARK MODE:</Text>
						{
							dark_mode === 'true' ?
								<Icon name="check-square" size={18} style={{color: '#fff'}}/>
							:
								<Icon name="square" size={18} style={{color: '#000'}}/>
						}
						</TouchableOpacity>
					</View>
				</View>
				<View style={Styles.statsWrapper}>
					<Text style={[Styles.stats_header, color_text]}>
						STATS:
					</Text>
					<View>
						<Text style={[Styles.stats_item, color_text]}>
							Total number of news opened: {clicks_count}
						</Text>
						<Text style={[Styles.stats_item, color_text]}>
							First use of Just News: {"\n"}{launch_date}
						</Text>
						<Text style={[Styles.stats_item, color_text]}>
							Current reading streak: {streak_count.streak}
						</Text>
						<Text style={[Styles.stats_item, color_text]}>
							Longest reading streak: {streak_count.record}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}