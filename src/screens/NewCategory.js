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
			<View style={{ 
				marginBottom: 16,
				width: '76%',
				maxWidth: 320 
			}}>
				<Text style={styles.NewFeed__inputLabel}>
					Category Name
				</Text>
				<TextInput
					autoCapitalize='none'
					autoFocus={true}
					placeholder='e.g. Sport News'
					placeholderTextColor='#9194A1'
					onChangeText={name => set_catName(name)}
					value={catName}
					style={styles.NewCat__input}
					style={[
						styles.NewCat__input,
						{
							borderColor: catError.length > 0 ? '#D8000C' : '#9194A1'
						}
					]}
				/>

				<Text style={[
					styles.Category__error,
					{ 
						display: catError.length > 0 ? 'flex' : 'none' 
					}
				]}>
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
				style={{
					width: '76%',
					maxWidth: 320
				}}
			>
				<Text style={styles.NewFeed__inputLabel}>
					Category Feeds
				</Text>

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
					
				<View style={styles.NewFeed__fakeInput}>
					<Text style={styles.NewFeed_fakePlaceholder}> 
						Click here to add a new feed
					</Text>
		
					<Icon 
						name='plus-circle' 
						style={{
							marginLeft: 'auto', 
							marginRight: 2, 
							color: '#2F3037'
						}} 
						size={18}
					/>
				</View>
			</TouchableOpacity>
		</View>
	</ScrollView>
	);
	
}; export default NewCategory;


const styles = StyleSheet.create({
	NewCatWrapper: {
		paddingTop: 6,
		alignItems: 'center', 
	},

	NewCat__input: {
		borderWidth: 1,
		borderRadius: 4,
		fontSize: 16,
		paddingVertical: 4,
		paddingHorizontal: 8,
		fontFamily: 'OpenSans-Regular',
		backgroundColor: '#EFF0F5'
	},

	NewFeed__inputLabel: {
		fontSize: 17,
		marginBottom: 4,
		fontFamily: 'Muli-SemiBold',
		color: '#2F3037'
	},

	NewFeed__fakeInput: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 4,
		fontSize: 16,
		paddingVertical: 5,
		paddingHorizontal: 8,
		fontFamily: 'OpenSans-Regular',
		backgroundColor: '#EFF0F5',
		borderColor: '#9194A1'
	},

	NewFeed_fakePlaceholder: {
		fontSize: 16, 
		padding: 2, 
		color: '#9194A1'
	},

	Category__error: {
		color: '#D8000C',
		textAlign: 'center',
		marginTop: 4,
		maxWidth: 320,
		display: 'none'
	}
});