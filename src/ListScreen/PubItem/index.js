import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PubCat from './PubCat';

import Styles from './style';

export default class PubItem extends Component {
	render() {
		let title = this.props.title;
		let feeds = this.props.feeds;
		return (
			<View style={Styles.publisherWrapper}>
				<Text style={Styles.publisherWrapperHeader}>
					{title}
				</Text>
					<View>
					{
							feeds.map((e) => {
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