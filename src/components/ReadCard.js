import React from 'react';
import {
	TouchableNativeFeedback,
	Linking
} from 'react-native';
import CustomText from './CustomText';
import styled, { withTheme } from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';


const ReadCard = (props) => {
	const { title, date_published, url, publisher_name, categories} = props;
	const appTheme = props.theme;


	const handleUserStats = async () => {
		let USER_STATS = await AsyncStorage.getItem('user_stats');
		USER_STATS = JSON.parse(USER_STATS);

		// save how many articles user opened
		USER_STATS.news_opened += 1;
		AsyncStorage.setItem('user_stats', JSON.stringify(USER_STATS));
		 
		// save for how long 
		let LATEST = new Date(USER_STATS.last_day);
		let TODAY = new Date();
		TODAY.setMinutes(TODAY.getMinutes() - TODAY.getTimezoneOffset());


		// number of milliseconds per day
		const _MS_PER_DAY = 1000 * 60 * 60 * 24
		// difference in milliseconds (since 1970/01/01) between this two dates
		const DIF = TODAY.getTime() - LATEST.getTime();
		// converting difference to days
		const DIF_DAYS = Math.floor(DIF / _MS_PER_DAY);
		
		// saving today as a date when user recently opened an article
		USER_STATS.last_day = TODAY;


		// if exatcly 1 day passed when user lastly opened an article then we +1 to the reading streak stat
		// when more than 1 passed, then we reset the reading streak stat 
		if(DIF_DAYS === 1) {
			USER_STATS.reading_streak += 1;

		} else if (DIF_DAYS > 1){
			USER_STATS.reading_streak = 0;
		}


		// when current reading streak is longer than the longest one, then update it to the current streak 
		if(USER_STATS.reading_streak > USER_STATS.reading_longest_streak) {
			USER_STATS.reading_longest_streak = USER_STATS.reading_streak;
		}


		AsyncStorage.setItem('user_stats', JSON.stringify(USER_STATS));
	}


	const openLink = async () => {
		const CAN_OPEN = await Linking.canOpenURL(url);

		if(CAN_OPEN) {
			await Linking.openURL(url);

		} else {
			console.log(`Link not supported: ${url}`)
		}
	}


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
		<TouchableNativeFeedback 
			onPress={() => {
				props.restartEdit();
				openLink();
				handleUserStats();
			}}
			background={TouchableNativeFeedback.Ripple(appTheme.BORDER, false)}
		>
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
		</TouchableNativeFeedback>
	);
}; export default withTheme(ReadCard);