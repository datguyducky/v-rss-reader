import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableNativeFeedback,
	ScrollView,
	SafeAreaView
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


	return (
		<>
			<View style={styles.HomeWrapper}>
				<ScrollView>
						{
							feedsList.length > 0 ?
								<NoCategoryCard feedsList={feedsList}/>
							: null
						}

						{
							catList.length > 0 ?
								<CategoryCard catList={catList}/>
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