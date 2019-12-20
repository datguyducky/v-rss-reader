import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	newsCard: {
		backgroundColor: '#fff',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'rgba(156, 156, 156, 0.50)',
		elevation: 4,
		width: '100%',	
	},

	newsCardPublisher: {
		fontSize: 12, 
		fontWeight: 'bold', 
		color: '#0080B0'
	},

	newsCardPublished: {
		opacity: 0.7, 
		fontSize: 11, 
		textAlign: 'right', 
		marginTop: 12
	}
})