import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	TouchableNativeFeedback,
	ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Input, FakeInput } from '../components';

import AsyncStorage from '@react-native-community/async-storage';


const NewCategory = (props) => {
	const { navigate } = props.navigation;
	const [catName, set_catName] = useState('');
	const [catError, set_catError] = useState('');
	const [catList, set_catList] = useState([]);
	const [catFeed, set_catFeed] = useState([]);
	const [refresh, set_refresh] = useState(false);

	
	React.useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				// welcome to React Native, where you need to use two <View/> components and 
				// style one of them with: 'overflow: hidden'
				// just to make bordeRadius work properly with TouchableNativeFeedback
				<View style={{padding: 8, borderRadius: 32, overflow: 'hidden'}}>
					<TouchableNativeFeedback 
						onPress={saveCategoryHandler}
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
		// here, we're getting saved categories from AsyncStorage 
		// and storing them in state for a later use
		const getSavedCategories = async () => {
			let result = await AsyncStorage.getItem('user_categories');
			result = JSON.parse(result);
	
			if(result !== null) {
				set_catList(result);
			}
		}; getSavedCategories();
	}, [])


	useEffect(() => {
		// updating catFeed state with new feed that was added in 'NewFeed' screen
		if(props.route.params?.catFeed) {
			set_catFeed(catFeed => [...catFeed, props.route.params.catFeed]);
		}
	}, [props.route.params?.catFeed])


	const saveCategoryHandler = async () => {
		if(catName.length <= 0) {
			set_catError('Category name must be at least 1 character long');
			return
		}

		if(catName.length > 32) {
			set_catError('Category name cannot be longer than 32 characters');
			set_catName('');
			return
		}

		// default category object that is stored in AsyncStorage
		let categoryToSend = {
			name: catName,
			id: 0,
			feeds: catFeed
		}

		// feeds id's are separate for feeds and for categories
		if(catList.length > 0) {
			categoryToSend.id = catList.length;
		}

		// DUP_CHECK is equal to whole category object if one already exists in catList with the same name
		// otherwise it is undefined and we can proceed with saving category
		const DUP_CHECK = catList.find(o => o.name === catName);
		if(DUP_CHECK) {
			set_catError('Sorry, categories names cannot be repeated. Please choose another one.');
			return
		}
		
		// saving/adding whole new category to AsyncStorage
		catList.push(categoryToSend);
		await AsyncStorage.setItem('user_categories', JSON.stringify(catList));
		navigate('Home');
	}


	const deleteFeedHandler = (name) => {
		// find index of clicked element in an array of feeds, then deleted it from there
		const INDEX = catFeed.findIndex(o => o.name === name);
		catFeed.splice(INDEX, 1);
		
		// 'refresh' screen, so deleted feed is not longer rendered
		set_refresh(!refresh);
	}

	console.log(catFeed);
	return (
	<ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
		<View style={styles.NewCatWrapper}>			
			<Input 
				inputLabel='Category Name'
				onError={catError}
				placeholderText='e.g. Sport News'
				autoFocus={true}
				value={catName}
				onChangeText={name => set_catName(name)}
			/>
				
			<View 
				style={{
					width: '76%',
					maxWidth: 320
				}}
			>
				<Text style={styles.fakeInput__label}>
					Category Feeds
				</Text>

				{
					catFeed.length > 0 ?
						catFeed.map((f) => {
							return (
								<FakeInput 
									key={f.id}
									onPress={() => deleteFeedHandler(f.name)}
									placeholderText={f.name}
									iconName='minus-circle'
									width='100%'
								/>
							)
						})
					: null
				}

				<FakeInput 
					onPress={() => navigate(
						'NewFeed',
						{
							withCategory: true,
							feedsWithCat: catFeed
						}
					)}
					placeholderText='Click here to add a new feed'
					iconName='plus-circle'
					width='100%'
				/>
			</View>
		</View>
	</ScrollView>
	);
	
}; export default NewCategory;


const styles = StyleSheet.create({
	NewCatWrapper: {
		paddingTop: 6,
		alignItems: 'center', 
	},

	fakeInput__label: {
		fontSize: 17,
		marginBottom: 4,
		fontFamily: 'Muli-SemiBold',
		color: '#2F3037'
	},
});