import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	TextInput,
	TouchableNativeFeedback,
	TouchableOpacity
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
	}, [catList])


	useEffect(() => {
		// updating catFeed state with new feed that was added in 'NewFeed' screen
		if(props.route.params?.catFeed) {
			set_catFeed(catFeed => [...catFeed, props.route.params.catFeed]);
		}
	}, [props.route.params?.catFeed])


	const saveCategoryHandler = () => {
		if(catName.length <= 0) {
			set_catError('Category name must be at least 1 character long');
			return
		}

		if(catName.length > 32) {
			set_catError('Category name cannot be longer than 32 characters');
			set_catName('');
			return
		}

		console.log(catFeed);
		// TODO: finish saving category with feeds to AsyncStorage
		//navigate('Home')
	}


	return (
		<View style={styles.NewCatWrapper}>
			<View style={{ marginBottom: 12 }}>
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

				<Text style={styles.Category__error}>
					{catError}
				</Text>
			</View>

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
		</View>
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
		flex: 1, 
		backgroundColor: '#fff',
		alignItems: 'center', 
	},

	Category__error: {
		color: '#D8000C',
		textAlign: 'center',
		marginTop: 4,
		width: 260
	}
});