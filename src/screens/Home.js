import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableNativeFeedback,
	ScrollView,
	StatusBar,
	TouchableWithoutFeedback
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CategoryCard, NoCategoryCard } from '../components';
import { CancelBtn, RenameBtn, DeleteBtn, SaveBtn, MoreBtn } from '../components/NavBtns';
import { YellowBox } from 'react-native';


YellowBox.ignoreWarnings([
	// TODO: remove when fixed
	// check https://github.com/GeekyAnts/NativeBase/issues/2947 
	// for explanation of this issue...
	'VirtualizedLists should never be nested'
])


const Home = (props) => {
	const { navigate } = props.navigation;
	const [catList, set_catList] = useState([]);
	const [feedsList, set_feedsList] = useState([]);
	const [editActive, set_editActive] = useState(false);
	const [editList, set_editList] = useState([]);
	const [refresh, set_refresh] = useState(false);


	React.useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				editActive ? 
					<View style={{flexDirection: 'row'}}>
						<RenameBtn
							RenameBtnHandler={RenameBtnHandler}
						/>
						<DeleteBtn
							DeleteBtnHandler={DeleteBtnHandler}
						/>
						<SaveBtn
							SaveBtnHandler={CancelBtnHandler}
						/>
					</View>
				: 
					<MoreBtn 
						actions={[
							'New category', 
							'About',
							'Settings'
						]} 
						MoreBtnHandler={MoreBtnHandler}
					/>
			),

			headerLeft: () => (
				editActive ? 
					<CancelBtn
						CancelBtnHandler={restartEdit}
					/>
				: null
			),
			
			title: editActive ? 'Edit' : 'V - RSS Reader'
		})
	})


	const CancelBtnHandler = () => {
		console.log('works...');
	}


	const RenameBtnHandler = () => {
		// navigate to EditCat screen, with list of categories that user selected to edit
		navigate(
			'EditCat',
			{ editList: editList }
		)
	}


	const DeleteBtnHandler = async () => {
		for(let i=0; i<editList.length; i++) {
			// getting name of selected category to search for, from editList
			const STRING_SPLIT = editList[i].split(' / ');
			// find an index of that category in an array of all user categories
			const CAT_INDEX = catList.findIndex(o => o.name === STRING_SPLIT[0]);
			if(CAT_INDEX >= 0) {
				// find index of that category feed 
				const FEED_INDEX = catList[CAT_INDEX].feeds.findIndex(o => o.name === STRING_SPLIT[1]);
				if(FEED_INDEX >= 0) {
					// delete feed from category
					catList[CAT_INDEX].feeds.splice(FEED_INDEX, 1)

					// if there are no feeds left in the category, then delete the whole category
					if(catList[CAT_INDEX].feeds.length <= 0) {
						catList.splice(CAT_INDEX, 1);
					}
				}	
			}
		}

		// saving edited categories to AsyncStorage
		await AsyncStorage.setItem('user_categories', JSON.stringify(catList));
		// TODO: refresh/reload Home screen when we're done with it.
	}


	const MoreBtnHandler = (eventName, index) => {
		// return when user clicks outside of popup menu
		if(eventName !== 'itemSelected') return;

		// new category
		if(index === 0) navigate('NewCat');
		// about
		if(index === 1) navigate('About');
		// settings
		if(index === 2) navigate('Settings');
	}


	useEffect(() => {
		const loadFeedsWithCat = async () => {
			let result = await AsyncStorage.getItem('user_categories');
			result = JSON.parse(result);

			if(result) {
				set_catList(result);
			}
		}; loadFeedsWithCat();


		const loadFeedsWithoutCat = async () => {
			let result = await AsyncStorage.getItem('user_nocatfeeds');
			result = JSON.parse(result);

			if(result) {
				set_feedsList(result);
			}
		}; loadFeedsWithoutCat();
	}, [])


	const scrollHandler = (event) => {
		const SCROLL_Y = event.nativeEvent.contentOffset.y;
		props.navigation.setOptions({
			// hide elevation (shadow) when we're at the top of this screen
			// and show it, when we're not
			headerStyle: {
				elevation: SCROLL_Y <= 8 ? 0 : 4,
				// fix to set header backgroundColor to proper one, when edit mode is active
				// IMPORTANT, without this header background color is set to '#fff' when scrolling with edit mode enabled
				backgroundColor: editActive ? '#0080B0' : '#fff' 
			}	
		})
	}


	// enable edit mode by long pressing one of the categories names
	// enabled mode is showcased by changing background color of StatusBar, react navigation header
	// and category header.
	// We're storing names of categories that are currently in edit mode, so we can properly change background
	// colors of these SectionList headers that were clicked on
	const longPressHandler = (name) => {
		if(!editActive) {
			set_editActive(true);
			props.navigation.setOptions({
				headerStyle: {
					backgroundColor: '#0080B0'
				}
			});
		}
		
		const EDIT_INDEX = editList.indexOf(name);
		if(!editList.includes(name)) {
			editList.push(name);
			set_refresh(!refresh);

		} else {
			editList.splice(EDIT_INDEX, 1);
			set_refresh(!refresh);
		}
	}


	// if we click outside of the categories headers, then we call restartEdit to disable edit mode
	const restartEdit = () => {
		if(editActive) {
			set_editActive(false);
			props.navigation.setOptions({
				headerStyle: {
					backgroundColor: '#fff'
				}
			});
			set_editList([]);
		}
	}


	return (
		<>
			<StatusBar backgroundColor={editActive ? '#0080B0' : '#fff'} />
			
			<TouchableWithoutFeedback onPress={() => restartEdit()}>
				<View 
					style={[
						{ 
							backgroundColor: feedsList.length > 0 || catList.length > 0
							? '#fff'
							: '#dee2ec'
						},
						styles.HomeWrapper
					]}
				>
					<ScrollView 
						onScroll={(event) => scrollHandler(event)} 
						onStartShouldSetResponder={() => true} 
					>
						{
							feedsList.length > 0 ?
								<NoCategoryCard 
									feedsList={feedsList} 
									longPressHandler={longPressHandler}
									restartEdit={restartEdit}
								/>
							: null
						}
			
						{
							catList.length > 0 ?
								<CategoryCard 
									catList={catList} 
									longPressHandler={longPressHandler}
									editActive={editActive}
									editList={editList}
									restartEdit={restartEdit}
								/>
							: null
							}
					</ScrollView>

					{
						feedsList.length <= 0 && catList.length <= 0 ?
							<Text style={{color: "#9194A1"}}>
								Click + button to add your first RSS feed.
							</Text>
						: null
					}
			

					<View style={styles.AddFeed_btn} >
						<TouchableNativeFeedback 
							onPress={() => navigate('NewFeed') }
							background={TouchableNativeFeedback.Ripple('#555', true)}
						>
							<View>
								<Icon name="plus" size={36} color="#fff"/>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
	
}; export default Home;


const styles = StyleSheet.create({
	HomeWrapper: { 
		flex: 1, 
		//alignItems: 'center',
		//justifyContent: 'center' 
	},

	AddFeed_btn: {
		width: 56,
		height: 56,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 56,
		overflow: 'hidden',
		margin: 16,
		backgroundColor: '#0080B0',
		position: 'absolute',
		bottom: 0,
		right: 0,
		elevation: 5
	},
});