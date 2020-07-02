import React from 'react';

import { 
	StyleSheet, 
	View, 
	Text,
	TouchableWithoutFeedback
} from 'react-native';


const ReadCard = (props) => {
	const { title, date_published, url, publisher_name, categories} = props;
	return (
		<TouchableWithoutFeedback onPress={() => props.restartEdit()}>
			<View style={styles.ReadWrapper} onStartShouldSetResponder={() => true}>
				<Text style={styles.ReadPubCat}>
					{ publisher_name + ' / ' + categories }
				</Text>
	
				<Text style={styles.ReadTitle}>
					{ title }
				</Text>
	
				<Text style={styles.ReadDate}>
					Published: { date_published }
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
	
}; export default ReadCard;


const styles = StyleSheet.create({
	ReadWrapper: {
		backgroundColor: '#fff',
		paddingVertical: 12,
		paddingLeft: 24,
		paddingRight: 12,
		minHeight: 50
	},

	ReadPubCat: {
		fontSize: 12,
		color: '#2F3037',
		fontFamily: 'OpenSans-Light'
	},

	ReadTitle: {
		fontSize: 16,
		color: '#050505',
		fontFamily: 'OpenSans-Regular'
	},

	ReadDate: {
		fontSize: 12,
		color: '#2F3037',
		textAlign: 'right',
		fontFamily: 'OpenSans-Light'
	}
});