import React, { Component } from 'react';
import { View, Modal, Text, Picker, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TouchableNativeFeedback,  } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';

import * as rssParser from 'react-native-rss-parser';
import AsyncStorage from '@react-native-community/async-storage';

import FeedsCat from './FeedsCat';


export default class Feeds extends Component {
	static navigationOptions = (navigation) => {
		console.log(navigation.screenProps)
		return {
			headerTitle: 'RSS Feeds',
			headerLeft: () => (
				<TouchableNativeFeedback>
					<Icon 
					name="arrow-left"
					size={24}
					onPress={() => {
						navigation.navigation.navigate('Read');
						//TODO: re-render ReadScreen
 					}}
					style={{padding: 15}}
					color='#fff'
					/>
				</TouchableNativeFeedback>
			),
			headerTitleStyle: {
				fontFamily: 'Muli-ExtraBold'
			},
			headerStyle: {
				backgroundColor: navigation.screenProps.themeColor
			},
			headerRight: () => (
				<TouchableNativeFeedback>
					<Icon 
					name="plus"
					size={24}
					onPress={() => navigation.navigation.state.params.openModal('opRSS')}
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
			RSS_PUBS: [{
				feeds: [{
					
				}]
			}],
			addRSSVisible: false,
			opRSS: false,
			addCatVisible: false,
			error: '',
			catList: [],
		}
		this.renderChanges = this.renderChanges.bind(this);
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
			this.setState({
				RSS_PUBS: custom
			});
		}

		let catList = await AsyncStorage.getItem('catList');
		catList = JSON.parse(catList);
		this.setState({catList: catList})
	}

	openModal(n) {
		this.setState({[`${n}`]: true});
	}

	closeModal(n) {
		this.setState({[`${n}`]: false});
	}

	async renderChanges() {
		let custom = await AsyncStorage.getItem('custom_feeds');

		if (custom !== null) {
			custom = JSON.parse(custom);
			//console.log(custom);
			this.setState({
				RSS_PUBS: custom
			});
		}

		let catList = await AsyncStorage.getItem('catList');
		catList = JSON.parse(catList);
		this.setState({catList: catList})
	}

	async saveCustomCat() {
		const CAT_NAME = this.state.customCatName;
		
		if(CAT_NAME === undefined || CAT_NAME.length < 4 ) {
			this.setState({error: 'Sorry, category name must be at least 4 characters long.'})
		}
		
		else {
			let catList = await AsyncStorage.getItem('catList');
			catList = JSON.parse(catList);

			//saving first category
			if (catList === null) {
				const CAT_SAVE = [{
					name: CAT_NAME,
					id: 0,
				}];
				
				await AsyncStorage.setItem('catList', JSON.stringify(CAT_SAVE));

				this.closeModal('addCatVisible');
				this.closeModal('opRSS');
				this.renderChanges();
			}
			
			//saving category
			else {
				const ID = catList.length;
				const r = new RegExp('^' + CAT_NAME, 'g');
				//getting array of objects that starts with..
				let dupCheck = catList.filter(({name}) => name.match(r));
				
				const CAT_SAVE = {
					name: dupCheck.length > 0 ? CAT_NAME + dupCheck.length : CAT_NAME,
					id: ID + 1
				};
				
				catList.push(CAT_SAVE);
				await AsyncStorage.setItem('catList', JSON.stringify(catList));
				
				this.closeModal('addCatVisible');
				this.closeModal('opRSS');
				this.renderChanges();
			}
		}
	}

