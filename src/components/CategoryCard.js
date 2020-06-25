import React from 'react';

import { 
	StyleSheet, 
	View, 
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


const CategoryCard = () => {
	return (
		<View style={styles.CardWrapper}>
			<Text>With Category</Text>
		</View>
	);
	
}; export default CategoryCard;


const styles = StyleSheet.create({
	CardWrapper: {
		backgroundColor: '#fff',
		paddingVertical: 6,
	}
});