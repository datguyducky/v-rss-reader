import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import PubItem from './PubItem';

import Styles from './style';

export default class ListScreen extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: 'RSS Feeds',
			headerRight: () => (
				<TouchableNativeFeedback>
					<Icon 
					name="plus"
					size={24}
					onPress={() => navigation.state.params.openModal()}
					style={{padding: 15}}
					color='#fff'
					/>
				</TouchableNativeFeedback>
			)
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			RSS_PUBS: [],
			addRSSVisible: false,
			error: '',
			RSS_PUBi: [],
		}
	}
	
	async componentDidMount() {
		//const del = await AsyncStorage.removeItem('custom_feeds');
		this.props.navigation.setParams({
			openModal: this.openModal.bind(this)
		});

		//loading manually added by user rss feeds
		let custom = await AsyncStorage.getItem('custom_feeds');
		if (custom !== null) {
			custom = JSON.parse(custom);
		
			this.setState(previousState => ({
				RSS_PUBS: [...previousState.RSS_PUBS, custom]
			}));
		}

	}

	openModal() {
		this.setState({addRSSVisible:true});
	}

	closeModal() {
		this.setState({addRSSVisible:false, error: ''});
	}

	saveCustomRSS() {
		let RSS_LINK = this.state.customRSSLink;
		//checking if RSS LINK starts with http or https
		var re = new RegExp("^(http|https)://", "i");
		if(re.test(RSS_LINK) === false) {
			RSS_LINK = 'http://' + RSS_LINK;
		}
		const RSS_NAME = this.state.customRSSName;
		//console.log(RSS_NAME, RSS_LINK);
		const LOCAL_ID = this.state.RSS_PUBS;
		let LOCAL_ID_MAX = LOCAL_ID[LOCAL_ID.length - 1].feeds;
		LOCAL_ID_MAX = LOCAL_ID_MAX[LOCAL_ID_MAX.length - 1].id;
		//checking if user typed name and link of RSS
		if(RSS_LINK && RSS_NAME) {
			fetch(RSS_LINK)
			.then((response) => response.text())
			.then((responseData) => rssParser.parse(responseData))
			.then((rss) => {
				//displaying error when fetched websites is not RSS
				if(!rss.title){
					this.setState({error: 'Please check that link you\'ve provided is a working RSS link.'})
				}
				//saving name, link to AsyncStorage
				else if(RSS_NAME.length <= 20) {
					const CUSTOM_SAVE = {
						url: RSS_LINK,
						category: RSS_NAME,
						id: 0
					};
					const CUSTOM_LENGTH = async (CUSTOM_SAVE, LOCAL_ID_MAX) => {
						//console.log(rss);
						//const del = await AsyncStorage.removeItem('custom_feeds');
						const CUSTOM_FEEDS_KEYS = await AsyncStorage.getAllKeys();
						if(!CUSTOM_FEEDS_KEYS.includes('custom_feeds')) {
							const LAUNCH_SAVE = {
								name: "Others",
								feeds: [],
							}
							CUSTOM_SAVE.id = LOCAL_ID_MAX + 1;
							
							LAUNCH_SAVE.feeds.push(CUSTOM_SAVE);
							await AsyncStorage.setItem('custom_feeds', JSON.stringify(LAUNCH_SAVE));
						}
						else {
							let c_feeds = await AsyncStorage.getItem('custom_feeds');
							c_feeds = JSON.parse(c_feeds);
							
							let LOCAL_ID = c_feeds.feeds[c_feeds.feeds.length - 1].id;
							CUSTOM_SAVE.id = LOCAL_ID + 1;
							
							c_feeds.feeds.push(CUSTOM_SAVE);
							await AsyncStorage.setItem('custom_feeds', JSON.stringify(c_feeds));
							this.closeModal('deleteModalVisible');
						}
					}; CUSTOM_LENGTH(CUSTOM_SAVE, LOCAL_ID_MAX);
				}
				else {
					this.setState({error: 'Sorry, name of feed cannot be longer than 20 characters. '})
				}
			})
			.catch(err => {
				//console.log(err);
				this.setState({error: 'Please check that link you\'ve provided is a working RSS link.'})
			});
		};
	}

	render() {
		return(
			<View>
				<FlatList
					style={{backgroundColor: '#fbfbfb'}}
					data = { this.state.RSS_PUBS }
					renderItem = { ({ item, i }) => 
						<PubItem
							key={item.id}
							title={item.name}
							feeds={item.feeds}
						/> 
					}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent = { this.FeedSep }
				/>

				<Modal
					visible={this.state.addRSSVisible}
					animationType={'fade'}
					onRequestClose={() => this.closeModal()}
					transparent={true}
				>
					<View style={Styles.m__addRSS_wrapper}>
						<View style={Styles.m__addRSS_container}>
							<Text style={Styles.m__addRSS_header}>
								ADD CUSTOM RSS:
							</Text>
							<View style={{alignItems: 'center'}}>
								<View style={Styles.m__input_wrapper}>
									<TextInput 
										onChangeText={(text) => this.setState({customRSSName: text})}
										value={this.state.text}
										style={Styles.m__input}
										placeholder="RSS Name"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
									/>
								</View>
								<View style={Styles.m__input_wrapper}>
									<TextInput 
										onChangeText={(text) => this.setState({customRSSLink: text})}
										value={this.state.text}
										style={Styles.m__input}
										placeholder="RSS Link"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
										autoCapitalize="none"
									/>
								</View>
								
								<Text 
								style={[
									Styles.m__error,
									{opacity: this.state.error.length >= 1 ? 1 : 0}
								]}>
									{this.state.error}
								</Text>
								
								<View style={Styles.m__btn_wrapper}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={[
												Styles.m__btn, 
												{ color: '#000',  opacity: 0.3 }
											]} 
											onPress={() => this.closeModal()}
										>
											Cancel
										</Text>
									</TouchableNativeFeedback>

									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={Styles.m__btn} 
											onPress={() => this.saveCustomRSS()}
										>
											Create
										</Text>
									</TouchableNativeFeedback>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	FeedSep = () => {
		return (
		  	<View
			style={{
				marginVertical: 8,
			  	width: "100%",
			}}
		  	/>
		);
	}
}