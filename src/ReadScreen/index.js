 // @refresh reset

import React from 'react';
import { SafeAreaView, TouchableHighlight, FlatList, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import * as rssParser from 'react-native-rss-parser';
import AsyncStorage from '@react-native-community/async-storage';

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
			RSS: []
		}
	}

	async componentDidMount() {
		let custom = await AsyncStorage.getItem('custom_feeds');
		
		if (custom !== null) {
			custom = JSON.parse(custom);

			for(let i=0; i<custom.length; i++) {
				if(custom[i].feeds.length > 0) {
					let F_CAT = custom[i].category;
					let catFeeds = custom[i].feeds;
					
					for(let j=0; j<catFeeds.length; j++) {
						const F_ID = `dis${catFeeds[j].id}-${F_CAT}`;
						const F_NAME = catFeeds[j].name;
						const F_URL = catFeeds[j].url;
						const DISABLE_STATE = await AsyncStorage.getItem(F_ID);

						if(DISABLE_STATE === 'false' || DISABLE_STATE === null) {
							const RSS_FETCH = await fetch(F_URL);
							const FETCH_JSON = await RSS_FETCH.text();
							const RSS = await rssParser.parse(FETCH_JSON);

							//max 12 news from one feed
							for(let k=0; k<=10; k++) {
								const C_ITEM = RSS.items[k];
								let re = /[0-9]{2}:/;
								let pub = C_ITEM.published.split('T')[0];
								re = /[0-9]{2}\ [a-zA-Z]{3}\ [0-9]{4}/;
								pub = pub.match(re) !== null ? pub.match(re)[0] : pub;
		
								let obj = {
									title: C_ITEM.title,
									published: pub,
									url: C_ITEM.links[0].url,
									publisherName: F_NAME,
									categories: C_ITEM.categories[0]
								};

								//max 150 total of FeedItem components
								if(this.state.feed.length <= 150) {
									this.setState({
										feed: [...this.state.feed, obj]
									});
								}
							}
						}
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