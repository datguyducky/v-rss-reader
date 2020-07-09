import React from 'react';
import { 
	View
} from 'react-native';
import CustomText from './CustomText';
import styled, { withTheme } from 'styled-components';
import { TextInput } from 'react-native';


export const Input = (props) => {
	const { inputLabel, onError, autoFocus, placeholderText, value, onChangeText } = props;
	const appTheme = props.theme;


	// start of styled-components
	const InputLabel = styled.Text`
		font-size: 17px;
		margin-bottom: 4px;
		font-family: Muli-SemiBold;
		color: ${appTheme.SEC_TEXT};
	`;

	// not using styled-components for TextInput, because it starts to re-render with every onChangeText()

	const InputError = styled(CustomText)`
		color: ${appTheme.ERROR};
		textAlign: center;
		marginTop: 4px;
		maxWidth: 320px;
		display: none;
	`;
	// end of styled-components


	return (
		<View style={{ 
			marginBottom: 16,
			width: '76%',
			maxWidth: 320 
		}}>
			<InputLabel>
				{inputLabel}
			</InputLabel>

			<TextInput
				autoCapitalize='none'
				autoFocus={autoFocus}
				placeholder={placeholderText}
				placeholderTextColor={appTheme.DIM_TEXT}
				onChangeText={onChangeText}
				value={value}
				style={{ 
					borderColor: onError.length > 0 ? appTheme.ERROR : appTheme.DIM_TEXT,
					borderWidth: 1,
					borderRadius: 4,
					fontSize: 16,
					paddingVertical: 4,
					paddingHorizontal: 8,
					fontFamily: 'OpenSans-Regular',
					backgroundColor: appTheme.SEC_BG,
					color: appTheme.MAIN_TEXT
				}}
			/>

			<InputError style={{ display: onError.length > 0 ? 'flex' : 'none' }}>
				{onError}
			</InputError>
		</View>
	);
}; export default withTheme(Input);