import React from 'react';
import { TouchableNativeFeedback, View, Text, Linking, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


export default class ReadCard extends React.Component {
	async ClicksCount() {
		let total = await AsyncStorage.getItem('clicks_count');

		if(total !== null) {
			total = parseInt(total);
			total += 1;
			await AsyncStorage.setItem('clicks_count', total.toString());
		} else {
			total = 1;
			await AsyncStorage.setItem('clicks_count', total.toString());
		}
	}

	async StreakCount() {
		let streak = await AsyncStorage.getItem('streak_count');
		streak = JSON.parse(streak);

		if(streak !== null) {
			let DAY = new Date(streak.lastDate);
			let TDAY = new Date();
			TDAY.setMinutes(TDAY.getMinutes() - TDAY.getTimezoneOffset());

			const DIF = TDAY.getTime() - DAY.getTime();
			const DIF_DAYS = Math.floor(DIF / (1000 * 3600 * 24));

			streak.lastDate = TDAY;

			if(DIF_DAYS === 1) {
				streak.streak += 1;
				//WTF is this lol. When current number of 'streak' is bigger than the one that it's saved in AsyncStorage 'record' then set it 'streak' number, else: do nothing with it.
				streak.record = streak.streak > streak.record ? streak.streak : streak.record ;
				await AsyncStorage.setItem('streak_count', JSON.stringify(streak));
			}
			else if (DIF_DAYS > 1) {
				streak.streak = 0;
				await AsyncStorage.setItem('streak_count', JSON.stringify(streak));
			}

		} else {
			let DAY = new Date();
			DAY.setMinutes(DAY.getMinutes() - DAY.getTimezoneOffset());

			streak = {
				lastDate: DAY,
				streak: 0,
				record: 0
			}

			await AsyncStorage.setItem('streak_count', JSON.stringify(streak));
		}
		//console.log(streak.record);
		//await AsyncStorage.removeItem('streak_count');
	}


	render() {
		pubName = this.props.pubName;
		title = this.props.title;
		published = this.props.published;

		let category = '';
		let categoriesHolder = this.props.categories;
		
		//displaying fetched category name - if exists.
		if(categoriesHolder !== undefined){
			category = ' / ' + categoriesHolder.name;
		}
		//for whatever reason The Wall Street Journal have PAID category for every post. It looks better without it.
		if(category == ' / PAID'){
			category = '';
		}

		let themeColor = this.props.themeColor;

		return (
			<TouchableNativeFeedback
			//onPress open browser with article
			onPress={() => {
				this.StreakCount();
				this.ClicksCount();
				Linking.openURL(this.props.url).catch(err => console.error('An error occurred', err))
			}}
			>
				<View style={styles.newsCard}>
					{/* Publisher name and category of article/news */}
					<Text style={[styles.newsCardPub, {color: themeColor}]}>
						{pubName + category}
					</Text>
					{/* Title of article/news */}
					<Text style={styles.newsCardTitle}>
						{title}
					</Text>
					{/* Date of published article/news [eg. 29 Nov 2019] */}
					<Text style={styles.newsCardDate}>
						Published at: {published}
					</Text>
				</View>
			</TouchableNativeFeedback>
		)
	}
}

const styles = StyleSheet.create({
	newsCard: {
		backgroundColor: '#fff',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'rgba(156, 156, 156, 0.50)',
		elevation: 4,
		width: '100%',
	},

	newsCardPub: {
		fontSize: 12, 
		color: '#0080B0',
		fontFamily: 'OpenSans-Bold',
	},

	newsCardTitle: {
		fontSize: 24,
		fontFamily: 'OpenSans-Regular',
		opacity: 0.75
	},

	newsCardDate: { 
		fontSize: 12, 
		textAlign: 'right', 
		marginTop: 12,
		fontFamily: 'OpenSans-Light'
	}
})