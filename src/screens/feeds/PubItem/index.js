import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import PubCat from './PubCat';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';

export default class PubItem extends Component {
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
				<View style={Styles.publisherWrapper}>
					<TouchableNativeFeedback delayLongPress={6}>
						<Text 
							style={Styles.publisherWrapperHeader}
							onLongPress={() => this.openModal('deleteCat')}
							
						>
							{category}
						</Text>
					</TouchableNativeFeedback>
					<View>
						{
							categoryList.map(o => {
								return (
									<PubCat
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
				<View style={Styles.m__RSS_wrapper}>
					<View style={Styles.m__RSS_container}>
						<Text style={Styles.m__RSS_header}>
							Delete '{category}' category?
						</Text>
						<View style={{alignItems: 'center'}}>
							<Text style={{textAlign: 'center', marginTop: 6}}>
								Are you sure that you want to delete this category? You can readd it later. 
							</Text>
							
							<View style={Styles.m__btn_wrapper}>
								<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
									<Text
										onPress={() => this.closeModal('deleteCat')}
										style={[
											Styles.m__btn,
											{color: '#000', opacity: 0.3}
										]}
									>
										Cancel
									</Text>
								</TouchableNativeFeedback>
								<TouchableNativeFeedback style={{alignSelf: 'flex-end'}}>
									<Text 
										style={Styles.m__btn} 
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