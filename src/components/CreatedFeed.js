import React from 'react';

import { 
	StyleSheet, 
	View, 
	Text,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


const CreatedFeed = (props) => {
	// TODO: add handler onPress to delete this feed from catFeed state
	return (
		<TouchableOpacity 
			activeOpacity={0.7} 
			onPress={() => console.log('delete here')}
		>
			<View style={styles.NewFeed__fake}>
				<Text style={{fontSize: 16, padding: 2, color: '#050505'}}> 
					{props.name}
				</Text>

				<Icon name='minus-circle' style={{marginLeft: 'auto', marginRight: 2}} size={18}/>
			</View>
		</TouchableOpacity>
	);
	
}; export default CreatedFeed;


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
		marginBottom: 10
	},
});