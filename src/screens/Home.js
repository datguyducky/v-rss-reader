import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { 
	StyleSheet, 
	View, 
	Text,
	TouchableOpacity
} from 'react-native';


const Home = (props) => {
	const { navigate } = props.navigation;
	return (
		<>
			<View style={styles.HomeWrapper}>
				<Text style={{color: "#9194A1"}}>
					Click + button to add first RSS feed.
				</Text>

				<View style={styles.AddFeed_btn} >
					<TouchableOpacity onPress={() => navigate('NewFeed')}>
						<Icon name="plus" size={36} color="#fff"/>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
	
}; export default Home;


const styles = StyleSheet.create({
	HomeWrapper: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},

	AddFeed_btn: {
		width: 56,
		height: 56,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 56,
		margin: 16,
		backgroundColor: '#0080B0',
		position: 'absolute',
		bottom: 0,
		right: 0,
		
	},
});