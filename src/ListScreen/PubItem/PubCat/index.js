import React, {Component} from 'react';
import { Modal, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';

import Styles from './style';


export default class PubCat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: 'false',
			deleteModalVisible: false,
			renameModalVisible: false,
		}
	}

	async componentDidMount() {
		const ID = this.props.ID;
		const value = await AsyncStorage.getItem(`dis${ID}`);

		if(value === null){
			await AsyncStorage.setItem(`dis${ID}`, 'false');
		}

		this.setState({
			disabled: value
		});
		//console.log(value);
	}

	openModal(n) {
		this.setState({[`${n}`]: true});
	}

	closeModal(n) {
		this.setState({[`${n}`]: false});
	}

	async deleteCustomRSS() {
		const ID = this.props.ID;

		let c_feeds = await AsyncStorage.getItem('custom_feeds');
		c_feeds = JSON.parse(c_feeds);

		//if there's more than 1 custom feed then we need to create copy of feeds array without feed selected by user, and then AsyncStorage set new version of it.
		if(c_feeds.length > 1) {
			let newFeeds = c_feeds.filter(e => e.id !== ID);
			await AsyncStorage.setItem('custom_feeds', JSON.stringify(newFeeds));
		}
		//if there's only 1 custom feed then we need to delete whole AsyncStorage of it. Otherwise there's bug that we can't add new custom feed to AsyncStorage.
		else {
			const del = await AsyncStorage.removeItem('custom_feeds');
		}
		console.log(ID);
		const delDis = await AsyncStorage.removeItem(`dis${ID}`);
		
		this.closeModal('deleteModalVisible');
	}

	async renameCustomRSS() {
		const ID = this.props.ID;
		const rename = this.state.newCustomRSSName;

		let c_feeds = await AsyncStorage.getItem('custom_feeds');
		c_feeds = JSON.parse(c_feeds);

		const TO_EDIT_I = c_feeds.findIndex(e => e.id === ID);
		c_feeds[TO_EDIT_I].name = rename;

		await AsyncStorage.setItem('custom_feeds', JSON.stringify(c_feeds));
		
		this.closeModal('renameModalVisible');
	}

	render() {
		const ID = this.props.ID;
		let category = this.props.category;
		let disabled = this.state.disabled;
		let name = this.props.name;

		return (
			<View>
				<View style={[
					Styles.publisherCard,
					{ opacity: disabled === 'true' ? 0.3 : 1 }
				]}>
					<TouchableOpacity 
						style={{ flex: 1 }}
						activeOpacity={0.3}
						onPress={async () => {
							let disabled = this.state.disabled === 'false' ? 'true' : 'false';
							await AsyncStorage.setItem(`dis${ID}`, disabled);
							
							this.setState({
								disabled: this.state.disabled === 'false' ? 'true' : 'false'
							})
						}}
					>
						<Text style={{
							flex: 1,
							fontSize: 21
						}}>
							{name}
						</Text>
					</TouchableOpacity>
						<TouchableOpacity 
							onPress={() => this.openModal('renameModalVisible')} 
							activeOpacity={0.3}
						>
							<Icon name="edit" size={18} style={{marginRight: 8}}/>
						</TouchableOpacity>

						<TouchableOpacity 
							onPress={() => this.openModal('deleteModalVisible')}
							activeOpacity={0.3}
						>
							<Icon name="trash" size={18} 
								style={{
									color: disabled === 'true' ? '#000' : '#D8000C', 
									marginRight: 8
								}}
							/>
						</TouchableOpacity>

					<TouchableOpacity 
						activeOpacity={0.3} 
						onPress={async () => {
							let disabled = this.state.disabled === 'false' ? 'true' : 'false';
							await AsyncStorage.setItem(`dis${ID}`, disabled);
							this.setState({
								disabled: this.state.disabled === 'false' ? 'true' : 'false'
							})
						}}
					>
					{
						disabled === 'true' ?
							<Icon name="square" size={18} 
								style={{
									color: disabled === 'true' ? '#000' : '#0080B0'
								}}
							/>
						:
							<Icon name="check-square" size={18} style={{color: '#0080B0'}}/>
					}
					</TouchableOpacity>
				</View>


				<Modal
					visible={this.state.deleteModalVisible}
					animationType={'fade'}
					onRequestClose={() => this.closeModal('deleteModalVisible')}
					transparent={true}
				>
					<View style={Styles.m__RSS_wrapper}>
						<View style={Styles.m__RSS_container}>
							<Text style={Styles.m__RSS_header}>
								Delete '{category}' feed?
							</Text>
							<View style={{alignItems: 'center'}}>
								<Text style={{textAlign: 'center', marginTop: 6}}>
									Are you sure that you want to delete this feed? You can readd it later. 
								</Text>
								
								<View style={Styles.m__btn_wrapper}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text
											onPress={() => this.closeModal('deleteModalVisible')}
											style={[
												Styles.m__btn,
												{color: '#000', opacity: 0.3}
											]}
										>
											Cancel
										</Text>
									</TouchableNativeFeedback>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={Styles.m__btn} 
											onPress={() => this.deleteCustomRSS()}
										>
											Delete
										</Text>
									</TouchableNativeFeedback>
								</View>
							</View>
						</View>
					</View>
				</Modal>


				<Modal
					visible={this.state.renameModalVisible}
					animationType={'fade'}
					onRequestClose={() => this.closeModal('renameModalVisible')}
					transparent={true}
				>
					<View style={Styles.m__RSS_wrapper}>
						<View style={Styles.m__RSS_container}>
							<Text style={Styles.m__RSS_header}>
								Rename '{category}' feed?
							</Text>
							<View style={{alignItems: 'center'}}>
								<View style={Styles.m__input_wrapper}>
									<TextInput 
										onChangeText={(text) => this.setState({newCustomRSSName: text})}
										value={this.state.text}
										style={Styles.m__input}
										placeholder="New feed name"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
									/>
								</View>
								<View style={Styles.m__btn_wrapper}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={[
												Styles.m__btn,
												{color: '#000', opacity: 0.3}
											]} 
											onPress={() => this.closeModal('renameModalVisible')}
										>
											Cancel
										</Text>
									</TouchableNativeFeedback>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={[
												Styles.m__btn,
												{color: '#0080B0'}
											]}
											onPress={() => this.renameCustomRSS()}
										>
											Rename
										</Text>
									</TouchableNativeFeedback>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		)
	}
}