import React, { useState, useEffect } from 'react';
import {
	View, 
	SectionList,
	StatusBar
} from 'react-native';
import { FakeInput, NavBtn, CustomText } from '../components';
import AsyncStorage from '@react-native-community/async-storage';
import { scrollHandler } from '../globals/Helpers';
import styled, { withTheme } from 'styled-components';


const EditCategory = (props) => {
	const { navigate } = props.navigation;
	const [toEdit, set_toEdit] = useState([]);
	const [loaded, set_loaded] = useState(false);
	const [catList, set_catList] = useState([]);
	const [refresh, set_refresh] = useState(false);
	const { feedsList } = props.route.params;
	const appTheme = props.theme;


	React.useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<NavBtn 
					onPress={saveChanges}
					iconName='check'
					iconSize={24}
				/>
			)
		})
	})


	const saveChanges = async () => {
		for(let i=0; i<toEdit.length; i++) {
			// deleting whole category if there aren't any feeds left in it
			const CAT_I = catList.findIndex(o => o.name === toEdit[i].catName);
			if(CAT_I >= 0) {
				if(catList[CAT_I].feeds.length <= 0) {
					catList.splice(CAT_I, 1);
				}
			}
		}

		// saving changes to AsyncStorage
		await AsyncStorage.setItem('user_categories', JSON.stringify(catList));
		await AsyncStorage.setItem('user_nocatfeeds', JSON.stringify(feedsList))
		navigate('Home');
	}


	useEffect(() => {
		// list of feeds that user selected to edit 
		// [CAT_NAME / FEED_NAME]
		const editList = props.route.params.editList;
		for(let i=0; i<editList.length; i++) {
			const STRING_SPLIT = editList[i].split(' / ');
			const INDEX = toEdit.findIndex(o => o.catName === STRING_SPLIT[0]);

			// check if category already exists in toEdit state
			// INDEX = index of category or -1 if not found
			if(INDEX >= 0) {
				// add another feed to category if exists already
				// check if this is a normal category. Feeds without category are saved
				// under a name: 'feeds_with_no_cat' and feeds names are saved to data at a first run
				if(STRING_SPLIT[0] !== 'feeds_with_no_cat') {
					toEdit[INDEX].data.push(STRING_SPLIT[1]);
				} 
				
			} else {
				// send initial object to toEdit state
				const firstSave = {
					catName: STRING_SPLIT[0], // category name
					data: [STRING_SPLIT[1]] // category feed name
				}

				if(STRING_SPLIT[0] === 'feeds_with_no_cat') {
					firstSave.data = feedsList.map(o => o.name);
				}

				toEdit.push(firstSave);
			}
		}

		set_loaded(true);
	}, [])


	// here, we're getting saved categories from AsyncStorage 
	// and storing them in state for a later use
	useEffect(() => {
		const getSavedCategories = async () => {
			let result = await AsyncStorage.getItem('user_categories');
			result = JSON.parse(result);
	
			if(result !== null) {
				set_catList(result);
			}
		}; getSavedCategories();
	}, [])


	useEffect(() => {
		// adding a new feed to the feeds list (for category and without cat state) that was created in a NewFeed screen
		if(props.route.params?.newFeed) {
			const { newFeed, CAT_NAME } = props.route.params;
			
			// index of the category that we added this feed to
			// used by SectionList
			const TO_EDIT_I = toEdit.findIndex(o => o.catName === CAT_NAME);
			toEdit[TO_EDIT_I].data.push(newFeed.name)
			
			if(CAT_NAME === 'feeds_with_no_cat') {
				// adding new feed to list of feeds without category
				// used by AsyncStorage
				feedsList.push(newFeed);

			} else {
				// index of the category to which we added this new feed
				// used by AsyncStorage
				const CAT_I = catList.findIndex(o => o.name === CAT_NAME);
				catList[CAT_I].feeds.push(newFeed);
			}

			// so the changes are now visible
			set_refresh(!refresh);
		}
	}, [props.route.params?.newFeed])


	useEffect(() => {
		if(props.route.params.deleted) {
			const { IS_CAT, FEED_NAME, CAT_I } = props.route.params;
			const CAT_NAME = IS_CAT ? catList[CAT_I].name : 'feeds_with_no_cat';

			// remove feed name that was just deleted by user from list of feeds that we edit
			// used by SectionList
			const CAT_DATA_I = toEdit.findIndex(o => o.catName === CAT_NAME);
			const FEED_DATA_I = toEdit[CAT_DATA_I].data.indexOf(FEED_NAME);
			toEdit[CAT_DATA_I].data.splice(FEED_DATA_I, 1);
	
			set_refresh(!refresh);
		}
	}, [props.route.params?.deleted, props.route.params?.FEED_NAME])


	useEffect(() => {
		if(props.route.params?.EDIT_OBJ) {
			const { EDIT_OBJ, FEED_I, CAT_I, firstName, IS_CAT } = props.route.params;

			// for feed with a category
			if(IS_CAT) {
				// edit selected feed with a new value that was passed from EditFeed screen
				// used by AssyncStorage
				catList[CAT_I].feeds[FEED_I] = EDIT_OBJ;
				
				// update feed name that we just edited
				// used by SectionList
				const CAT_DATA_I = toEdit.findIndex(o => o.catName === catList[CAT_I].name);
				const FEED_DATA_I = toEdit[CAT_DATA_I].data.indexOf(firstName);
				toEdit[CAT_DATA_I].data[FEED_DATA_I] = EDIT_OBJ.name;

			} else {
				// for feeds without a category
				// edit selected with a new value that was passed from EditFeed screen
				// used by AsyncStorage
				feedsList[FEED_I] = EDIT_OBJ;

				// update feed name that we just edited
				// used by SectionList
				const CAT_DATA_I = toEdit.findIndex(o => o.catName === 'feeds_with_no_cat');
				const FEED_DATA_I = toEdit[CAT_DATA_I].data.indexOf(firstName);
				toEdit[CAT_DATA_I].data[FEED_DATA_I] = EDIT_OBJ.name;
			}
			
			set_refresh(!refresh);
		}
	}, [props.route.params?.EDIT_OBJ])


	const CategoryHeader = (catName) => {
		const CAT_NAME = catName === 'feeds_with_no_cat' ? 'Feeds without category' : catName;
		
		return (
			<StyledCategoryHeader>
				{ 'Category: ' + CAT_NAME }
			</StyledCategoryHeader>
		)
	}


	const CategoryFooter = (CAT_NAME) => {
		// index of category to which we want add a new feed
		if(catList.length > 0) { var INDEX = catList.findIndex(o => o.name === CAT_NAME)};
		return (
			<FakeInput 
				onPress={() => navigate(
					'NewFeed',
					{
						toEdit: true,
						FEEDS_LIST: INDEX >= 0 ? catList[INDEX].feeds : feedsList,
						CAT_NAME: CAT_NAME
					}
				)}
				placeholderText='Click here to add a new feed'
				iconName='plus-circle'
				width='76%'
			/>
		)
	}


	const toEditFeed = (FEED_NAME, CAT_NAME) => {
		let FEED_I = 0;
		let CAT_I = 0;
		let EDIT_OBJ = {};
		let IS_CAT = true;

		if(CAT_NAME === 'feeds_with_no_cat') {
			// find an index of the feed we want to edit (without a category)
			FEED_I = feedsList.findIndex(o => o.name === FEED_NAME);
			EDIT_OBJ = feedsList[FEED_I];

			IS_CAT = false;

		} else {
			// find an index of a category in which this feed we want to edit exists in
			CAT_I = catList.findIndex(o => o.name === CAT_NAME);
			// index of the feed itself
			FEED_I = catList[CAT_I].feeds.findIndex(o => o.name === FEED_NAME);

			EDIT_OBJ = catList[CAT_I].feeds[FEED_I]
		}

		navigate(
			'EditFeed',
			{
				EDIT_OBJ: EDIT_OBJ, // feed obj
				FEEDS_LIST: IS_CAT ? catList[CAT_I].feeds : feedsList, // list of all feeds for this category
				CAT_I: CAT_I, // this category index
				FEED_I: FEED_I, // this feed index
				IS_CAT: IS_CAT // check if we're editing feed with or without a category
			}
		)
	}


	// start of styled-components
	const StyledCategoryHeader = styled.Text`
		font-family: Muli-SemiBold;
		color: ${appTheme.SEC_TEXT};
		font-size: 21px;
		padding-horizontal: 12px;
		padding-vertical: 4px;
		margin-bottom: 12px;
	`;
	// end of styled-components

	return (
		<>
			<StatusBar backgroundColor={appTheme.MAIN_BG}/>

			<View style={{paddingTop: 6, backgroundColor: appTheme.MAIN_BG, flex: 1}}>
				{
					loaded ?
						<SectionList
							sections={toEdit}
							keyExtractor={(item, i) => i.toString()}
							renderItem = {({item, section: {catName}}) => {
									return (
										<FakeInput
											placeholderText={'Feed: ' + item}
											iconName='edit-3'
											onPress={() => toEditFeed(item, catName)}
											width='76%'
										/>
									)	
							}}
							renderSectionHeader={({section: {catName}}) => CategoryHeader(catName)}
							renderSectionFooter={({section: {catName}}) => CategoryFooter(catName)}
							onScroll={(event) => scrollHandler(event, props)}
						/>
					: null
				}
			</View>
		</>
	);
}; export default withTheme(EditCategory);