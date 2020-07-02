import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import * as rssParser from 'react-native-rss-parser';

import { 
	StyleSheet, 
	View, 
	TouchableNativeFeedback,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Input } from '../components';


const EditFeed = (props) => {
	const { navigate } = props.navigation;
	const [feedName, set_feedName] = useState('');
	const [feedHref, set_feedHref] = useState('');
	const [firstFeedName, set_firstFeedName] = useState('');
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
		const editObj = props.route.params.editObj;
		
		set_feedName(editObj.name);
		set_firstFeedName(editObj.name);
		set_feedHref(editObj.href);
	}, [props.route.params?.editObj])


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
					saveWithEdit(feedToSend);
				}
			})

			.catch(err => {
				set_feedHrefError('Please check if the RSS link you provided is correct.');
				console.log(err);
				return null;
			});
	}


	const saveWithEdit = (feedToSend) => {
		const allFeeds = props.route.params.allFeeds.feeds;
		const editIndex = props.route.params.editIndex;

		// setting edited feed ID to the one that was used by him before
		feedToSend.id = allFeeds[editIndex].id;
		
		// DUP_CHECK is equal to an index of feed object that have the same name as the one that user just tried to submit
		// show error only when DUP_CHECK returns index that is different from the index of a feed that we're currently editing
		// otherwise DUP_CHECK is equal to -1
		const DUP_CHECK = allFeeds.findIndex(o => o.name === feedName);
		if(DUP_CHECK >= 0 && DUP_CHECK !== editIndex) {
			set_feedNameError('Sorry, feeds names cannot be repeated. Please choose another one.');
			return
		}

		// passing props back to the 'EditCategory' screen
		navigate('EditCat', {
			editObj: feedToSend,
			editIndex: props.route.params.editIndex,
			catIndex: props.route.params.catIndex,
			firstName: firstFeedName
		})
	}



	return (
		<View style={styles.EditFeed__wrapper}>
			<Input 
				inputLabel='Feed Name'
				onError={feedNameError}
				placeholderText='e.g. Basketball News'
				autoFocus={false}
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
}; export default EditFeed;


const styles = StyleSheet.create({
	EditFeed__wrapper: {
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