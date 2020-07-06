import React from 'react';
import { 
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomText from './CustomText';


export const FakeInput = (props) => {
	const { onPress, iconName, placeholderText, width } = props;
	return (
		<TouchableOpacity 
			activeOpacity={0.7} 
			onPress={onPress}
			style={{
				width: width,
				maxWidth: 320,
				alignSelf: 'center'
			}}
		>	
			<View style={styles.fakeInput}>
				<CustomText style={styles.fakeInput__placeholder}> 
					{placeholderText} 
				</CustomText>
			
				<Icon 
					name={iconName} 
					style={{
						marginLeft: 'auto', 
						marginRight: 2, 
						color: '#2F3037'
					}} 
					size={18}
				/>
			</View>
		</TouchableOpacity>
	);
}; export default FakeInput;

const styles = StyleSheet.create({
	fakeInput: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 4,
		fontSize: 16,
		paddingVertical: 5,
		paddingHorizontal: 8,
		fontFamily: 'OpenSans-Regular',
		backgroundColor: '#EFF0F5',
		borderColor: '#9194A1',
		marginBottom: 16
	},

	fakeInput__placeholder: {
		fontSize: 16, 
		padding: 2, 
		color: '#9194A1'
	}
})