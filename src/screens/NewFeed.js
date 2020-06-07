import React from 'react';
import { 
	StyleSheet, 
	View, 
	TextInput,
} from 'react-native';


const NewFeed = () => {
	return (
		<View style={styles.NewFeedWrapper}>
			<View style={{
				borderBottomWidth: 1, 
				borderBottomColor: '#CFD0D3',
				marginBottom: 12
			}}>
				<TextInput
					autoCapitalize='none'
					autoFocus={true}
					style={styles.NewFeed__input}
					placeholder='RSS feed name'
					placeholderTextColor='#9194A1'
				/>
			</View>

			<View style={{
				borderBottomWidth: 1, 
				borderBottomColor: '#CFD0D3', 
				marginBottom: 12
			}}>
				<TextInput
					autoCapitalize='none'
					style={styles.NewFeed__input}
					placeholder='RSS feed link'
					placeholderTextColor='#9194A1'
				/>
			</View>
		</View>
	);
	
}; export default NewFeed;


const styles = StyleSheet.create({
	NewFeed__input: {
		borderWidth: 0,
		width: 260,
		fontSize: 16,
		padding: 0
	},

	NewFeedWrapper: {
		paddingTop: 8,
		flex: 1, 
		backgroundColor: '#fff',
		alignItems: 'center', 
	},
});