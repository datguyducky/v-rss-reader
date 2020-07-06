import React from 'react';
import { 
	View
} from 'react-native';
import CustomText from './CustomText';
import styled, { withTheme } from 'styled-components';


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

	const StyledInput = styled.TextInput`
		border-width: 1px;
		border-radius: 4px;
		font-size: 16px;
		padding-vertical: 4px;
		padding-horizontal: 8px;
		font-family: OpenSans-Regular;
		background-color: ${appTheme.SEC_BG};
	`;

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

			<StyledInput
				autoCapitalize='none'
				autoFocus={autoFocus}
				placeholder={placeholderText}
				placeholderTextColor={appTheme.DIM_TEXT}
				onChangeText={onChangeText}
				value={value}
				style={{ borderColor: onError.length > 0 ? appTheme.ERROR : appTheme.DIM_TEXT }}
			/>

			<InputError style={{ display: onError.length > 0 ? 'flex' : 'none' }}>
				{onError}
			</InputError>
		</View>
	);
}; export default withTheme(Input);