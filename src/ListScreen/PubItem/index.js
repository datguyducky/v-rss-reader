import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PubCat from './PubCat';

export default class PubItem extends Component {
	render() {
		let title = this.props.title;
		let feeds = this.props.feeds;
		return (
			<View style={{
				backgroundColor: '#fff', 
				paddingVertical: 8,
				paddingHorizontal: 16,
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderBottomColor: 'rgba(156, 156, 156, 0.50)',
				elevation: 4,
				paddingBottom: 16,
				width: '100%',
			}}>
				<Text style={{fontSize: 26, textAlign: 'center', fontWeight: 'bold', marginBottom: 6}}>{title}</Text>
					<View>
					{
							feeds.map((e) => {
								const catStyle = e.category.replace(/ /g, '_');
								return (
									<PubCat
										key = {e.id}
										ID = {e.id}
										category = {e.category}
										parent = {title}
									/>
								)
							})
					}
					</View>
					
			</View>
		)
	}
}