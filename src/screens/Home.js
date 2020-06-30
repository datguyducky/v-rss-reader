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
import CategoryCard from '../components/CategoryCard';
import NoCategoryCard from '../components/NoCategoryCard';
import { YellowBox } from 'react-native'


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
				elevation: SCROLL_Y === 0 ? 0 : 4
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


	// TODO: TouchableWithoutFeedback onPress brakes ScrollView a little bit
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
					<ScrollView onScroll={(event) => scrollHandler(event)}>
									{
										feedsList.length > 0 ?
											<NoCategoryCard feedsList={feedsList} longPressHandler={longPressHandler}/>
										: null
									}
			
									{
										catList.length > 0 ?
											<CategoryCard 
												catList={catList} 
												longPressHandler={longPressHandler}
												editActive={editActive}
												editList={editList}
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