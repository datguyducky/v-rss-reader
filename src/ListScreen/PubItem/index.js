import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PubCat from './PubCat';

import Styles from './style';

export default class PubItem extends Component {
	render() {
		let category = this.props.category;
		let categoryList = this.props.c_list.feeds;
		
		return (
			<View style={Styles.publisherWrapper}>
				<Text style={Styles.publisherWrapperHeader}>
					{category}
				</Text>
					<View>
						{
							categoryList.map(o => {
								return (
									<PubCat
										ID = {o.id}
										name = {o.name}
									/>
								)
							})
						}
						
					</View>
			</View>
		)
	}
}