import React from 'react';

import { 
	StyleSheet,
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
			style={styles.NewFeed__fakeInput}
		>
			<Text style={styles.NewFeed_fakePlaceholder}> 
				{ props.name }
			</Text>

			<Icon 
				name='minus-circle' 
				style={{
					marginLeft: 'auto',
					marginRight: 2,
					color: '#2F3037'
				}} 
				size={18}
			/>
		</TouchableOpacity>
	);
	
}; export default CreatedFeed;


const styles = StyleSheet.create({
	NewFeed__fakeInput: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 4,
		fontSize: 16,
		paddingVertical: 4,
		paddingHorizontal: 8,
		fontFamily: 'OpenSans-Regular',
		backgroundColor: '#EFF0F5',
		borderColor: '#9194A1',
		marginBottom: 16
	},

	NewFeed_fakePlaceholder: {
		fontSize: 16, 
		padding: 2, 
		color: '#2F3037'
	},
});