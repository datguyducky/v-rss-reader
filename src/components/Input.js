import React from 'react';
import { 
	View,
	StyleSheet,
	TextInput
} from 'react-native';
import CustomText from './CustomText';


export const Input = (props) => {
	const { inputLabel, onError, autoFocus, placeholderText, value, onChangeText } = props;
	return (
		<View style={{ 
			marginBottom: 16,
			width: '76%',
			maxWidth: 320 
		}}>
			<CustomText style={styles.input__label}>
				{inputLabel}
			</CustomText>
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
						borderColor: onError.length > 0 ? '#D8000C' : '#9194A1'
					}
				]}
			/>

			<CustomText style={[
				styles.input__error,
				{ 
					display: onError.length > 0 ? 'flex' : 'none' 
				}
			]}>
				{onError}
			</CustomText>
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