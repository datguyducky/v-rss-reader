import { StyleSheet } from 'react-native';

export default StyleSheet.create({ 
	publisherCard: {
		flexDirection: 'row', 
		alignItems: 'center', 
		marginVertical: 2,
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
	},

	m__input_wrapper: {
		marginTop: 10, 
		width: '80%', 
		borderBottomWidth: 2, 
		borderBottomColor: '#0080B0'
	},

	m__input: {
		height: 36, 
		width:'100%', 
		padding: 0, 
		paddingLeft: 5, 
		fontSize: 17
	}
})