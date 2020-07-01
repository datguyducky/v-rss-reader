import React from 'react';
import { 
	View,
	Text,
	StyleSheet,
	TextInput
} from 'react-native';


export const Input = (props) => {
	const { inputLabel, catError, autoFocus, placeholderText, value, onChangeText } = props;
	return (
		<View style={{ 
			marginBottom: 16,
			width: '76%',
			maxWidth: 320 
		}}>
			<Text style={styles.input__label}>
				{inputLabel}
			</Text>
			<TextInput
				autoCapitalize='none'
				autoFocus={autoFocus}
				placeholder={placeholderText}
				placeholderTextColor='#9194A1'
				onChangeText={onChangeText}
				value={value}
				style={[
					styles.input,
					{
						borderColor: catError.length > 0 ? '#D8000C' : '#9194A1'
					}
				]}
			/>

			<Text style={[
				styles.input__error,
				{ 
					display: catError.length > 0 ? 'flex' : 'none' 
				}
			]}>
				{catError}
			</Text>
		</View>
	);
}; export default Input;

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderRadius: 4,
		fontSize: 16,
		paddingVertical: 4,
		paddingHorizontal: 8,
		fontFamily: 'OpenSans-Regular',
		backgroundColor: '#EFF0F5'
	},

	input__label: {
		fontSize: 17,
		marginBottom: 4,
		fontFamily: 'Muli-SemiBold',
		color: '#2F3037'
	},

	input__error: {
		color: '#D8000C',
		textAlign: 'center',
		marginTop: 4,
		maxWidth: 320,
		display: 'none'
	}
})