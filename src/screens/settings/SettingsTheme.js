import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-community/async-storage';


export default class SettingsTheme extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: '#0080B0',
			mode: 'false'
		}
	}

	async componentDidMount() {
		let color = await AsyncStorage.getItem('themeColor');
		if(color !== null) { this.setState({color: color}) };

		let mode = await AsyncStorage.getItem('themeMode');
		if(mode !== null) { this.setState({mode: mode}) };
	}

	saveColor(c) { AsyncStorage.setItem('themeColor', c) }

	render() {
		let color = this.state.color;
		let mode = this.state.mode;

		return(
			<View style={{paddingHorizontal: 16}}>
				<Text style={styles.settings_catHeader}> 
					THEME:
				</Text>

				<View style={{flexDirection: 'row', justifyContent: 'center'}}>
					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: '#EF820D'
							});
							this.saveColor('#EF820D');
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#EF820D', opacity: color === '#EF820D' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>

					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: '#6D2AFF'
							});
							this.saveColor('#6D2AFF');
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#6D2AFF', opacity: color === '#6D2AFF' ? 1 : 0.5
						 }
						]}
						/>
					</TouchableOpacity>

					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: '#4D9762'
							});
							this.saveColor('#4D9762');
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#4D9762', opacity: color === '#4D9762' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>

					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: '#222'
							});
							this.saveColor('#222');
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#222', opacity: color === '#222' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>

					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: '#FF0800'
							});
							this.saveColor('#FF0800');
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#FF0800', opacity: color === '#FF0800' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>
					
					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: '#0080B0'
							});
							this.saveColor('#0080B0');
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#0080B0', opacity: color === '#0080B0' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity 
					activeOpacity={0.55}
					onPress={() => {
						this.setState({
							mode: mode === 'false' ? 'true' : 'false'
						});
						AsyncStorage.setItem('themeMode', mode === 'false' ? 'true' : 'false');
					}}
				>
					<View style={{
						marginTop: 6, 
						justifyContent: 
						'center',
						flexDirection: 'row', 
						alignItems: 'center'
					}}>
						<Text style={styles.mode_header}>
							DARK MODE: 
						</Text>
						{
							mode === 'true' ?
								<Icon name="check-square" size={18} style={{opacity: 0.7}}/>
							:
								<Icon name="square" size={18} style={{opacity: 0.7}}/>
						}
						
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	settings_catHeader: {
		fontSize: 21,
		fontFamily: 'Muli-Regular'
	},

	theme_choice: {
		height: 38,
		width: 38,
		borderRadius: 38,
		margin: 6,
		elevation: 4,
	},

	mode_header: {
		marginRight: 4,
		fontSize: 16,
		opacity: 0.7,
		fontFamily: 'OpenSans-Regular',
	}
})