import React, {Component} from 'react';
import { Modal, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';

export default class FeedsCard extends Component {
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
		const CAT = this.props.category;
		const value = await AsyncStorage.getItem(`dis${ID}-${CAT}`);
		console.log(CAT+ID, value)

		if(value === null){
			await AsyncStorage.setItem(`dis${ID}-${CAT}`, 'false');
		}

		this.setState({
			disabled: value
		});
	}

	openModal(n) {
		this.setState({[`${n}`]: true});
	}

	closeModal(n) {
		this.setState({[`${n}`]: false});
	}

	async deleteCustomRSS() {
		const ID = this.props.ID;
		const CAT = this.props.category;

		let c_feeds = await AsyncStorage.getItem('custom_feeds');
		c_feeds = JSON.parse(c_feeds);

		//trying to find index of array that have feeds for this category, then we create coppy of that array without feed that we clicked to delete
		const CAT_i = c_feeds.findIndex(item => item.category === CAT);
		let newFeeds = c_feeds[CAT_i].feeds.filter(e => e.id !== ID);

		c_feeds[CAT_i].feeds = newFeeds;
		
		//saving version of c_feeds without that deleted feed to AsyncStorage
		await AsyncStorage.setItem('custom_feeds', JSON.stringify(c_feeds));
		//removing 'disabled' state from AsyncStorage
		const delDis = await AsyncStorage.removeItem(`dis${ID}-${CAT}`); 

		this.props.renderChanges();
		this.closeModal('deleteModalVisible');
	}

	async renameCustomRSS() {
		const ID = this.props.ID;
		const CAT = this.props.category;
		const rename = this.state.newCustomRSSName;

		let c_feeds = await AsyncStorage.getItem('custom_feeds');
		c_feeds = JSON.parse(c_feeds);

		const CAT_i = c_feeds.findIndex(item => item.category === CAT);
		const TO_EDIT_i = c_feeds[CAT_i].feeds.findIndex(e => e.id === ID);
		c_feeds[CAT_i].feeds[TO_EDIT_i].name = rename;

		await AsyncStorage.setItem('custom_feeds', JSON.stringify(c_feeds));

		this.props.renderChanges();
		this.closeModal('renameModalVisible');
	}

	render() {
		const ID = this.props.ID;
		let CAT = this.props.category;
		let disabled = this.state.disabled;
		let name = this.props.name;

		return (
			<View>
				<View style={[
					styles.publisherCard,
					{ opacity: disabled === 'true' ? 0.3 : 1 }
				]}>
					<TouchableOpacity 
						style={{ flex: 1 }}
						activeOpacity={0.3}
						onPress={async () => {
							let disabled = this.state.disabled === 'false' ? 'true' : 'false';
							await AsyncStorage.setItem(`dis${ID}-${CAT}`, disabled);
							console.log(ID, CAT)
							
							this.setState({
								disabled: this.state.disabled === 'false' ? 'true' : 'false'
							})
						}}
					>
						<Text style={{
							flex: 1,
							fontSize: 21,
							fontFamily: 'OpenSans-Regular'
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
							await AsyncStorage.setItem(`dis${ID}-${CAT}`, disabled);
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
					<View style={styles.m__RSS_wrapper}>
						<View style={styles.m__RSS_container}>
							<Text style={styles.m__RSS_header}>
								Delete '{name}' feed?
							</Text>
							<View style={{alignItems: 'center'}}>
								<Text style={{textAlign: 'center', marginTop: 6}}>
									Are you sure that you want to delete this feed? You can readd it later. 
								</Text>
								
								<View style={styles.m__btn_wrapper}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text
											onPress={() => this.closeModal('deleteModalVisible')}
											style={[
												styles.m__btn,
												{color: '#000', opacity: 0.3}
											]}
										>
											Cancel
										</Text>
									</TouchableNativeFeedback>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={styles.m__btn} 
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
					<View style={styles.m__RSS_wrapper}>
						<View style={styles.m__RSS_container}>
							<Text style={styles.m__RSS_header}>
								Rename '{name}' feed?
							</Text>
							<View style={{alignItems: 'center'}}>
								<View style={styles.m__input_wrapper}>
									<TextInput 
										onChangeText={(text) => this.setState({newCustomRSSName: text})}
										value={this.state.text}
										style={styles.m__input}
										placeholder="New feed name"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
									/>
								</View>
								<View style={styles.m__btn_wrapper}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={[
												styles.m__btn,
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
												styles.m__btn,
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

const styles = StyleSheet.create({
	publisherCard: {
		flexDirection: 'row', 
		alignItems: 'center', 
		marginVertical: 2,
	},

	m__RSS_wrapper: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.55)',
		justifyContent:'center',
	},

	m__RSS_container: {
		width: 280,
		backgroundColor: '#fff', 
		alignSelf: 'center',
		borderRadius: 6,
		elevation: 4,
	},

	m__RSS_header: {
		fontSize: 21,
		textAlign: 'center',
		backgroundColor: '#0080B0',
		color: '#fff',
		fontFamily: 'Muli-ExtraBold',
		paddingVertical: 4,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6	
	},

	m__btn_wrapper: {
		flexDirection: 'row', 
		marginLeft: 'auto', 
		marginTop: 8,
		marginBottom: 10
	},

	m__btn: {
		fontSize: 18, 
		fontFamily: 'Muli-ExtraBold',
		color: '#D8000C', 
		padding: 4, 
		marginRight: 8	
	},

	m__input_wrapper: {
		marginTop: 10, 
		width: '80%', 
		borderBottomWidth: 2, 
		borderBottomColor: '#0080B0'
	},

	m__input: {
		height: 36, 
		width:'100%', 
		padding: 0, 
		paddingLeft: 5, 
		fontSize: 17,
		fontFamily: 'OpenSans-Regular'
	}
})