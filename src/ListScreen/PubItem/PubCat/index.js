import React, {Component} from 'react';
import {TouchableNativeFeedback, Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/Feather';

export default class PubCat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: 'false'
		}
	}

	async componentDidMount() {
		const ID = 'disabled' + this.props.ID;
		const value = await AsyncStorage.getItem(`dis${ID}`);

		if(value === null){
			await AsyncStorage.setItem(`dis${ID}`, 'false');
		}

		this.setState({
			disabled: value
		});
		//console.log(value);
	}

	render() {
		const ID = 'disabled' + this.props.ID;
		let category = this.props.category;
		let disabled = this.state.disabled;
		let parent = this.props.parent;

		return (
			<TouchableNativeFeedback onPress={async () => {
				let disabled = this.state.disabled === 'false' ? 'true' : 'false';
				await AsyncStorage.setItem(`dis${ID}`, disabled);
				this.setState({
					disabled: this.state.disabled === 'false' ? 'true' : 'false'
				})
			}}>
				<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 2,
				opacity: disabled === 'true' ? 0.3 : 1
				}}>
					<Text style={[styles.catTitle]}>{category}</Text>
					{
						disabled === 'true' ?
						<Icon name="square" size={18} style={{color: disabled === 'true' ? '#000' : '#0080B0', marginRight: parent === 'Others' ? 8 : 0}}/>
						:
						<Icon name="plus-square" size={18} style={{color: '#0080B0', marginRight: parent === 'Others' ? 8 : 0}}/>
					}
					{
						parent === 'Others' ?
						<Icon name="edit" size={18} style={{marginRight: 8}}/>
						:
						null
					}
					{
						parent === 'Others' ?
						<Icon name="trash" size={18} style={{color: disabled === 'true' ? '#000' : '#D8000C', marginRight: 8}}/>
						:
						null
					}
					
				</View>
			</TouchableNativeFeedback>
		)
	}
}

const styles = StyleSheet.create({
	catTitle: {
		flex: 1,
		fontSize: 21,
	},
})