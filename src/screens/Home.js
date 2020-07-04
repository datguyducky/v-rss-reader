import React, { useEffect, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableNativeFeedback,
	ScrollView,
	StatusBar,
	TouchableWithoutFeedback,
	BackHandler
} from 'react-native';
import { 
	CategoryCard, 
	NoCategoryCard, 
	NavBtn, 
	NavMoreBtn,
	CustomText
} from '../components';
import AsyncStorage from '@react-native-community/async-storage';
import { YellowBox } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


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
	const [offsetY, set_offsetY] = useState(0);

	const mainScroll = useRef(null);

	
	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				// custom psychical back button (for Android) handler
				// only used when edit mode is active
				if (editActive) {
					restartEdit();
					return true;

				} else {
					return false;
				}
			};
	
			BackHandler.addEventListener('hardwareBackPress', onBackPress);
	
			return () =>
				BackHandler.removeEventListener('hardwareBackPress', onBackPress);
		}, [editActive, restartEdit])
	);


	React.useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				editActive ? 
					<View style={{flexDirection: 'row'}}>
						{
							// display icon to delete feed from a category, when is edit mode there's 
							// selected only one item and it is not a NoCategoryCard component
							editList.length === 1 && !editList.includes('feeds_with_no_cat') ?
								<NavBtn
									onPress={deleteFeedFromCat}
									iconName='trash'
									iconSize={21}
								/>
							: null
						}

						<NavBtn
							onPress={editFeeds}
							iconName='edit-3'
							iconSize={21}
						/>
					</View>
				: 
					<NavMoreBtn 
						actions={[
							'New category', 
							'About',
							'Settings'
						]} 
						onPress={popupRoutes}
						iconSize={24}
					/>
			),

			headerLeft: () => (
				editActive ? 
					<NavBtn
						onPress={restartEdit}
						iconName='arrow-left'
						iconSize={24}
					/>
				: null
			),
			
			title: editActive ? 'Edit' : 'V - RSS Reader',
			headerStyle: {
				// fix to set header backgroundColor to proper one when edit mode is active
				// IMPORTANT, without this header background color is set to '#fff' when scrolling with edit mode enabled
				backgroundColor: editActive ? '#0089BC' : '#fff',
				elevation: offsetY >= 8 ? 4 : 0
			}	
		})
	})


	const editFeeds = () => {
		// navigate to EditCat screen, with a list of categories that user selected to edit
		// and with an array of feeds objects without a category
		navigate(
			'EditCat',
			{ 
				editList: editList, 
				feedsList: feedsList // feeds without category
			}
		)
	}


	const deleteFeedFromCat = async () => {
		// selected feed category and name
		const STRING_SPLIT = editList[0].split(' / ');
		// index of selected feed in an array of all categories created by user
		const CAT_I = catList.findIndex(o => o.name === STRING_SPLIT[0]);
		// index of selected feed in that category
		const FEED_I = catList[CAT_I].feeds.findIndex(o => o.name === STRING_SPLIT[1]);
		// delete selected feed from that category
		catList[CAT_I].feeds.splice(FEED_I, 1);

		// delete whole category if there isn't any feeds left in it
		if(catList[CAT_I].feeds.length <= 0) {
			catList.splice(CAT_I, 1);
		}
		
		// saving edited categories to AsyncStorage
		await AsyncStorage.setItem('user_categories', JSON.stringify(catList));
		// TODO: refresh/reload Home screen when we're done with it.
	}


	const popupRoutes = (eventName, index) => {
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
					backgroundColor: '#0089BC'
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


	const handleScroll = (event) => {
		set_offsetY(event.nativeEvent.contentOffset.y);
	}


	return (
		<>
			<StatusBar backgroundColor={editActive ? '#0089BC' : '#fff'} />
			
			<TouchableWithoutFeedback onPress={() => restartEdit()}>
				<View 
					style={[
						{ 
							backgroundColor: feedsList.length > 0 || catList.length > 0
							? '#fff'
							: '#dee2ec',
							alignItems: feedsList.length > 0 || catList.length > 0
							? 'stretch'
							: 'center',
							justifyContent: feedsList.length > 0 || catList.length > 0
							? 'flex-start'
							: 'center'
						},
						styles.HomeWrapper
					]}
				>

					{
						feedsList.length > 0 || catList.length > 0 ?
							<ScrollView 
								onScroll={ (event) => handleScroll(event) }
								onStartShouldSetResponder={() => true}
								ref={mainScroll} 
								scrollEventThrottle={8}
							>
								{
									feedsList.length > 0 ?
										<NoCategoryCard 
											feedsList={feedsList} 
											longPressHandler={longPressHandler}
											restartEdit={restartEdit}
											editActive={editActive}
											editList={editList}
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
						: 
							<CustomText style={styles.NoFeeds}>
								Click + button to add your first RSS feed.
							</CustomText>
					}

					<View style={styles.Btn__wrapper}>
						
							{
								// display scroll to top button only when y offset is at least 420
								offsetY >= 420 ?
								<View style={styles.ToTop__btn}>
									<TouchableNativeFeedback 
										onPress={() => {
											set_offsetY(0);
											mainScroll.current.scrollTo({x: 0, y:0, animated: true})
										}}
										background={TouchableNativeFeedback.Ripple('#555', true)}
										
									>
										<View>
											<Icon name="arrow-up" size={24} color="#fff"/>
										</View>
									</TouchableNativeFeedback>
								</View>
								: null
							}

						<View style={styles.AddFeed__btn} >
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
				</View>
			</TouchableWithoutFeedback>
		</>
	);
	
}; export default Home;


const styles = StyleSheet.create({
	HomeWrapper: { 
		flex: 1
	},

	NoFeeds: {
		color: '#9194A1', 
		fontSize: 16,
		textAlign: 'center'
	},

	Btn__wrapper: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		alignItems: 'center'
	},

	ToTop__btn: {
		width: 42,
		height: 42,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 42,
		overflow: 'hidden',
		backgroundColor: '#0089BC',
		elevation: 5
	},

	AddFeed__btn: {
		width: 56,
		height: 56,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 56,
		overflow: 'hidden',
		backgroundColor: '#0089BC',
		elevation: 5,
		marginBottom: 16,
		marginHorizontal: 16,
		marginTop: 12
	},
});