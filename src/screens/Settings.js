import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const Home = () => {
	return (
		<View style={styles.HomeWrapper}>
			<Text style={{color: "#9194A1"}}>
				settings
			</Text>
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