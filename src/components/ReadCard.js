import React from 'react';
import {
	TouchableWithoutFeedback
} from 'react-native';
import CustomText from './CustomText';
import styled, { withTheme } from 'styled-components';


const ReadCard = (props) => {
	const { title, date_published, url, publisher_name, categories} = props;
	const appTheme = props.theme;


	// start of styled-components
	const StyledReadCard = styled.View`
		background-color: ${appTheme.MAIN_BG};
		padding-vertical: 12px;
		padding-left: 24px;
		padding-right: 12px;
		min-height: 50px;
	`;

	const PublisherAndCategory = styled(CustomText)`
		font-size: 12px;
		color: ${appTheme.SEC_TEXT};
		font-family: OpenSans-Light;
	`;
	
	const Title = styled(CustomText)`
		font-size: 16px;
		color: ${appTheme.MAIN_TEXT};
		font-family: OpenSans-Regular;
	`;

	const PublishDate = styled(CustomText)`
		font-size: 12px
		color: ${appTheme.SEC_TEXT};
		text-align: right;
		font-family: OpenSans-Light;
	`;
	// end of styled-components


	return (
		<TouchableWithoutFeedback onPress={() => props.restartEdit()}>
			<StyledReadCard onStartShouldSetResponder={() => true}>
				<PublisherAndCategory>
					{ publisher_name + ' / ' + categories }
				</PublisherAndCategory>
	
				<Title>
					{ title }
				</Title>
	
				<PublishDate>
					Published: { date_published }
				</PublishDate>
			</StyledReadCard>
		</TouchableWithoutFeedback>
	);
}; export default withTheme(ReadCard);