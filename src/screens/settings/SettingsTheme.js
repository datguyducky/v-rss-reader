import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-community/async-storage';


export default class SettingsTheme extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: 'blue',
			mode: 'false'
		}
	}

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
								color: 'orange'
							})
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#EF820D', opacity: color === 'orange' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>

					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: 'purple'
							})
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#6D2AFF', opacity: color === 'purple' ? 1 : 0.5
						 }
						]}
						/>
					</TouchableOpacity>

					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: 'green'
							})
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#4D9762', opacity: color === 'green' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>

					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: 'black'
							})
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#222', opacity: color === 'black' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>

					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: 'red'
							})
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#FF0800', opacity: color === 'red' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>
					
					<TouchableOpacity 
						activeOpacity={0.65}
						onPress={() => {
							this.setState({
								color: 'blue'
							})
						}}
					>
						<View style={[
							styles.theme_choice, 
							{backgroundColor: '#0080B0', opacity: color === 'blue' ? 1 : 0.5 }
						]}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity 
					activeOpacity={0.55}
					onPress={() => {
						this.setState({
							mode: mode === 'false' ? 'true' : 'false'
						})
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
		margin: 6
	},

	mode_header: {
		marginRight: 4,
		fontSize: 16,
		opacity: 0.7,
		fontFamily: 'OpenSans-Regular',
	}
})