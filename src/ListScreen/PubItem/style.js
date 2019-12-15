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
		marginBottom: 12
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
	},

	m__RSS_wrapper: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.55)',
		justifyContent:'center',
	},

	m__RSS_container: {
		width: 280,
		backgroundColor: '#fff', 
		alignSelf: 'center',
		borderRadius: 6,
		elevation: 4,
	},

	m__RSS_header: {
		fontSize: 24,
		textAlign: 'center',
		backgroundColor: '#0080B0',
		color: '#fff',
		fontWeight: 'bold',
		paddingVertical: 4,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6	
	},

	m__btn_wrapper: {
		flexDirection: 'row', 
		marginLeft: 'auto', 
		marginTop: 8,
		marginBottom: 10
	},

	m__btn: {
		fontSize: 21, 
		fontWeight: 'bold', 
		color: '#D8000C', 
		padding: 4, 
		marginRight: 8	
	}
})