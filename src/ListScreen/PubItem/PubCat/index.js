import React, {Component} from 'react';
import {TouchableNativeFeedback, Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
					<Text style={{textAlign: 'right', textTransform: 'uppercase', fontSize: 16, fontWeight: 'bold'}}>Hide</Text>
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