	saveCustomRSS() {
		let RSS_LINK = this.state.customRSSLink;
		//checking if RSS LINK starts with http or https
		var re = new RegExp("^(http|https)://", "i");
		if(re.test(RSS_LINK) === false) {
			RSS_LINK = 'http://' + RSS_LINK;
		}
		const RSS_NAME = this.state.customRSSName;
		const RSS_CAT = this.state.addRSSCat;
		

		//checking if user typed name and link of RSS
		if(RSS_LINK && RSS_NAME && RSS_CAT) {
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
						category: RSS_CAT,
						feeds: [{
							url: RSS_LINK,
							name: RSS_NAME,
							id: 0
						}]
					};

					const CUSTOM_LENGTH = async (CUSTOM_SAVE, RSS_LINK, RSS_NAME) => {
						//await AsyncStorage.removeItem('custom_feeds');
						const CUSTOM_FEEDS_KEYS = await AsyncStorage.getAllKeys();
						if(!CUSTOM_FEEDS_KEYS.includes('custom_feeds')) {
							const LAUNCH_SAVE = [];
							LAUNCH_SAVE.push(CUSTOM_SAVE);
							await AsyncStorage.setItem('custom_feeds', JSON.stringify(LAUNCH_SAVE));
							
							this.closeModal('addRSSVisible');
							this.closeModal('opRSS');
							this.renderChanges();
						}
						else {
							let c_feeds = await AsyncStorage.getItem('custom_feeds');
							c_feeds = JSON.parse(c_feeds);
							
							const CAT_i = c_feeds.findIndex(item => item.category === CUSTOM_SAVE.category);
							if(CAT_i >= 0) {
								const toSend = {
									url: RSS_LINK,
									name: RSS_NAME,
									id: c_feeds[CAT_i].feeds.length
								}

								c_feeds[CAT_i].feeds.push(toSend);
								await AsyncStorage.setItem('custom_feeds', JSON.stringify(c_feeds));
							
								this.closeModal('addRSSVisible');
								this.closeModal('opRSS');
								this.renderChanges();

							} else {
								c_feeds.push(CUSTOM_SAVE);
								await AsyncStorage.setItem('custom_feeds', JSON.stringify(c_feeds));
								
								this.closeModal('addRSSVisible');
								this.closeModal('opRSS');
								this.renderChanges();
							}
						}
					}; CUSTOM_LENGTH(CUSTOM_SAVE, RSS_LINK, RSS_NAME );
				}
				else {
					this.setState({error: 'Sorry, name of feed cannot be longer than 20 characters. '})
				}
			})
			.catch(err => {
				console.log(err);
				this.setState({error: 'Please check that link you\'ve provided is a working RSS link.'})
			});
		}

		else {
			this.setState({error: 'Please provide name and link of RSS feed and make sure that you\'ve selected one of available categories!'})
		}
	}

	render() {
		let catList = this.state.catList;

		return(
			<View>
				<FlatList
					style={{backgroundColor: '#fbfbfb', minHeight: '100%'}}
					data = { this.state.RSS_PUBS }
					renderItem = { ({ item, i }) => 
						<FeedsCat
							category={item.category}
							c_list={item}
							renderChanges={this.renderChanges}
						/>
					}
					keyExtractor={(item, index) => index.toString()}
				/>

				<Modal
					visible={this.state.opRSS}
					animationType={'slides'}
					onRequestClose={() => this.closeModal('opRSS')}
					transparent={true}
				>
					<View style={styles.m__opRSS_wrapper}>
						{/* hack so this modal can be closed by clicking on header */}
						<TouchableOpacity 
							style={{height: 56}} 
							onPress={() => this.closeModal('opRSS')}
						/>
						
						<View style={styles.m__opRSS_btn_wrapper}>
							<TouchableNativeFeedback>
								<Text 
									style={styles.m__opRSS_btn} 
									onPress={() => this.openModal('addCatVisible')}
								>
									New category
								</Text>
							</TouchableNativeFeedback>
							<TouchableNativeFeedback>
								<Text 
									style={styles.m__opRSS_btn}
									onPress={() => this.openModal('addRSSVisible')}
								>
									New RSS feed
								</Text>
							</TouchableNativeFeedback>
						</View>

						{/* hack so this modal can be closed by clicking everywhere else than buttons */}
						<TouchableOpacity 
							style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.55)'}} 
							activeOpacity={0.95}
							onPress={() => this.closeModal('opRSS')}
						/>
					</View>
				</Modal>

				<Modal
					visible={this.state.addCatVisible}
					animationType={'fade'}
					onRequestClose={() => this.closeModal('addCatVisible')}
					transparent={true}
				>
					<View style={styles.m__addRSS_wrapper}>
						<View style={styles.m__addRSS_container}>
							<Text style={styles.m__addRSS_header}>
								NEW CATEGORY:
							</Text>
							<View style={{alignItems: 'center'}}>
								<View style={styles.m__input_wrapper}>
									<TextInput 
										onChangeText={(text) => this.setState({customCatName: text})}
										value={this.state.text}
										style={styles.m__input}
										placeholder="Category Name"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
									/>
								</View>
								
								<Text 
								style={[
									styles.m__error,
									{opacity: this.state.error.length >= 1 ? 1 : 0}
								]}>
									{this.state.error}
								</Text>
								
								<View style={styles.m__btn_wrapper}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={[
												styles.m__btn, 
												{ color: '#000',  opacity: 0.3 }
											]} 
											onPress={() => this.closeModal('addCatVisible')}
										>
											Cancel
										</Text>
									</TouchableNativeFeedback>

									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={styles.m__btn} 
											onPress={() => this.saveCustomCat()}
										>
											Create
										</Text>
									</TouchableNativeFeedback>
								</View>
							</View>
						</View>
					</View>
				</Modal>

				<Modal
					visible={this.state.addRSSVisible}
					animationType={'fade'}
					onRequestClose={() => this.closeModal('addRSSVisible')}
					transparent={true}
				>
					<View style={styles.m__addRSS_wrapper}>
						<View style={styles.m__addRSS_container}>
							<Text style={styles.m__addRSS_header}>
								ADD RSS FEED:
							</Text>
							<View style={{alignItems: 'center'}}>
								<View style={styles.m__input_wrapper}>
									<TextInput 
										onChangeText={(text) => this.setState({customRSSName: text})}
										value={this.state.text}
										style={styles.m__input}
										placeholder="RSS Name"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
									/>
								</View>
								<View style={styles.m__input_wrapper}>
									<TextInput 
										onChangeText={(text) => this.setState({customRSSLink: text})}
										value={this.state.text}
										style={styles.m__input}
										placeholder="RSS Link"
										selectionColor='#0080B0'
										underlineColorAndroid="transparent"
										autoCapitalize="none"
									/>
								</View>

								<View style={{width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 14}}>
									<Text style={{fontSize: 17}}>
										Category: 
									</Text>

									<Picker 
										selectedValue={this.state.addRSSCat}
										style={{height: 38, width: 140}}
										onValueChange={(itemValue, itemIndex) =>
											this.setState({addRSSCat: itemValue})
										}
									>
									{
										catList !== null ?
											catList.map((o) => {
												return (
													<Picker.Item label={o.name} value={o.name} key={o.id}/>
												)
											})
										: null
									}
									</Picker>
								</View>
								
								<Text 
								style={[
									styles.m__error,
									{opacity: this.state.error.length >= 1 ? 1 : 0}
								]}>
									{this.state.error}
								</Text>
								
								<View style={styles.m__btn_wrapper}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={[
												styles.m__btn, 
												{ color: '#000',  opacity: 0.3 }
											]} 
											onPress={() => this.closeModal('addRSSVisible')}
										>
											Cancel
										</Text>
									</TouchableNativeFeedback>

									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text 
											style={styles.m__btn} 
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
}

