import React, { useEffect, useState } from 'react';
import {
	View,
	TouchableNativeFeedback,
	Modal,
	TouchableOpacity
} from 'react-native';
import { 
	CustomText, 
	CustomBtn 
} from '../components';
import styled, { withTheme } from 'styled-components';
import { scrollHandler, defaultSettings, defaultStats, convertToRedesign } from '../globals/Helpers';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';


const Settings = (props) => {
	const appTheme = props.theme;
	const { navigate } = props.navigation;
	const [userStats, set_userStats] = useState({});
	const [themeModal, set_themeModal] = useState(false);
	const [userSettings, set_userSettings] = useState({});
	const [newTheme, set_newTheme] = useState('');
	const [displayRestore, set_displayRestore] = useState(false);
	

	useEffect(() => {
		const loadStats = async () => {
			let result = await AsyncStorage.getItem('user_stats');
			result = JSON.parse(result);

			if(result !== null) {
				set_userStats(result);
			};
		}; loadStats();

		const loadOldData = async () => {
			let result = await AsyncStorage.getItem('custom_feeds');
			result = JSON.parse(result);

			if(result !== null) {
				set_displayRestore(true);
			}
		}

		const loadSettigns = async () => {
			let result = await AsyncStorage.getItem('user_settings');
			result = JSON.parse(result);

			if(result !== null) {
				set_userSettings(result);
				set_newTheme(result.theme);
			}
		}; loadSettigns();
	}, []);


	const changeTheme = (name) => {
		set_newTheme(name);
		userSettings.theme = name;
		
		// save change to AsyncStorage and reload the app
		AsyncStorage.setItem('user_settings', JSON.stringify(userSettings));
		props.route.params.set_settingsCheck(name);
		
		// hide modal
		set_themeModal(false); 
	}

	
	const deleteData = async () => {
		const keys = [
			'user_categories',
			'user_nocatfeeds',
		];

		// resetting settings and stats to default values
		defaultSettings();
		defaultStats();
		
		// completely removing user categories and feeds without cat from storage
		AsyncStorage.multiRemove(keys, (err) => {
			if(err) {
				console.log(err);
			}
		});

		
		// going back to Home screen
		navigate('Home');
	}


	// start of styled-components
	const SectionHeader = styled.Text`
		font-size: 18px;
		font-family: Muli-SemiBold;
		color: ${appTheme.MAIN_TEXT};
		padding-horizontal: 12px;
	`;

	const Stats = styled.View`
		flex-direction: row;
		align-items: center;
		padding-horizontal: 12px;
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
		margin-vertical: 6px;
		padding-horizontal: 12px;
		padding-vertical: 4px;
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
		text-transform: capitalize;
	`;

	const ModalBackground = styled.View`
		background-color: rgba(0, 0, 0, 0.5);
		align-items: center;
		justify-content: center;
	`;

	const ModalContent = styled.View`
		background-color: ${appTheme.MAIN_BG};
		height: 240px;
		width: 84%;
		padding-horizontal: 16px;
		padding-vertical: 12px;
		border-radius: 4px;
		max-width: 360px;
	`;

	const ModalHeader = styled.Text`
		font-size: 18px;
		font-family: Muli-SemiBold;
		color: ${appTheme.MAIN_TEXT};
		margin-bottom: 6px;
	`;

	const IconWrapper = styled.View`
		align-items: center;
		flex-direction: row;
		margin-bottom: 6px;
		padding-vertical: 6px;
	`;

	const DefaultIcon = styled(Icon)`
		color: ${appTheme.SEC_TEXT};
		margin-right: 12px;
	`;

	const SelectedIcon = styled(Icon)`
		color: ${appTheme.BRAND};
		margin-right: 12px;
	`;

	const IconText = styled(CustomText)`
		font-size: 16px;
		color: ${appTheme.MAIN_TEXT}
	`;

	const ModalCancelText = styled.Text`
		position: absolute;
		bottom: 6px;
		right: 6px;
		font-family: Muli-SemiBold;
		font-size: 15px;
		color: ${appTheme.BRAND};
	`;
	// end of styled-components


	return (
		<View 
			style={{
				flex: 1,
				paddingVertical: 4,
				backgroundColor: appTheme.MAIN_BG,

			}} 
			onScroll={(event) => scrollHandler(event, props)}
		>
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

				<TouchableNativeFeedback 
					onPress={() => set_themeModal(true)}
					background={TouchableNativeFeedback.Ripple(appTheme.BORDER, false)}
				>
					<Options>
						<Icon name='eye' size={21} color={appTheme.MAIN_TEXT}/>
						
						<OptionsText>
							<OptionsHeader>Theme</OptionsHeader>
							<OptionsSubHeader>
								{
									userSettings.theme === 'system'
									? 'Follow ' + userSettings.theme
									: userSettings.theme
								}
							</OptionsSubHeader>
						</OptionsText>
					</Options>
				</TouchableNativeFeedback>
			</View>

			<View style={{marginBottom: 12, justifyContent: 'flex-end', flex: 1}}>
				{
					displayRestore ?
					<CustomBtn
						border={appTheme.BRAND}
						title='Restore data'
						color='#FFF'
						onPress={convertToRedesign}
					/>
					: null
				}
				
				<CustomBtn
					border={appTheme.ERROR}
					title='Delete data'
					color='#FFF'
					onPress={deleteData}
				/>
			</View>

			<Modal 
				animationType='fade'
				visible={themeModal}
				transparent={true}
				onRequestClose={() => set_themeModal(false)}
				statusBarTranslucent={true}
			>
				<ModalBackground style={{flex: 1}}>
					<ModalContent>
						<ModalHeader>Theme</ModalHeader>

						<TouchableNativeFeedback 
							onPress={() => changeTheme('system')}
							background={TouchableNativeFeedback.Ripple(appTheme.BORDER, false)}
						>
							<IconWrapper>
								{
									newTheme === 'system'
									? <SelectedIcon name='check-circle' size={21}/>
									: <DefaultIcon name='circle' size={21}/>
								}
	
								<IconText>System default</IconText>
							</IconWrapper>
						</TouchableNativeFeedback>

						<TouchableNativeFeedback 
							onPress={() => changeTheme('light')}
							background={TouchableNativeFeedback.Ripple(appTheme.BORDER, false)}
						>
							<IconWrapper>
								{
									newTheme === 'light'
									? <SelectedIcon name='check-circle' size={21}/>
									: <DefaultIcon name='circle' size={21}/>
								}

								<IconText>Light</IconText>
							</IconWrapper>
						</TouchableNativeFeedback>

						<TouchableNativeFeedback 
							onPress={() => changeTheme('dark')}
							background={TouchableNativeFeedback.Ripple(appTheme.BORDER, false)}
						>
							<IconWrapper>
								{
									newTheme === 'dark'
									? <SelectedIcon name='check-circle' size={21}/>
									: <DefaultIcon name='circle' size={21}/>
								}

								<IconText>Dark</IconText>
							</IconWrapper>
						</TouchableNativeFeedback>

						<TouchableOpacity 
							onPress={() => set_themeModal(false)} 
							background={TouchableNativeFeedback.Ripple(appTheme.BORDER, false)}
							style={{flex: 1}}
							activeOpacity={0.7}
						>
							<ModalCancelText>CANCEL</ModalCancelText>
						</TouchableOpacity>
					</ModalContent>
				</ModalBackground>
			</Modal>
		</View>
	);
}; export default withTheme(Settings);