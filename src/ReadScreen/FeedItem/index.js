import React from 'react';
import { TouchableNativeFeedback, View, Text, StyleSheet, Linking } from 'react-native';

export default class FeedItem extends React.Component {
	render() {
		pubName = this.props.pubName;
		title = this.props.title;
		published = this.props.published;
		
		if(pubName.includes('The Guardian')) {
			pubName = 'The Guardian';
		}
		else if(pubName.includes('VentureBeat')) {
			pubName = 'VentureBeat';
		}
		else if(pubName.includes('NYT')) {
			pubName = 'New York Times';
		}
		else if(pubName === 'Science and technology') {
			pubName = 'The Economist';
		}
		else if(pubName.includes('New York Post')) {
			pubName = 'New York Post';
		}
		else if(pubName.includes('WSJ.com')) {
			pubName = 'The Wall Street Journal';
		}
		else if(pubName.includes('The Verge')) {
			pubName = 'The Verge';
		}
		else if(pubName.includes('Latest')) {
			pubName = 'WIRED';
		}

		let category = [];
		let categoriesHolder = this.props.categories;
		if(categoriesHolder !== 'undefined') {
			Object.keys(categoriesHolder).forEach(function(key) {
				category.push(categoriesHolder[key]);
			})
		}

		return (
			<TouchableNativeFeedback onPress={() => Linking.openURL(this.props.url).catch(err => console.error('An error occurred', err))}>
				<View 
				style={{ 
					backgroundColor: '#fff',
					paddingVertical: 8,
					paddingHorizontal: 16,
					borderBottomWidth: StyleSheet.hairlineWidth,
					borderBottomColor: 'rgba(156, 156, 156, 0.50)',
					elevation: 4,
					width: '100%',
				}}
				>
					<Text style={{fontSize: 12, fontWeight: 'bold', color: '#0080B0'}}>{pubName + ' / ' + category}</Text>
					<Text style={{fontSize: 24}}>{title}</Text>
					<Text style={{opacity: 0.7, fontSize: 11, textAlign: 'right', marginTop: 12}}>Published at: {published}</Text>
				</View>
			</TouchableNativeFeedback>
		)
	}
}