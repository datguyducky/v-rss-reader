import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import FeedsCard from './FeedsCard';
import AsyncStorage from '@react-native-community/async-storage';

export default class FeedsCat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deleteCat: false
		}
	}

	async deleteCat() {
		const CAT = this.props.category;
		
		let catList = await AsyncStorage.getItem('catList');
		let feedsList = await AsyncStorage.getItem('custom_feeds');
		catList = JSON.parse(catList);
		feedsList = JSON.parse(feedsList);

		let newCatList = catList.filter(e => e.name !== CAT);
		let newFeedsList = feedsList.filter(e => e.category !== CAT);

		await AsyncStorage.setItem('catList', JSON.stringify(newCatList));
		await AsyncStorage.setItem('custom_feeds', JSON.stringify(newFeedsList));

		this.closeModal('deleteCat');
		this.props.renderChanges();
	}

	openModal(n) {
		this.setState({[`${n}`]: true});
	}

	closeModal(n) {
		this.setState({[`${n}`]: false});
	}

	render() {
		let category = this.props.category;
		let categoryList = this.props.c_list.feeds;
		
		let themeColor = this.props.themeColor;
		let themeBgColor = this.props.themeBgColor;
		let themeBgColor2 = this.props.themeBgColor2;
		let themeTColor = this.props.themeTColor;


		return (
			categoryList && category !== undefined ?
			<View>
				<View style={[styles.publisherWrapper, {backgroundColor: themeBgColor2}]}>
					<TouchableNativeFeedback delayLongPress={6}>
						<Text 
							style={[styles.publisherWrapperHeader, {color: themeTColor}]}
							onLongPress={() => this.openModal('deleteCat')}
							
						>
							{category}
						</Text>
					</TouchableNativeFeedback>
					<View>
						{
							categoryList.map(o => {
								return (
									<FeedsCard
										key = {o.id}
										ID = {o.id}
										name = {o.name}
										category = {category}
										renderChanges={this.props.renderChanges}
										themeColor={themeColor}
										themeBgColor={themeBgColor}
										themeTColor={themeTColor}
									/>
								)
							})
						}
					</View>
				</View>

				<Modal
					visible={this.state.deleteCat}
					animationType={'fade'}
					onRequestClose={() => this.closeModal('deleteCat')}
					transparent={true}
				>
				<View style={styles.m__RSS_wrapper}>
					<View style={[styles.m__RSS_container, {backgroundColor: themeBgColor}]}>
						<Text style={[styles.m__RSS_header, {backgroundColor: themeColor}]}>
							Delete '{category}' category?
						</Text>
						<View style={{alignItems: 'center'}}>
							<Text style={{textAlign: 'center', marginTop: 6, color: themeTColor}}>
								Are you sure that you want to delete this category? You can readd it later. 
							</Text>
							
							<View style={styles.m__btn_wrapper}>
								<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
									<Text
										onPress={() => this.closeModal('deleteCat')}
										style={[
											styles.m__btn,
											{color: themeTColor, opacity: 0.5}
										]}
									>
										Cancel
									</Text>
								</TouchableNativeFeedback>
								<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
									<Text 
										style={styles.m__btn} 
										onPress={() => this.deleteCat()}
									>
										Delete
									</Text>
								</TouchableNativeFeedback>
							</View>
						</View>
					</View>
				</View>
				</Modal>
			</View>
			
			: 
			<Text style={[styles.noCat, {color: themeTColor}]}>
				Please create new category and add new RSS Feed to it.
			</Text>
		)
	}
}

const styles = StyleSheet.create({
	publisherWrapper: {
		backgroundColor: '#fff', 
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'rgba(156, 156, 156, 0.50)',
		elevation: 4,
		paddingBottom: 16,
		width: '100%',	
		marginBottom: 12
	},

	publisherWrapperHeader: {
		fontSize: 25, 
		textAlign: 'center',  
		marginBottom: 6,
		fontFamily: 'Muli-ExtraBold'
	},

	m__RSS_wrapper: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.55)',
		justifyContent:'center',
	},

	m__RSS_container: {
		width: 280,
		backgroundColor: '#fbfbfb', 
		alignSelf: 'center',
		borderRadius: 6,
		elevation: 4,
	},

	m__RSS_header: {
		fontSize: 21,
		textAlign: 'center',
		backgroundColor: '#0080B0',
		color: '#fff',
		fontFamily: 'Muli-ExtraBold',
		paddingVertical: 4,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6	
	},

	m__btn_wrapper: {
		flexDirection: 'row', 
		marginLeft: 'auto', 
		marginTop: 8,
		marginBottom: 10
	},

	m__btn: {
		fontSize: 18, 
		fontFamily: 'Muli-ExtraBold',
		color: '#D8000C', 
		padding: 4, 
		marginRight: 8	
	},

	noCat: {
		fontSize: 17,
		fontFamily: 'OpenSans-Regular',
		width: '78%',
		textAlign: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 6
	}
})