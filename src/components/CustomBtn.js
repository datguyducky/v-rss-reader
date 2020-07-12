import React from 'react';
import {
	TouchableNativeFeedback
} from 'react-native';
import CustomText from './CustomText';
import styled, { withTheme } from 'styled-components';


const CustomBtn = (props) => {
	const { onPress, border, color, title } = props;
	const appTheme = props.theme;


	// start of styled-components
	const BtnWrapper = styled.View`
		min-height: 42px;
		padding: 6px 12px;
		align-items: center;
		justify-content: center;
		marginHorizontal: 36px;
		border-radius: 4px;
		margin-bottom: 12px;
		border: 1.2px solid ${border || appTheme.BORDER}
	`;
	
	const BtnText = styled(CustomText)`
		font-size: 16px;
		color: ${appTheme.MAIN_TEXT};
		font-family: OpenSans-SemiBold;
		text-align: center;
	`;
	// end of styled-components


	return (
		<TouchableNativeFeedback 
			onPress={onPress}
			background={TouchableNativeFeedback.Ripple(appTheme.BORDER, false)}
		>
			<BtnWrapper>
				<BtnText>{title}</BtnText>
			</BtnWrapper>
		</TouchableNativeFeedback>
	)


}; export default withTheme(CustomBtn);