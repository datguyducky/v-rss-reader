import React, { useEffect, useState } from 'react';
import {
	View,
	TouchableNativeFeedback
} from 'react-native';
import { CustomText } from '../components';
import styled, { withTheme } from 'styled-components';
import { scrollHandler } from '../globals/Helpers';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';


const Settings = (props) => {
	const appTheme = props.theme;
	const [userStats, set_userStats] = useState({});
	

	useEffect(() => {
		const loadStats = async () => {
			let result = await AsyncStorage.getItem('user_stats');
			result = JSON.parse(result);

			if(result !== null) {
				set_userStats(result);
			};
		}; loadStats();
	}, []);


	const changeTheme = async () => {
		
	}


	// start of styled-components
	const StyledSettings = styled.ScrollView`
		padding-horizontal: 12px;
		padding-vertical: 4px;
		background-color: ${appTheme.MAIN_BG};
	`;

	const SectionHeader = styled.Text`
		font-size: 18px;
		font-family: Muli-SemiBold;
		color: ${appTheme.MAIN_TEXT};
	`;

	const Stats = styled.View`
		flex-direction: row;
		align-items: center;
	`;

	const StatsHeader = styled(CustomText)`
		font-size: 16px;
		color: ${appTheme.MAIN_TEXT};
		margin-right: 4px;
	`;

	const StatsValue = styled(CustomText)`
		font-size: 16px;
		color: ${appTheme.DIM_TEXT};
	`;

	const Options = styled.View`
		flex-direction: row;
		align-items: center;
		margin-Vertical: 6px;
	`;

	const OptionsText = styled.View`
		margin-left: 8px;
	`

	const OptionsHeader = styled(CustomText)`
		color: ${appTheme.MAIN_TEXT};
		font-size: 16px;
	`;

	const OptionsSubHeader = styled(CustomText)`
		color: ${appTheme.SEC_TEXT};
		font-size: 14px;
		font-family: OpenSans-Light;
	`;
	// end of styled-components


	return (
		<StyledSettings style={{flex: 1}} onScroll={(event) => scrollHandler(event, props)}>
			
			<View style={{marginBottom: 12}}>
				<SectionHeader>Stats</SectionHeader>

				<Stats>
					<StatsHeader>Number of news opened:</StatsHeader>
					<StatsValue>{userStats.news_opened || '0'}</StatsValue>
				</Stats>

				<Stats>
					<StatsHeader>First usage of app:</StatsHeader>
					<StatsValue>{userStats.app_launch || ''}</StatsValue>
				</Stats>

				<Stats>
					<StatsHeader>Longest reading streak:</StatsHeader>
					<StatsValue>
						{
							userStats.reading_streak > 1
							? userStats.reading_streak + ' days'
							: userStats.reading_streak + ' day'
							
							|| '0 days'
						}
					</StatsValue>
				</Stats>

				<Stats>
					<StatsHeader>Current reading streak:</StatsHeader>
					<StatsValue>
						{
							userStats.reading_longest_streak > 1
							? userStats.reading_longest_streak + ' days'
							: userStats.reading_longest_streak + ' day'
							
							|| '0 days'
						}
					</StatsValue>
				</Stats>
			</View>

			<View style={{marginBottom: 12}}>
				<SectionHeader>Settings</SectionHeader>

				<TouchableNativeFeedback onPress={() => console.log('a')}>
					<Options>
						<Icon name='eye' size={21} color={appTheme.MAIN_TEXT}/>
						
						<OptionsText>
							<OptionsHeader>Theme</OptionsHeader>
							<OptionsSubHeader>Follow system</OptionsSubHeader>
						</OptionsText>
					</Options>
				</TouchableNativeFeedback>
			</View>

		</StyledSettings>
	);
}; export default withTheme(Settings);