import React, { Component } from 'react';
import { View, Text, } from 'react-native';
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
					onPress={() => navigation.navigate('List')}
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
			RSS_PUBS: []
		}
	}

	componentDidMount() {
		RSS_JSON.RSS.map(function(e){
			let obj = {
				name: e.name,
				feeds: e.feeds
			};
			
			this.setState(previousState => ({
				RSS_PUBS: [...previousState.RSS_PUBS, obj]
			}));
		}.bind(this))
	}

	render() {
		return(
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