import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	m__addRSS_wrapper: {
		flex: 1,
		justifyContent:'center',
	},

	m__addRSS_container: {
		width: 280,
		backgroundColor: '#fff', 
		alignSelf: 'center',
		borderRadius: 6,
		elevation: 4,
	},

	m__addRSS_header: {
		fontSize: 24,
		textAlign: 'center',
		backgroundColor: '#0080B0',
		color: '#fff',
		fontWeight: 'bold',
		paddingVertical: 4,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6
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
	},

	m__error: {
		textAlign: 'center', 
		color: '#D8000C', 
		width: '80%',
		marginTop: 4,
		fontSize: 12,
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
		color: '#0080B0', 
		padding: 4, 
		marginRight: 8
	},

	m__opRSS_wrapper: {
		height: '100%',
	},

	m__opRSS_btn_wrapper: {
		backgroundColor: '#1575a0',
		fontSize: 32,
		flexDirection: 'row',
		justifyContent: 'center'
	},

	m__opRSS_btn: {
		color: '#fff',
		fontSize: 15,
		padding: 8,
		textTransform: 'uppercase'
	}
	
})