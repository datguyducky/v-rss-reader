import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as rssParser from 'react-native-rss-parser';
import { Input, NavBtn } from '../components';
import styled, { withTheme } from 'styled-components';


const NewFeed = (props) => {
	const { navigate } = props.navigation;
	const [feedName, set_feedName] = useState('');
	const [feedHref, set_feedHref] = useState('');
	const [feedList, set_feedList] = useState([]);
	const [feedNameError, set_feedNameError] = useState('');
	const [feedHrefError, set_feedHrefError] = useState('');
	const appTheme = props.theme;


	React.useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<NavBtn 
					onPress={saveFeed}
					iconName='check'
					iconSize={24}
				/>
			)
		})
	})


	useEffect(() => {
		// here we're getting all feeds that are stored in AsyncStorage without any category
		// and then we store them in state, for a later use
		const getSavedFeeds = async () => {
			let result = await AsyncStorage.getItem('user_nocatfeeds');
			result = JSON.parse(result);
	
			if(result !== null) {
				set_feedList(result);
			}
		}

		getSavedFeeds();
	}, [])


	const saveFeed = async () => {
		// checking if feed name and href were typed by user
		if(feedName.length <= 0 || feedHref.length <= 0) {
			if(feedName.length <= 0) {
				set_feedNameError('Feed name cannot be empty.');
			} else {
				// resetting error for feed name
				set_feedNameError('');
			}

			if(feedHref.length <= 0) {
				set_feedHrefError('Feed href cannot be empty.');
			} else {
				// resetting eror for feed href
				set_feedHrefError('');
			}
			
			return null;

		} else {
			// resetting errors for feed name and also href
			set_feedNameError('');
			set_feedHrefError('');
		}


		if(feedName.length > 128) {
			set_feedNameError('Sorry, but feed name cannot be longer than 128 characters.')
			set_feedName('');
			
		} else {
			set_feedNameError('')
		}


		// default feed object which is saved in AsyncStorage
		const feedToSend = {
			name: feedName,
			href: feedHref,
			id: 0
		}

		// adding http:// at the begining of a feed href if user forgot to do it himself
		const HREF_CHECK  = new RegExp("^(http|https)://", "i");
		if(HREF_CHECK.test(feedToSend.href) === false) {
			feedToSend.href = 'http://' + feedToSend.href;
		}

		fetch(feedToSend.href)
			.then((response) => response.text())
			.then((responseData) => rssParser.parse(responseData))
			.then((rss) => {
				// checking if feed href provided by user is a working RSS link
				if(!rss.title) {
					set_feedHrefError('Please check if the RSS link you provided is correct.');
					return null;

				} else {
					// check if we are saving this feed to a category or without one
					if(props.route.params?.withCategory) {
						saveWithCategory(feedToSend);
					} 

					else if(props.route.params?.toEdit) {
						saveWithEdit(feedToSend);
					}
					
					else {
						saveWithoutCategory(feedToSend);
					}
				}
			})

			.catch(err => {
				set_feedHrefError('Please check if the RSS link you provided is correct.');
				console.log(err);
				return null;
			});
	}


	const saveWithoutCategory = async (feedToSend) => {
		// feeds id's are separate for feeds with category and without one
		if(feedList.length > 0) {
			// setting new feed ID to an ID of last element in an array + 1
			// we're doing it so IDs won't get repeated when feeds are later deleted from an array of feeds
			feedToSend.id = feedList[feedList.length - 1].id + 1;
		}

		// DUP_CHECK is equal to whole feed object if one already exists in feedList with the same name
		// otherwise it is undefined and we can proceed with saving category
		const DUP_CHECK = feedList.find(o => o.name === feedName);
		if(DUP_CHECK) {
			set_feedNameError('Sorry, feeds names cannot be repeated. Please choose another one.');
			return
		}
		
		// saving whole new feed object to AsyncStorage
		feedList.push(feedToSend);
		await AsyncStorage.setItem('user_nocatfeeds', JSON.stringify(feedList));
		// and navigating back to 'Home' screen
		navigate('Home');
	}


	const saveWithEdit = (feedToSend) => {
		const FEEDS_LIST = props.route.params.FEEDS_LIST;

		if(FEEDS_LIST.length > 0) {
			feedToSend.id = FEEDS_LIST[FEEDS_LIST.length - 1].id + 1;
		}
		
		// DUP_CHECK is equal to a whole feed object (if it already exists with the same name) in allFeeds
		// otherwise it is undefined and we can proceed with saving category
		const DUP_CHECK = FEEDS_LIST.find(o => o.name === feedName);
		if(DUP_CHECK) {
			set_feedNameError('Sorry, feeds names cannot be repeated. Please choose another one.');
			return
		}

		// passing props back to 'EditCategory' screen
		navigate('EditCat', {
			newFeed: feedToSend,
			CAT_NAME: props.route.params.CAT_NAME
		})
	}


	const saveWithCategory = (feedToSend) => {
		const feedsWithCat = props.route.params.feedsWithCat;

		// feeds id's are separate for feeds with category and without one
		if(feedsWithCat.length > 0) {
			// setting new feed ID to an ID of last element in an array + 1
			// we're doing it so IDs won't get repeated when this feed is later deleted from an array
			feedToSend.id = feedsWithCat[feedsWithCat.length - 1].id + 1;
		}

		// DUP_CHECK is equal to whole feed object (if it already exists with the same name) in feedsWithCat
		// otherwise it is undefined and we can proceed with saving category
		const DUP_CHECK = feedsWithCat.find(o => o.name === feedName);
		if(DUP_CHECK) {
			set_feedNameError('Sorry, feeds names cannot be repeated. Please choose another one.');
			return
		}

		// passing props back to 'NewCat' screen
		navigate('NewCat', {
			catFeed: feedToSend
		})
	}


	// start of styled-components
	const StyledNewFeed = styled.View`
		padding-top: 6px;
		background-color: ${appTheme.MAIN_BG};
		align-items: center;
	`;
	// end of styled-components

	
	return (
		<StyledNewFeed style={{flex: 1}}>
			<Input 
				inputLabel='Feed Name'
				onError={feedNameError}
				placeholderText='e.g. Basketball News'
				autoFocus={true}
				value={feedName}
				onChangeText={name => set_feedName(name)}
			/>

			<Input 
				inputLabel='Feed Link'
				onError={feedHrefError}
				placeholderText='e.g. reddit.com/r/Basketball/.rss'
				autoFocus={false}
				value={feedHref}
				onChangeText={href => set_feedHref(href)}
			/>
		</StyledNewFeed>
	);
}; export default withTheme(NewFeed);