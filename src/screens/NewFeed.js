import React from 'react';
import { 
	StyleSheet, 
	View, 
	TextInput,
	TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


const NewFeed = (props) => {
	React.useLayoutEffect(() => {
		props.navigation.setOptions({
			// welcome to React Native, where you need to use two <View/> components and 
			// style one of them with: 'overflow: hidden'
			// just to make bordeRadius work properly with TouchableNativeFeedback
			headerRight: () => (
				<View style={{padding: 8, borderRadius: 32, overflow: 'hidden'}}>
					<TouchableNativeFeedback 
						onPress={() => console.log("saved")}
						background={TouchableNativeFeedback.Ripple('#555', true)}
					>
							<View>
								<Icon name='check' size={24}/>
							</View>
					</TouchableNativeFeedback>
				</View>
			)
		})
	})

	
	return (
		<View style={styles.NewFeedWrapper}>
			<View style={{
				borderBottomWidth: 1, 
				borderBottomColor: '#CFD0D3',
				marginBottom: 12
			}}>
				<TextInput
					autoCapitalize='none'
					autoFocus={true}
					style={styles.NewFeed__input}
					placeholder='RSS feed name'
					placeholderTextColor='#9194A1'
				/>
			</View>

			<View style={{
				borderBottomWidth: 1, 
				borderBottomColor: '#CFD0D3', 
				marginBottom: 12
			}}>
				<TextInput
					autoCapitalize='none'
					style={styles.NewFeed__input}
					placeholder='RSS feed link'
					placeholderTextColor='#9194A1'
				/>
			</View>
		</View>
	);
	
}; export default NewFeed;


const styles = StyleSheet.create({
	NewFeed__input: {
		borderWidth: 0,
		width: 260,
		fontSize: 16,
		padding: 0
	},

	NewFeedWrapper: {
		paddingTop: 8,
		flex: 1, 
		backgroundColor: '#fff',
		alignItems: 'center', 
	},
});