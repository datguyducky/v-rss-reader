 // @refresh reset

import React from 'react';
import { SafeAreaView, TouchableHighlight, FlatList, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import * as rssParser from 'react-native-rss-parser';
import AsyncStorage from '@react-native-community/async-storage';
import * as RSS_JSON from '../RSS_FEEDS.json';

import FeedItem from './FeedItem'

export default class ReadScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			//icon on the left of the header. With clickable icon to Profile Screen.
			headerLeft: () => (
				<TouchableHighlight>
					<Icon 
					name="user" 
					size={24}
					onPress={() => navigation.navigate('Profile')}
					style={{padding: 15}}
					color="#fff"
					/>
				</TouchableHighlight>
			),
			headerTitle: 'Just News',
			headerTitleStyle: { 
				flex: 1, 
				textAlign: 'center',
				fontWeight: 'bold',
				textTransform: 'uppercase'
			},
			//icon on the right of the header. With clickable icon to List of RSS Screen
			headerRight: () => (
				<TouchableHighlight>
					<Icon 
					name="rss"
					size={24}
					onPress={() => navigation.navigate('List')}
					style={{padding: 15}}
					color='#fff'
					/>
				</TouchableHighlight>
			)
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			feed: [],
			RSS: [],
			RSS_LINKS: []
		}
	}

	async componentDidMount() {
		for(let i=0; i<4; i++){
			const R_FEED = RSS_JSON.RSS[i].feeds;
			for(let j=0; j<R_FEED.length; j++) {
				const R_FEED_URL = R_FEED[j].url;
				
				const ID = 'dis' + R_FEED[j].id;
				const DISABLE_STATE = await AsyncStorage.getItem(ID);

				if(DISABLE_STATE === 'false' ) {;
					const FEED_RESPONSE = await fetch(R_FEED_URL);
					const myJson = await FEED_RESPONSE.text();
					const rss = await rssParser.parse(myJson)
					
					for(let k=0; k<6; k++) {
						var pubName = rss.title;
						const R_ITEM = rss.items[k];
						
						let re = /[0-9]{2}:/;
						let pub = R_ITEM.published.split(re)[0];
						re = /[a-zA-Z], /;
						pub = pub.split(re)[1];
						
						let obj = {
							title: R_ITEM.title,
							published: pub,
							url: R_ITEM.links[0].url,
							publisherName: pubName,
							categories: R_ITEM.categories[0]
						};
						this.setState({
							feed: [...this.state.feed, obj]
						});
					}
				}
			}	
		}

		let custom = await AsyncStorage.getItem('custom_feeds');
		
		if (custom !== null) {
			custom = JSON.parse(custom);

			for(let i=0; i<custom.feeds.length; i++) {
				const R_FEED_URL = custom.feeds[i].url;
				const CUSTOM_NAME = custom.feeds[i].category;
				const ID = 'dis' + custom.feeds[i].id;
				const DISABLE_STATE = await AsyncStorage.getItem(ID);

				if(DISABLE_STATE === 'false' || DISABLE_STATE === null) {
					const FEED_RESPONSE = await fetch(R_FEED_URL);
					const myJson = await FEED_RESPONSE.text();
					const rss = await rssParser.parse(myJson)

					for(let j=0; j<12; j++) {
						var pubName = rss.title;
						
						const C_ITEM = rss.items[j];
						let re = /[0-9]{2}:/;
						let pub = C_ITEM.published.split('T')[0];

						let obj = {
							title: C_ITEM.title,
							published: pub,
							url: C_ITEM.links[0].url,
							publisherName: CUSTOM_NAME,
							categories: C_ITEM.categories[0]
						};
						this.setState({
							feed: [...this.state.feed, obj]
						});
					}
				}
			}
		}


	}
	render() {
		return (
			<SafeAreaView style={{backgroundColor: '#fbfbfb'}}>
				{/* changing status bar of Android to the same color as header */}
				<StatusBar backgroundColor="#0080B0" barStyle="light-content" />

				<FlatList
				data = { this.state.feed }
				keyExtractor={(item, index) => index.toString()}
				renderItem = { ({ item }) => 
					<FeedItem
						id={item.id}
						title={item.title} 
						url={item.url} 
						published={item.published}
						pubName={item.publisherName}
						categories={item.categories}
					/> 
				}
				ItemSeparatorComponent = { this.FeedSep }
				ListFooterComponent = { this.FedBottom }
				/>
		  	</SafeAreaView>
		);
	}

	//used as a margin between FlatList items
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

	//only used at the end of FlatList. Empty, blue bar.
	FedBottom = () => {
		return(
			<View
			style={{
				width: '100%',
				height: 16,
				backgroundColor: '#0080B0'
			}}
			/>
		)
	}
}