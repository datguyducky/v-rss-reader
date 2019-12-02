import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet, Button, TextInput } from 'react-native';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';

import * as RSS_JSON from '../RSS_FEEDS.json';
import PubItem from './PubItem';
import Icon from 'react-native-vector-icons/Feather';

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
		this.setState({addRSSVisible:false});
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
						backgroundColor: 'rgba(180, 180, 180, 0.4)',
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
									/>
								</View>
								<View style={{flexDirection: 'row', marginLeft: 'auto', marginTop: 18, marginBottom: 10}}>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text style={{fontSize: 21, fontWeight: 'bold', color: '#000', padding: 4, opacity: 0.3, marginRight: 8}}  onPress={() => this.closeModal()}>Cancel</Text>
									</TouchableNativeFeedback>
									<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
										<Text style={{fontSize: 21, fontWeight: 'bold', color: '#0080B0', padding: 4, marginRight: 8}}>Create</Text>
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