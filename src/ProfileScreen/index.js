import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Stats from './Stats';
import Styles from './style';

export default class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.renderChanges = this.renderChanges.bind(this);
	}

	async componentDidMount() {
		let s_darkMode = await AsyncStorage.getItem('s_darkMode');
		this.props.navigation.setParams({
			headerTheme: s_darkMode === 'true' ? '#121212' : '#0080B0'
		});
	}

	async renderChanges() {
		let s_darkMode = await AsyncStorage.getItem('s_darkMode');
		this.props.navigation.setParams({
			headerTheme: s_darkMode === 'true' ? '#121212' : '#0080B0'
		});
	}


	static navigationOptions = ({navigation}) => {
		const params = navigation.state.params;
		if(params){
			return {
				headerTitle: 'Profile',
				headerStyle: {
					backgroundColor: params.headerTheme
				}
			}
		}
	}
	render() {
		let statusBarColor = '#0080B0';
		if(this.props.navigation.state.params) {
			statusBarColor = this.props.navigation.state.params.headerTheme
		};

		return(
			<View style={Styles.settings_wrapper}>
				<StatusBar backgroundColor={statusBarColor} barStyle="light-content" />
				
				<Stats renderChanges={this.renderChanges}/>
			</View>
		);
	}
}