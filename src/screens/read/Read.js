 // @refresh reset

import React from 'react';
import { SafeAreaView, FlatList, View, StatusBar } from 'react-native';
import { TouchableNativeFeedback,  } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';

import * as rssParser from 'react-native-rss-parser';
import AsyncStorage from '@react-native-community/async-storage';

import ReadCard from './ReadCard'


export default class Read extends React.Component {
	static navigationOptions = (navigation) => {
		return {
			//icon on the left of the header. With clickable icon to Profile Screen.
			headerLeft: () => (
				<TouchableNativeFeedback>
				<Icon 
					name="settings" 
					size={24}
					onPress={() => navigation.navigation.navigate('Settings')}
					style={{padding: 15}}
					color="#fff"
				/>
				</TouchableNativeFeedback>
			),
			headerTitle: 'V - RSS Reader',
			headerTitleStyle: { 
				flex: 1, 
				textAlign: 'center',
				textTransform: 'uppercase',
				fontFamily: 'Muli-ExtraBold'
			},
			headerStyle: {
				backgroundColor: navigation.screenProps.themeColor
			},
			//icon on the right of the header. With clickable icon to List of RSS Screen
			headerRight: () => (
				<TouchableNativeFeedback>
				<Icon 
					name="rss"
					size={24}
					onPress={() => navigation.navigation.navigate('Feeds')}
					style={{padding: 15}}
					color='#fff'
				/>
				</TouchableNativeFeedback>
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
		let s_feedNews = 4;
		s_feedNews = await AsyncStorage.getItem('s_feedNews'); //max number of news from one feed
		if(s_feedNews === null) {s_feedNews = 4;}
		
		let s_totNews = 60;
		s_totNews = await AsyncStorage.getItem('s_totNews'); //max total number of news
		if(s_totNews === null) {s_totNews = 20;}
		
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

							//max X news from one feed
							for(let k=0; k<=s_feedNews - 1; k++) {
								const C_ITEM = RSS.items[k];
								let re = /[0-9]{2}:/;
								let pub = C_ITEM.published.split('T')[0];
								re = /[0-9]{2}\ [a-zA-Z]{3}\ [0-9]{4}/;
								pub = pub.match(re) !== null ? pub.match(re)[0] : pub;
		
								let obj = {
									title: C_ITEM.title,
									published: pub,
									url: C_ITEM.links[0].url,
									publisherName: F_NAME + ' - ' + F_CAT,
									categories: C_ITEM.categories[0]
								};

								//max 150 total of FeedItem components
								if(this.state.feed.length <= s_totNews - 1) {
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
		let themeColor = this.props.screenProps.themeColor;
		
		let themeMode = this.props.screenProps.themeMode;
		let themeBgColor = '#fbfbfb';
		let themeTColor = '#000';
		let themeBgColor2 = '#fff'

		if(themeMode === 'true') {
			themeBgColor = '#333';
			themeBgColor2 = '#222';
			themeTColor = '#fff'; 
		};
		

		return (
			<SafeAreaView style={{backgroundColor: themeBgColor}}>
				{/* changing status bar of Android to the same color as header */}
				<StatusBar backgroundColor={themeColor} barStyle="light-content" />

				<FlatList
				style={{minHeight: '100%'}}
				data = { this.state.feed }
				keyExtractor={(item, index) => index.toString()}
				renderItem = { ({ item }) => 
					<ReadCard
						id={item.id}
						title={item.title} 
						url={item.url} 
						published={item.published}
						pubName={item.publisherName}
						categories={item.categories}
						themeColor={themeColor}
						themeBgColor={themeBgColor}
						themeBgColor2={themeBgColor2}
						themeTColor={themeTColor}
					/> 
				}
				ItemSeparatorComponent = { this.FeedSep }
				contentContainerStyle={{flexGrow: 1}} //using it so footerComponent is always on bottom
				ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}} //using it so footerComponent is always on bottom
				ListFooterComponent = { this.state.feed.length > 0 ? this.FedBottom(themeColor) : null }
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
	FedBottom = (themeColor) => {
		return(
			<View
			style={{
				width: '100%',
				height: 16,
				backgroundColor: themeColor,
			}}
			/>
		)
	}
}