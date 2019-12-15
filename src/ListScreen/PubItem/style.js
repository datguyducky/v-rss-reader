import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	publisherWrapper: {
		backgroundColor: '#fff', 
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'rgba(156, 156, 156, 0.50)',
		elevation: 4,
		paddingBottom: 16,
		width: '100%',	
	},

	publisherWrapperHeader: {
		fontSize: 26, 
		textAlign: 'center', 
		fontWeight: 'bold', 
		marginBottom: 6
	},

	emptyCat: {
		textAlign: 'center', 
		opacity: 0.55, 
		fontSize: 14, 
		width: '72%', 
		marginLeft: 'auto',
		marginRight: 'auto'
	}
})