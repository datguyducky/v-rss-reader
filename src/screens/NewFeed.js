import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import * as rssParser from 'react-native-rss-parser';

import { 
	StyleSheet, 
	View, 
	TextInput,
	TouchableNativeFeedback,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Input } from '../components';


const NewFeed = (props) => {
	const { navigate } = props.navigation;
	const [feedName, set_feedName] = useState('');
	const [feedHref, set_feedHref] = useState('');
	const [feedList, set_feedList] = useState([]);
	const [feedNameError, set_feedNameError] = useState('');
	const [feedHrefError, set_feedHrefError] = useState('');


	React.useLayoutEffect(() => {
		props.navigation.setOptions({
			// welcome to React Native, where you need to use two <View/> components and 
			// style one of them with: 'overflow: hidden'
			// just to make bordeRadius work properly with TouchableNativeFeedback
			headerRight: () => (
				<View style={{padding: 8, borderRadius: 32, overflow: 'hidden'}}>
					<TouchableNativeFeedback 
						onPress={saveFeedHandler}
						background={TouchableNativeFeedback.Ripple('#555', true)}
					>
							<View>
								<Icon name='check' size={24}/>
							</View>
					</TouchableNativeFeedback>
				</View>
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


	const saveFeedHandler = async () => {
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

					} else {
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


	const saveWithCategory = async (feedToSend) => {
		const feedsWithCat = props.route.params.feedsWithCat;

		// feeds id's are separate for feeds with category and without one
		if(feedsWithCat.length > 0) {
			// setting new feed ID to an ID of last element in an array + 1
			// we're doing it so IDs won't get repeated when this feed is later deleted from an array
			feedToSend.id = feedsWithCat[feedsWithCat.length - 1].id + 1;
		}

		// DUP_CHECK is equal to whole feed object if one already exists in feedsWithCat with the same name
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


	return (
		<View style={styles.NewFeedWrapper}>
			<Input 
				inputLabel='Feed Names'
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
		</View>
	);
	
}; export default NewFeed;


const styles = StyleSheet.create({
	NewFeed__input: {
		borderWidth: 1,
		borderRadius: 4,
		fontSize: 16,
		paddingVertical: 4,
		paddingHorizontal: 8,
		fontFamily: 'OpenSans-Regular',
		backgroundColor: '#EFF0F5'
	},

	NewFeed__inputLabel: {
		fontSize: 17,
		marginBottom: 4,
		fontFamily: 'Muli-SemiBold',
		color: '#2F3037'
	},

	NewFeedWrapper: {
		paddingTop: 6,
		flex: 1, 
		backgroundColor: '#fff',
		alignItems: 'center', 
	},

	Feed__error: {
		color: '#D8000C',
		textAlign: 'center',
		marginTop: 4,
		width: 260
	}
});