const styles = StyleSheet.create({
	//TO DO: change name of class from m_addRSS_* to m_add_*
	m__addRSS_wrapper: {
		flex: 1,
		justifyContent:'center',
	},

	m__addRSS_container: {
		width: 280,
		backgroundColor: '#fff', 
		alignSelf: 'center',
		borderRadius: 6,
		elevation: 4,
	},

	m__addRSS_header: {
		fontSize: 21,
		textAlign: 'center',
		backgroundColor: '#0080B0',
		color: '#fff',
		paddingVertical: 4,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
		fontFamily: 'Muli-ExtraBold'
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
	},

	m__error: {
		textAlign: 'center', 
		color: '#D8000C', 
		width: '80%',
		marginTop: 4,
		fontSize: 12,
		fontFamily: 'Muli-Bold'
	},

	m__btn_wrapper: {
		flexDirection: 'row', 
		marginLeft: 'auto', 
		marginTop: 8,
		marginBottom: 10
	},

	m__btn: {
		fontSize: 18, 
		color: '#0080B0', 
		padding: 4, 
		marginRight: 8,
		fontFamily: 'Muli-ExtraBold'
	},

	//TO DO: change name from m_opRSS to m_subMenu
	m__opRSS_wrapper: {
		height: '100%',
	},

	m__opRSS_btn_wrapper: {
		backgroundColor: '#1575a0',
		fontSize: 32,
		flexDirection: 'row',
		justifyContent: 'center'
	},

	m__opRSS_btn: {
		color: '#fff',
		fontSize: 15,
		padding: 12,
		textTransform: 'uppercase',
		fontFamily: 'Muli-Light',
	}
})