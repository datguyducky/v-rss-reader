 // @refresh reset

import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as rssParser from 'react-native-rss-parser';


export default class ReadScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: () => (
				<TouchableHighlight>
					<Icon 
					name="user" 
					size={24}
					onPress={() => navigation.navigate('Profile')}
					style={{marginLeft: 16}}
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
			headerRight: () => (
				<TouchableHighlight>
					<Icon 
					name="rss"
					size={24}
					onPress={() => navigation.navigate('List')}
					style={{marginRight: 16}}
					/>
				</TouchableHighlight>
			)
		};
	}

	componentDidMount() {
		const RSS_URL = [
			'https://www.theguardian.com/uk/technology/rss',				//THE GUARDIAN - TECH
			'https://www.theguardian.com/science/rss',						//THE GUARDIAN - SCIENCE
			'https://www.theguardian.com/world/rss',						//THE GUARDIAN - WORLD
			'https://www.theguardian.com/games/rss',						//THE GUARDIAN - GAMES
			'https://www.theguardian.com/global-development',				//THE GUARDIAN - GLOBAL DEVELOPMENT
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
		//console.log(RSS_URL.length);

		fetch(RSS_URL[0])
		.then((response) => response.text())
		.then((responseData) => rssParser.parse(responseData))
        .then((rss) => {
			console.log(rss.title);
			console.log(rss.items.length);
		})
		.catch(err => {
			console.log(err);
		});
	}

	render() {
		return (
			<Text>:d</Text>
		);
	}
}