import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../components';
import Icon from 'react-native-vector-icons/Feather';
import { scrollHandler } from '../globals/Helpers';
import styled, { withTheme } from 'styled-components';


const About = (props) => {
	const appTheme = props.theme;
	
	
	// start of styled components
	const StyledAbout = styled.ScrollView`
		padding-horizontal: 12px;
		padding-vertical: 4px;
		background-color: ${appTheme.MAIN_BG};
	`;

	const SectionHeader = styled.Text`
		font-size: 18px;
		font-family: Muli-SemiBold;
		color: ${appTheme.MAIN_TEXT};
	`;

	const SectionText = styled(CustomText)`
		margin-bottom: 12px;
		font-size: 16px;
		color: ${appTheme.MAIN_TEXT};
	`;
	// end of styled components
	

	return (
		<StyledAbout style={{flex: 1}} onScroll={(event) => scrollHandler(event, props)}>
			
			<View style={{marginBottom: 12}}>
				<SectionHeader>Introduction</SectionHeader>
				
				<SectionText>
					Read news and articles only from websites and topics that you are really interested in by choosing which RSS feeds you want to add, and if needed - easily categorize them.
				</SectionText>
				<SectionText>
					Hope you like it and don't forget to rate it on Google Play. Leave a review of what you would like to change.
				</SectionText>
			</View>

			<View style={{marginBottom: 12}}>
				<SectionHeader>What's RSS?</SectionHeader>
				
				<SectionText>
					RSS is a list with latest articles, podcasts episodes, blog entries and etc. (with their respective information) from a selected website in a single computer-readable format.
				</SectionText>
				<SectionText>
					Mobiles apps (or websites), like V are called RSS readers or news aggregators and are used to display latest data from feeds in one single place, without a need to manually check the website for new content. 
				</SectionText>
			</View>


			<View style={{marginBottom: 12}}>
				<SectionHeader>How to find RSS feed link?</SectionHeader>
				
				<SectionText> 
					Unfortunately not all websites serves RSS feeds, but if they do, then you should be available to find somewhere on the website RSS icon, which look like this:  <Icon name='rss' size={16}/>
				</SectionText>
				<SectionText> 
					You can also try to use Google (or other search engine) to find RSS link for the website you're interested in.
				</SectionText>
			</View>

			<View style={{marginBottom: 12}}>
				<SectionHeader>Privacy concerns</SectionHeader>
				
				<SectionText> 
					V - RSS Reader don't collect, send or process any personal user data. Feeds and categories added by the user are completely stored locally (on the user device) and are never send anywhere else.
				</SectionText>
			</View>
		</StyledAbout>
	);
	
}; export default withTheme(About);