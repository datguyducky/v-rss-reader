import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	TextInput,
	TouchableNativeFeedback,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CreatedFeed from '../components/CreatedFeed';

import AsyncStorage from '@react-native-community/async-storage';


const NewCategory = (props) => {
	const { navigate } = props.navigation;
	const [catName, set_catName] = useState('');
	const [catError, set_catError] = useState('');
	const [catList, set_catList] = useState([]);
	const [catFeed, set_catFeed] = useState([]);

	
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


	return (
	<ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
		<View style={styles.NewCatWrapper}>
			<View style={{ marginBottom: 10 }}>
				<View style={{
					borderBottomWidth: 1, 
					borderBottomColor: '#CFD0D3',
				}}>
					<TextInput
						autoCapitalize='none'
						autoFocus={true}
						style={styles.NewCat__input}
						placeholder='Category name'
						placeholderTextColor='#9194A1'
						onChangeText={name => set_catName(name)}
						value={catName}
					/>
				</View>

				<Text style={[
					styles.Category__error,
					{ display: catError.length >= 1 ? 'flex' : 'none' }
				]}>
					{catError}
				</Text>
			</View>

			{
				catFeed.length > 0 ?
					catFeed.map((f) => {
						return (
							<CreatedFeed
								name={f.name}
								key={f.id}
							/>
						)
					})
				: null
			}
				
			<TouchableOpacity 
				activeOpacity={0.7} 
				onPress={() => navigate(
					'NewFeed',
					{
						withCategory: true,
						feedsWithCat: catFeed
					}
				)}
			>
				<View style={styles.NewFeed__fake}>
					<Text style={{fontSize: 16, padding: 2, color: '#9194A1'}}> 
						Add RSS Feed
					</Text>
	
					<Icon name='plus-circle' style={{marginLeft: 'auto', marginRight: 2}} size={18}/>
				</View>
			</TouchableOpacity>
		</View>
	</ScrollView>
	);
	
}; export default NewCategory;


const styles = StyleSheet.create({
	NewCat__input: {
		borderWidth: 0,
		width: 260,
		fontSize: 16,
		padding: 0
	},

	NewFeed__fake: {
		borderBottomWidth: 1, 
		borderBottomColor: '#CFD0D3', 
		width: 260,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},

	NewCatWrapper: {
		paddingTop: 8,
		alignItems: 'center', 
	},

	Category__error: {
		color: '#D8000C',
		textAlign: 'center',
		marginTop: 4,
		width: 260,
		display: 'none'
	}
});