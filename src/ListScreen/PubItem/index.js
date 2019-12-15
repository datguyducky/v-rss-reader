import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PubCat from './PubCat';

import Styles from './style';

export default class PubItem extends Component {
	render() {
		let category = this.props.category;

		return (
			<View style={Styles.publisherWrapper}>
				{/*<Text style={Styles.publisherWrapperHeader}>
					{category}
				</Text>*/}
					<View>
						<PubCat
							ID = {this.props.id}
							name = {this.props.name}
						/>
					</View>
			</View>
		)
	}
}