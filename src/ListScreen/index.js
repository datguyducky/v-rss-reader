import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet, Button, TextInput } from 'react-native';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
import * as rssParser from 'react-native-rss-parser';

import * as RSS_JSON from '../RSS_FEEDS.json';
import PubItem from './PubItem';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

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
			addRSSVisible: true,
			error: false
		}
	}
	
	componentDidMount() {
		this.props.navigation.setParams({
			openModal: this.openModal.bind(this)
		});
		
		RSS_JSON.RSS.map(function(e){
			let obj = {
				name: e.name,
				feeds: e.feeds
			};
			
			this.setState(previousState => ({
				RSS_PUBS: [...previousState.RSS_PUBS, obj]
			}));
		}.bind(this));
	}

	openModal() {
		this.setState({addRSSVisible:true});
	}

	closeModal() {
		this.setState({addRSSVisible:false, error: false});
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
					this.setState({error: true})
				}
				//saving name, link to AsyncStorage
				else {
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
						}
					}; CUSTOM_LENGTH(CUSTOM_SAVE, LOCAL_ID_MAX);
				}
			})
			.catch(err => {
				//console.log(err);
				this.setState({error: true})
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
					<View style={{
						flex: 1,
						backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
								ADD CUSTOM RSS:
							</Text>
							<View style={{alignItems: 'center'}}>
								<View style={{marginTop: 10, width: '80%', borderBottomWidth: 2, borderBottomColor: '#0080B0'}}>
									<TextInput 
										onChangeText={(text) => this.setState({customRSSName: text})}
										value={this.state.text}
										style={{height: 36, width:'100%', padding: 0, paddingLeft: 5, fontSize: 17}}
										placeholder="RSS Name"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
									/>
								</View>
								<View style={{marginTop: 8, width: '80%', borderBottomWidth: 2, borderBottomColor: '#0080B0'}}>
									<TextInput 
										onChangeText={(text) => this.setState({customRSSLink: text})}
										value={this.state.text}
										style={{height: 36, width:'100%', padding: 0, paddingLeft: 5, fontSize: 17}}
										placeholder="RSS Link"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
										autoCapitalize="none"
									/>
								</View>
								
								<Text style={{
									textAlign: 'center', 
									color: '#D8000C', 
									width: '80%',
									marginTop: 4,
									fontSize: 12,
									opacity: this.state.error === true ? 1 : 0
								}}
								>
									Please check that link you've provided is a working RSS link.
								</Text>
								
								<View style={{flexDirection: 'row', marginLeft: 'auto', marginTop: 8, marginBottom: 10}}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text style={{fontSize: 21, fontWeight: 'bold', color: '#000', padding: 4, opacity: 0.3, marginRight: 8}} onPress={() => this.closeModal()}>Cancel</Text>
									</TouchableNativeFeedback>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text style={{
											fontSize: 21, 
											fontWeight: 'bold', 
											color: '#0080B0', 
											padding: 4, 
											marginRight: 8
										}} 
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