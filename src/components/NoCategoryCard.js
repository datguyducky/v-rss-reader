import React, { useState, useEffect } from 'react';

import { 
	StyleSheet, 
	View, 
	Text, 
	FlatList,
	TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as rssParser from 'react-native-rss-parser';
import ReadCard from './ReadCard';


const NoCategoryCard = (props) => {
	const [rssObj, set_rssObj] = useState([]);
	const feedsList = props.feedsList || [];
	const [hideCat, set_hideCat] = useState(false);

	
	const catViewHandler = () => {
		set_hideCat(!hideCat);
	}


	const ReadCardSep = () => {
		return (
			<View style={{
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderBottomColor: 'CFD0D3',
				borderStyle: 'solid',
				opacity: 0.2
			}}/>
		)
	};
	
	const ReadCardHeader = () => {
		return (
			<TouchableNativeFeedback onPress={catViewHandler}>
				<View style={styles.CardHeaderWrapper}>
						{
							!hideCat ?
								<Icon name='minus' size={21} />
							: 
								<Icon name='plus' size={21} />
						}
						
						
						<Text style={styles.CardHeader}>
							Feeds without category:
						</Text>
				</View>
			</TouchableNativeFeedback>
		)
	}

	
	useEffect(() => {
		const fetchRSS = async () => {
			if(rssObj.length < feedsList.length) {
				for(let i=0; i<feedsList.length; i++){
					fetch(feedsList[i].href)
					.then(response => response.text())
					.then(responseData => rssParser.parse(responseData))
					.then((rss) => {
						// max 16 items per one RSS feed
						for(let j=0; j<=16; j++) {
							const RSS = rss.items[j];

							let re = /[0-9]{2}:/;
							let pub = RSS.published.split('T')[0];
							re = /[0-9]{2}\ [a-zA-Z]{3}\ [0-9]{4}/;
							pub = pub.match(re) !== null ? pub.match(re)[0] : pub;

							const rssToSave = {
								title: RSS.title,
								date_published: pub,
								url: RSS.links[0].url,
								publisher_name: feedsList[i].name,
								categories: RSS.categories[0].name,
							}

							set_rssObj(rssObj => [...rssObj, rssToSave]);
						}
					})
					
					.catch(err => console.log(err))
				}
			}
		}; fetchRSS();
	}, [])
	
	console.log(hideCat)
	return (
		<View style={styles.CardWrapper}>
			{
				rssObj.length > 0 && !hideCat ?
					<FlatList
						style={{minHeight: '100%'}}
						data = {rssObj}
						keyExtractor={(item, i) => i.toString()}
						renderItem = { ({ item }) => 
							<ReadCard
								title={item.title}
								date_published={item.date_published} 
								url={item.url} 
								publisher_name={item.publisher_name}
								categories={item.categories}
							/> 
						}
						ListHeaderComponent = { ReadCardHeader }
						ItemSeparatorComponent = { ReadCardSep }
					/>
				: <ReadCardHeader />
			}
		</View>
	);
	
}; export default NoCategoryCard;


const styles = StyleSheet.create({
	CardWrapper: {
		backgroundColor: '#fff',
		paddingVertical: 8
	},

	CardHeaderWrapper: {
		fontSize: 21,
		paddingHorizontal: 12,
		flexDirection: 'row',
		alignItems: 'center'
	},

	CardHeader: {
		fontSize: 21,
		fontFamily: 'Muli-SemiBold',
		marginLeft: 4
	},
});