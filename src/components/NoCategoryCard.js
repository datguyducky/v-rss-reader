import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	FlatList,
	TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as rssParser from 'react-native-rss-parser';
import ReadCard from './ReadCard';
import styled, { withTheme } from 'styled-components';


const NoCategoryCard = (props) => {
	const [rssObj, set_rssObj] = useState([]);
	const feedsList = props.feedsList || [];
	const [hideCat, set_hideCat] = useState(true);
	const appTheme = props.theme;

	
	// hiding or unhiding category handler
	const collapsibleCategory = () => {
		set_hideCat(!hideCat);
	}


	// separator component for Flatlist
	// rendered in between each item, but not at the top or bottom
	const ReadCardSep = () => {
		return (
			<View style={{
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderBottomColor: appTheme.BORDER,
				borderStyle: 'solid',
			}}/>
		)
	};
	
	// header component for FlatList
	// rendered at the top
	const ReadCardHeader = () => {
		return (
			<TouchableNativeFeedback 
				onPress={() => {
					if(!props.editActive) {
						collapsibleCategory();

					} else {
						// collapsing 'feeds without category' list when edit mode is active
						set_hideCat(true);
						props.longPressHandler('feeds_with_no_cat');
					}
				}}
				onLongPress={() => {
					// collapsing 'feeds without category' list when edit mode is active
					set_hideCat(true)
					props.longPressHandler('feeds_with_no_cat')
				}}
				background={TouchableNativeFeedback.Ripple(appTheme.BORDER, false)}
			>
				<HeaderWrapper style={{
					backgroundColor: props.editList.includes('feeds_with_no_cat')
					? appTheme.SEC_BRAND
					: appTheme.MAIN_BG,
				}}>
					{
						!hideCat && props.editList.length <= 0 ?
							<Icon name='minus' size={21} color={appTheme.MAIN_TEXT}/>
						: 
							<Icon name='plus' size={21} color={appTheme.MAIN_TEXT}/>
					}

					<Header>
						Feeds without category
					</Header>
				</HeaderWrapper>
			</TouchableNativeFeedback>
		)
	}

	
	useEffect(() => {
		set_rssObj([]);
		
		const fetchRSS = async () => {
			// hacky way to update FlatList data state only when data changes in AsyncStorage
			// here we fetch every RSS feed in storage
			for(let i=0; i<feedsList.length; i++){
				fetch(feedsList[i].href)
				.then(response => response.text())
				.then(responseData => rssParser.parse(responseData))
				.then((rss) => {
					// max 16 articles per one RSS feed
					// saving every article from RSS feed response to rssObj state
					for(let j=0; j<=16; j++) {
						const RSS = rss.items[j];

						// converting full date from a RSS to: YEAR-MONTH-DAY
						let re = /[0-9]{2}:/;
						let date = RSS.published.split('T')[0];
						re = /[0-9]{2}\ [a-zA-Z]{3}\ [0-9]{4}/;
						date = date.match(re) !== null ? date.match(re)[0] : date;

						// default RSS object to save in a state
						const rssToSave = {
							title: RSS.title,
							date_published: date,
							url: RSS.links[0].url,
							publisher_name: feedsList[i].name,
							categories: RSS.categories[0].name,
						};

						// saving article to state
						set_rssObj(rssObj => [...rssObj, rssToSave]);
					}
				})
				.catch(err => console.log(err))
			}
		}; fetchRSS();
	}, [feedsList])


	// start of styled-components
	const HeaderWrapper = styled.View`
		padding-horizontal: 12px
		flex-direction: row;
		align-items: center;
		padding-vertical: 4px;
	`;

	const Header = styled.Text`
		font-size: 21px;
		font-family: Muli-SemiBold;
		margin-left: 4px;
		color: ${appTheme.MAIN_TEXT};
	`;
	// end of styled-components


	return (
		<View style={{
			flex: 1,
			backgroundColor: appTheme.MAIN_BG
		}}>
			{
				rssObj.length > 0 && !hideCat && props.editList.length <= 0 ?
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
								restartEdit={props.restartEdit}
							/> 
						}
						ListHeaderComponent = { ReadCardHeader }
						ItemSeparatorComponent = { ReadCardSep }
						ListFooterComponent = {() => 
							<View/>
						}
						ListFooterComponentStyle = {{
							paddingBottom: 12
						}}
					/>
				: <ReadCardHeader />
			}
		</View>
	);
	
}; export default withTheme(NoCategoryCard);