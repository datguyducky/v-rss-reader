import React from 'react';
import {
	TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomText from './CustomText';
import styled, { withTheme } from 'styled-components';


export const FakeInput = (props) => {
	const { onPress, iconName, placeholderText, width } = props;
	const appTheme = props.theme;

	
	// start of styled-components
	const FakeInputPlaceholder = styled(CustomText)`
		font-size: 16px;
		padding: 2px;
		color: ${appTheme.DIM_TEXT};
	`;

	const StyledFakeInput = styled.View`
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px;
		border-radius: 4px;
		font-size: 16px;
		padding-vertical: 5px;
		padding-horizontal: 8px;
		font-family: OpenSans-Regular;
		background-color: ${appTheme.SEC_BG};
		border-color: ${appTheme.DIM_TEXT};
		margin-bottom: 16px;
	`;
	// end of styled-components


	return (
		<TouchableOpacity 
			activeOpacity={0.7} 
			onPress={onPress}
			style={{
				width: width,
				maxWidth: 320,
				alignSelf: 'center'
			}}
		>	
			<StyledFakeInput>
				<FakeInputPlaceholder> 
					{placeholderText} 
				</FakeInputPlaceholder>
			
				<Icon 
					name={iconName} 
					style={{
						marginLeft: 'auto', 
						marginRight: 2, 
						color: appTheme.SEC_TEXT
					}} 
					size={18}
				/>
			</StyledFakeInput>
		</TouchableOpacity>
	);
}; export default withTheme(FakeInput);