import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomText } from '../components';


const Home = () => {
	return (
		<View style={styles.HomeWrapper}>
			<CustomText style={{color: "#9194A1"}}>
				settings
			</CustomText>
		</View>
	);
	
}; export default Home;


const styles = StyleSheet.create({
	HomeWrapper: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},
});