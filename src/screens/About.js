import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { CustomText } from '../components';
import Icon from 'react-native-vector-icons/Feather';
import { scrollHandler } from '../globals/Helpers';


const Home = (props) => {
	return (
		<ScrollView style={styles.HomeWrapper} onScroll={(event) => scrollHandler(event, props)}>
			
			<View style={{marginBottom: 12}}>
				<Text style={styles.SubHeader}>Introduction</Text>
				
				<CustomText style={styles.AboutText}>
					Read news and articles only from websites and topics that you are really interested in by choosing which RSS feeds you want to add, and if needed - easily categorize them.
				</CustomText>
				<CustomText style={styles.AboutText}>
					Hope you like it and don't forget to rate it on Google Play. Leave a review of what you would like to change.
				</CustomText>
			</View>

			<View style={{marginBottom: 12}}>
				<Text style={styles.SubHeader}>What's RSS?</Text>
				
				<CustomText style={styles.AboutText}>
					RSS is a list with latest articles, podcasts episodes, blog entries and etc. (with their respective information) from a selected website in a single computer-readable format.
				</CustomText>
				<CustomText style={styles.AboutText}>
					Mobiles apps (or websites), like V are called RSS readers or news aggregators and are used to display latest data from feeds in one single place, without a need to manually check the website for new content. 
				</CustomText>
			</View>


			<View style={{marginBottom: 12}}>
				<Text style={styles.SubHeader}>How to find RSS feed link?</Text>
				
				<CustomText style={styles.AboutText}> 
					Unfortunately not all websites serves RSS feeds, but if they do, then you should be available to find somewhere on the website RSS icon, which look like this:  <Icon name='rss' size={16}/>
				</CustomText>
				<CustomText style={styles.AboutText}> 
					You can also try to use Google (or other search engine) to find RSS link for the website you're interested in.
				</CustomText>
			</View>

			<View style={{marginBottom: 12}}>
				<Text style={styles.SubHeader}>Privacy concerns</Text>
				
				<CustomText style={styles.AboutText}> 
					V - RSS Reader don't collect, send or process any personal user data. Feeds and categories added by the user are completely stored locally (on the user device) and are never send anywhere else.
				</CustomText>
			</View>
		</ScrollView>
	);
	
}; export default Home;


const styles = StyleSheet.create({
	HomeWrapper: { 
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: '#fff'
	},

	SubHeader: {
		fontSize: 18,
		fontFamily: 'Muli-SemiBold'
	},

	AboutText: {
		marginBottom: 12,
		fontSize: 16
	}
});