import React, {Component} from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/Feather';

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

	async deleteCustomRSS() {
		const ID = this.props.ID;

		let c_feeds = await AsyncStorage.getItem('custom_feeds');
		c_feeds = JSON.parse(c_feeds);

		//if there's more than 1 custom feed then we need to create copy of feeds array without feed selected by user, and then AsyncStorage set new version of it.
		if(c_feeds.feeds.length > 1) {
			let newFeeds = c_feeds.feeds.filter(e => e.id !== ID);
			const deletedObject = {
				name: "Others",
				feeds: newFeeds
			}
			await AsyncStorage.setItem('custom_feeds', JSON.stringify(deletedObject));
		}
		//if there's only 1 custom feed then we need to delete whole AsyncStorage of it. Otherwise there's bug that we can't add new custom feed to AsyncStorage.
		else {
			const del = await AsyncStorage.removeItem('custom_feeds');
		}
		
		this.closeModal('deleteModalVisible');
	}

	openModal(n) {
		this.setState({[`${n}`]: true});
	}

	closeModal(n) {
		this.setState({[`${n}`]: false});
	}

	async renameCustomRSS() {
		const ID = this.props.ID;
		const rename = this.state.newCustomRSSName;

		let c_feeds = await AsyncStorage.getItem('custom_feeds');
		c_feeds = JSON.parse(c_feeds);

		const TO_EDIT_I = c_feeds.feeds.findIndex(e => e.id === ID);
		c_feeds.feeds[TO_EDIT_I].category = rename;

		const renamedObject = {
			name: "Others",
			feeds: c_feeds.feeds
		}
		await AsyncStorage.setItem('custom_feeds', JSON.stringify(renamedObject));
		
		this.closeModal('deleteModalVisible');
	}

	render() {
		const ID = 'disabled' + this.props.ID;
		let category = this.props.category;
		let disabled = this.state.disabled;
		let parent = this.props.parent;

		return (
			<View>
				<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 2,
				opacity: disabled === 'true' ? 0.3 : 1
				}}>
					<TouchableOpacity 
						style={{flex: 1}}
						activeOpacity={0.3}
						onPress={async () => {
							let disabled = this.state.disabled === 'false' ? 'true' : 'false';
							await AsyncStorage.setItem(`dis${ID}`, disabled);
							this.setState({
								disabled: this.state.disabled === 'false' ? 'true' : 'false'
							})
						}}
					>
						<Text style={[styles.catTitle]}>{category}</Text>
					</TouchableOpacity>
					{
						//rename custom feed
						parent === 'Others' ?
						<TouchableOpacity onPress={() => this.openModal('renameModalVisible')} activeOpacity={0.3}>
							<Icon name="edit" size={18} style={{marginRight: 8}}/>
						</TouchableOpacity>
						:
						null
					}
					{
						//delete custom feed
						parent === 'Others' ?
						<TouchableOpacity onPress={() => this.openModal('deleteModalVisible')} activeOpacity={0.3}>
							<Icon name="trash" size={18} style={{color: disabled === 'true' ? '#000' : '#D8000C', marginRight: 8}}/>
						</TouchableOpacity>
						:
						null
					}
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
							<Icon name="square" size={18} style={{color: disabled === 'true' ? '#000' : '#0080B0'}}/>
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
					<View style={{
						flex: 1,
						backgroundColor: 'rgba(0, 0, 0, 0.55)',
						justifyContent:'center',
					}}
					>
						<View style={{
							width: 280,
							backgroundColor: '#fff', 
							alignSelf: 'center',
							borderRadius: 6,
							elevation: 4,
						}}
						>
							<Text style={{
								fontSize: 24,
								textAlign: 'center',
								backgroundColor: '#0080B0',
								color: '#fff',
								fontWeight: 'bold',
								paddingVertical: 4,
								borderTopLeftRadius: 6,
								borderTopRightRadius: 6
							}}>
								Delete '{category}' feed?
							</Text>
							<View style={{alignItems: 'center'}}>
								<Text style={{textAlign: 'center', marginTop: 6}}>Are you sure that you want to delete this feed? You can readd it later. </Text>
								
								<View style={{flexDirection: 'row', marginLeft: 'auto', marginTop: 8, marginBottom: 10}}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text style={{fontSize: 21, fontWeight: 'bold', color: '#000', padding: 4, opacity: 0.3, marginRight: 8}} onPress={() => this.closeModal('deleteModalVisible')}>
											Cancel
										</Text>
									</TouchableNativeFeedback>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text style={{
											fontSize: 21, 
											fontWeight: 'bold', 
											color: '#D8000C', 
											padding: 4, 
											marginRight: 8
										}} 
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
					<View style={{
						flex: 1,
						backgroundColor: 'rgba(0, 0, 0, 0.55)',
						justifyContent:'center',
					}}
					>
						<View style={{
							width: 280,
							backgroundColor: '#fff', 
							alignSelf: 'center',
							borderRadius: 6,
							elevation: 4,
						}}
						>
							<Text style={{
								fontSize: 24,
								textAlign: 'center',
								backgroundColor: '#0080B0',
								color: '#fff',
								fontWeight: 'bold',
								paddingVertical: 4,
								borderTopLeftRadius: 6,
								borderTopRightRadius: 6
							}}>
								Rename '{category}' feed?
							</Text>
							<View style={{alignItems: 'center'}}>
								<View style={{marginTop: 10, width: '80%', borderBottomWidth: 2, borderBottomColor: '#0080B0'}}>
									<TextInput 
										onChangeText={(text) => this.setState({newCustomRSSName: text})}
										value={this.state.text}
										style={{height: 36, width:'100%', padding: 0, paddingLeft: 5, fontSize: 17}}
										placeholder="New feed name"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
									/>
								</View>
								<View style={{flexDirection: 'row', marginLeft: 'auto', marginTop: 8, marginBottom: 10}}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text style={{fontSize: 21, fontWeight: 'bold', color: '#000', padding: 4, opacity: 0.3, marginRight: 8}} onPress={() => this.closeModal('renameModalVisible')}>
											Cancel
										</Text>
									</TouchableNativeFeedback>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text style={{
											fontSize: 21, 
											fontWeight: 'bold', 
											color: '#D8000C', 
											padding: 4, 
											marginRight: 8
										}} 
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
	catTitle: {
		flex: 1,
		fontSize: 21,
	},
})