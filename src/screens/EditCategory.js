import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text,
	SectionList
} from 'react-native';
import { FakeInput, NavBtn } from '../components';
import AsyncStorage from '@react-native-community/async-storage';


const EditCategory = (props) => {
	const { navigate } = props.navigation;
	const [toEdit, set_toEdit] = useState([]);
	const [loaded, set_loaded] = useState(false);
	const [catList, set_catList] = useState([]);
	const [refresh, set_refresh] = useState(false);


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
		// saving changes to AsyncStorage
		await AsyncStorage.setItem('user_categories', JSON.stringify(catList));
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
				toEdit[INDEX].data.push(STRING_SPLIT[1]);
			} else {
				// if not, then send initial object to toEdit state
				const firstSave = {
					catName: STRING_SPLIT[0], // category name
					data: [STRING_SPLIT[1]] // category feed name
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
		// updating newFeeds state with a new feed that was added in 'NewFeed' screen
		if(props.route.params?.newFeed) {
			const newFeed = props.route.params.newFeed;
			const CAT_NAME = props.route.params.catName;

			// index of the category to which we want to add this new feed
			// to a state with all the categories saved in AsyncStorage
			const LIST_INDEX = catList.findIndex(o => o.name === CAT_NAME);
			if(LIST_INDEX >= 0) {
				catList[LIST_INDEX].feeds.push(newFeed);
			}

			// index of the category to which we want to add this new feed
			// to a state with feeds names that we're currently editing
			const DATA_INDEX = toEdit.findIndex(o => o.catName === CAT_NAME);
			if(DATA_INDEX >= 0) {
				toEdit[DATA_INDEX].data.push(newFeed.name);
			}


			// set refresh state to different one, so the EditCategory screen gets refreshed
			set_refresh(!refresh);
		}
	}, [props.route.params?.newFeed])


	useEffect(() => {
		if(props.route.params?.editObj) {
			const editObj = props.route.params.editObj;
			const EDIT_INDEX = props.route.params.editIndex;
			const CAT_INDEX = props.route.params.catIndex;
			const firstName = props.route.params.firstName; // feed name before edit
			
			// update selected feed object that's stored inside an array of all feeds for this, selected category,
			// with new value
			catList[CAT_INDEX].feeds[EDIT_INDEX] = editObj;

			// update name of feed that we edited, with the new one
			// used by SectionList
			const CAT_DATA_INDEX = toEdit.findIndex(o => o.catName === catList[CAT_INDEX].name);
			const FEED_DATA_INDEX = toEdit[CAT_DATA_INDEX].data.indexOf(firstName);
			toEdit[CAT_DATA_INDEX].data[FEED_DATA_INDEX] = editObj.name;


			set_refresh(!refresh);
		}
	}, [props.route.params?.editObj])


	const CategoryHeader = (catName) => {
		return (
			<Text style={styles.CatHeader}>
				{'Category: ' + catName}
			</Text>
		)
	}


	const CategoryFooter = (catName) => {
		// index of category to which we want add a new feed
		if(catList.length > 0) { var INDEX = catList.findIndex(o => o.name === catName)};
		return (
			<FakeInput 
				onPress={() => navigate(
					'NewFeed',
					{
						toEdit: true,
						allFeeds: catList[INDEX] || [],
						catName: catName
					}
				)}
				placeholderText='Click here to add a new feed'
				iconName='plus-circle'
				width='76%'
			/>
		)
	}


	const toEditFeed = (feedName, catName) => {
		// index of the category that we want to edit feed in
		const CAT_INDEX = catList.findIndex(o => o.name === catName);
		// index of feed in an array of feeds for this category
		const FEED_INDEX = catList[CAT_INDEX].feeds.findIndex(o => o.name === feedName);

		// whole feed object (href, name and id)
		const toEditObj = catList[CAT_INDEX].feeds[FEED_INDEX];

		navigate(
			'EditFeed',
			{
				editObj: toEditObj,
				allFeeds: catList[CAT_INDEX] || [],
				catIndex: CAT_INDEX,
				editIndex: FEED_INDEX
			}
		)
	}


	return (
		<View style={{paddingTop: 6, backgroundColor: '#fff', flex: 1}}>
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
					/>
				: null
			}
		</View>
	);
}; export default EditCategory;


const styles = StyleSheet.create({
	CatHeader: {
		fontFamily: 'Muli-SemiBold',
		color: '#2F3037',
		fontSize: 21,
		paddingHorizontal: 12,
		paddingVertical: 4,
		marginBottom: 12
	}
});