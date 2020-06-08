import React, { useState } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	TextInput,
	TouchableNativeFeedback,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


const NewCategory = (props) => {
	const { navigate } = props.navigation;
	const [catName, set_catName] = useState('');

	
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


	const saveCategoryHandler = () => {
		console.log(catName);
	}


	return (
		<View style={styles.NewCatWrapper}>
			<View style={{
				borderBottomWidth: 1, 
				borderBottomColor: '#CFD0D3',
				marginBottom: 12
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

			<TouchableOpacity activeOpacity={0.7} onPress={() => navigate('NewFeed')}>
				<View style={styles.NewFeed__fake}>
					<Text style={{fontSize: 16, padding: 2, color: '#9194A1'}}> 
						Add RSS Feed
					</Text>

					<Icon name='plus-circle' style={{marginLeft: 'auto', marginRight: 2}} size={18}/>
				</View>
			</TouchableOpacity>
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
});