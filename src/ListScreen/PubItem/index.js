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
							categoryList.length > 0 ?
							categoryList.map(o => {
								return (
									<PubCat
										ID = {o.id}
										name = {o.name}
										category = {category}
										renderChanges={this.props.renderChanges}
									/>
								)
							})
							:
							<Text style={Styles.emptyCat}>
								Click '+' button to add new RSS feed to this category. 
							</Text>

						}
						
					</View>
			</View>
		)
	}
}