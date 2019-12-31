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

		return (
			categoryList.length > 0 ?
			<View>
				<View style={styles.publisherWrapper}>
					<TouchableNativeFeedback delayLongPress={6}>
						<Text 
							style={styles.publisherWrapperHeader}
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
					<View style={styles.m__RSS_container}>
						<Text style={styles.m__RSS_header}>
							Delete '{category}' category?
						</Text>
						<View style={{alignItems: 'center'}}>
							<Text style={{textAlign: 'center', marginTop: 6}}>
								Are you sure that you want to delete this category? You can readd it later. 
							</Text>
							
							<View style={styles.m__btn_wrapper}>
								<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
									<Text
										onPress={() => this.closeModal('deleteCat')}
										style={[
											styles.m__btn,
											{color: '#000', opacity: 0.3}
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
			: null
			
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

	emptyCat: {
		textAlign: 'center', 
		opacity: 0.55, 
		fontSize: 14, 
		width: '72%', 
		marginLeft: 'auto',
		marginRight: 'auto'
	},

	m__RSS_wrapper: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.55)',
		justifyContent:'center',
	},

	m__RSS_container: {
		width: 280,
		backgroundColor: '#fff', 
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
	}
})