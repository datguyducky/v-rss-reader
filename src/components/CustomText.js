import React from 'react';
import { StyleSheet, Text } from 'react-native';

const CustomText = props => <Text style={[styles.text, props.style]}>{props.children}</Text>
export default CustomText;

const styles = StyleSheet.create({
	text: {
		fontFamily: 'OpenSans-Regular'
	}
})