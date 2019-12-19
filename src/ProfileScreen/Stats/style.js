import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	statsWrapper: {
		paddingHorizontal: 16,
		paddingVertical: 15,
	},

	stats_header: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 8,
	},

	stats_item: {
		fontSize: 12,
		fontFamily: 'monospace',
		textTransform: 'uppercase',
		textAlign: 'center',
		marginBottom: 8
	},

	set_item: {
		fontSize: 17,
		textAlign: 'center',
		marginBottom: 4,
		width: '76%',
		marginRight: 'auto',
		marginLeft: 'auto',
	},

	set_value: {
		textAlign: 'center', 
		textTransform: 'uppercase', 
		fontWeight: 'bold', 
		marginBottom: 18
	},

	settingsWrapper: {
		paddingHorizontal: 16,
		paddingVertical: 15,
	}
});