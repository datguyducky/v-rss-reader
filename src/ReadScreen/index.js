 // @refresh reset

import React from 'react';
import { SafeAreaView, TouchableHighlight, FlatList, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as rssParser from 'react-native-rss-parser';

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
					style={{marginLeft: 16}}
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
					style={{marginRight: 16}}
					color='#fff'
					/>
				</TouchableHighlight>
			)
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			feed: []
		}
	}

	componentDidMount() {
		const RSS_URL = [
			'https://www.theguardian.com/uk/technology/rss',				//THE GUARDIAN - TECH
			'https://www.theguardian.com/science/rss',						//THE GUARDIAN - SCIENCE
			'https://www.theguardian.com/world/rss',						//THE GUARDIAN - WORLD
			'https://www.theguardian.com/games/rss',						//THE GUARDIAN - GAMES
			'https://www.theguardian.com/global-development/rss',			//THE GUARDIAN - GLOBAL DEVELOPMENT
			'https://www.theguardian.com/books/rss',						//THE GUARDIAN - BOOKS
			'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',		//NYT - WORLD
			'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',	//NYT - TECH
			'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',		//NYT - SCIENCE
			'https://rss.nytimes.com/services/xml/rss/nyt/Space.xml',		//NYT - SPACE
			'https://rss.nytimes.com/services/xml/rss/nyt/Books.xml',		//NYT - BOOKS
			'https://rss.nytimes.com/services/xml/rss/nyt/Movies.xml',		//NYT - MOVIES
			'https://www.economist.com/science-and-technology/rss.xml',		//THE ECONOMIST - TECH
			'https://nypost.com/tech/feed/',								//NEW YORK POST - TECH
			'https://feeds.a.dj.com/rss/RSSWorldNews.xml',					//THE WALL STREET JOURNAL - WORLD
			'https://feeds.a.dj.com/rss/RSSWSJD.xml',						//THE WALL STREET JOURNAL - TECH
			'https://venturebeat.com/category/arvr/feed/',					//VENTURE BEAT - AR/VR
			'https://venturebeat.com/category/ai/feed/',					//VENTURE BEAT - AI
			'https://venturebeat.com/category/dev/feed/',					//VENTURE BEAT - DEV
			'https://venturebeat.com/category/pc-gaming/feed/',				//VENTURE BEAT - PC GAMING
			'https://venturebeat.com/category/security/feed/',				//VENTURE BEAT - SECURITY
			'https://www.theverge.com/rss/space/index.xml',					//THE VERGE - SPACE
			'https://www.wired.com/feed/category/ideas/latest/rss',			//WIRED - IDEAS
			'https://www.wired.com/feed/category/business/latest/rss',		//WIRED - BUSINESS
			'https://www.wired.com/feed/category/science/latest/rss',		//WIRED - SCIENCE
			'https://www.wired.com/feed/category/security/latest/rss',		//WIRED - SECURITY
		];

		async function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
		}

		shuffleArray(RSS_URL).then(() => {
			for(let i=25; i<RSS_URL.length; i++){
				fetch(RSS_URL[i])
				.then((response) => response.text())
				.then((responseData) => rssParser.parse(responseData))
				.then((rss) => {
					var pubName = rss.title;
					rss.items.map(function(rssItem){
						let re = /[0-9]{2}:/;
						let pub = rssItem.published.split(re)[0];
						re = /[a-zA-Z], /;
						pub = pub.split(re)[1];
						let obj = {
							title: rssItem.title,
							published: pub,
							url: rssItem.links[0].url,
							publisherName: pubName,
							categories: rssItem.categories[0]
						};
						this.setState({
							feed: [...this.state.feed, obj]
						});
					}.bind(this))
				})
				.catch(err => {
					console.log(err);
				});
			}
		})
	}

	render() {
		return (
			<SafeAreaView style={{backgroundColor: '#fbfbfb'}}>
				{/* changing status bar of Android to the same color as header */}
				<StatusBar backgroundColor="#0080B0" barStyle="light-content" />

				<FlatList
				data = { this.state.feed }
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
				keyExtractor = { item => item.id }
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