import React, { useState, useEffect } from 'react';
import * as rssParser from 'react-native-rss-parser';

import { 
	StyleSheet, 
	View, 
} from 'react-native';
import { Input, NavBtn } from '../components';


const EditFeed = (props) => {
	const { navigate } = props.navigation;
	const [feedName, set_feedName] = useState('');
	const [feedHref, set_feedHref] = useState('');
	const [firstFeedName, set_firstFeedName] = useState('');
	const [feedNameError, set_feedNameError] = useState('');
	const [feedHrefError, set_feedHrefError] = useState('');
	const { EDIT_OBJ, FEEDS_LIST, CAT_I, FEED_I, IS_CAT } = props.route.params;


	React.useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<View style={{flexDirection: 'row'}}>
					<NavBtn
						onPress={deleteFeed}
						iconName='trash'
						iconSize={21}
					/>
					<NavBtn 
						onPress={saveEditedFeed}
						iconName='check'
						iconSize={24}
					/>
				</View>
			)
		})
	})


	useEffect(() => {
		set_feedName(EDIT_OBJ.name);
		set_firstFeedName(EDIT_OBJ.name);
		set_feedHref(EDIT_OBJ.href);
	}, [props.route.params?.EDIT_OBJ])


	const saveEditedFeed = async () => {
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
					editFeed(feedToSend);
				}
			})

			.catch(err => {
				set_feedHrefError('Please check if the RSS link you provided is correct.');
				console.log(err);
				return null;
			});
	}


	const deleteFeed = () => {
		FEEDS_LIST.splice(FEED_I, 1);
		navigate('EditCat', { 
			deleted: true,
			FEED_NAME: feedName,
			IS_CAT: IS_CAT,
			CAT_I: CAT_I
		});
	}


	const editFeed = (feedToSend) => {
		// setting edited feed ID to the one that was used by it before
		feedToSend.id = FEEDS_LIST[FEED_I].id;
		
		// DUP_CHECK is equal to an index of feed object that have the same name as the one that user just tried to submit
		// show error only when DUP_CHECK returns index that is different from the index of a feed that we're currently editing
		// otherwise DUP_CHECK is equal to -1
		const DUP_CHECK = FEEDS_LIST.findIndex(o => o.name === feedName);
		if(DUP_CHECK >= 0 && DUP_CHECK !== FEED_I) {
			set_feedNameError('Sorry, feeds names cannot be repeated. Please choose another one.');
			return
		}

		// passing props back to the 'EditCategory' screen
		navigate('EditCat', {
			EDIT_OBJ: feedToSend,
			FEED_I: FEED_I,
			CAT_I: CAT_I,
			IS_CAT: IS_CAT,
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