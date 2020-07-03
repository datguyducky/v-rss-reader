import React, { useRef } from 'react';
import { 
	View,
	UIManager, 
	findNodeHandle,
	TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const NavBtn = (props) => {
	const { onPress, iconName, iconSize } = props;
	return (
		<View style={{
			padding: 6, 
			borderRadius: 32, 
			overflow: 'hidden'
		}}>
			<TouchableNativeFeedback 
				onPress={onPress}
				background={TouchableNativeFeedback.Ripple('#555', true)}
			>
				<View>
					<Icon 
						name={iconName}
						size={iconSize}
					/>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}


export const NavMoreBtn = (props) => {
	const { iconSize } = props;
	const menu = useRef();
	const onPress = () => {
		const { onPress, actions } = props;

		UIManager.showPopupMenu(
			findNodeHandle(menu.current),
			actions,
			onError,
			onPress
		)
	}

	const onError = () => {
		console.log('Popup Error');
	}

	return (
		// welcome to React Native, where you need to use two <View/> components and 
		// style one of them with: 'overflow: hidden'
		// just to make bordeRadius work properly with TouchableNativeFeedback
		<View style={{
			padding: 8, 
			borderRadius: 32, 
			overflow: 'hidden',
		}}>
			<TouchableNativeFeedback 
				onPress={onPress}
				background={TouchableNativeFeedback.Ripple('#555', true)}
			>
				<View>
					<Icon name='more-vertical' size={iconSize} ref={menu}/>
				</View>
			</TouchableNativeFeedback>
		</View>
	)
}