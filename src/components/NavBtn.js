import React, { useRef, useContext } from 'react';
import { 
	View,
	UIManager, 
	findNodeHandle,
	TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from 'styled-components';

export const NavBtn = (props) => {
	const { onPress, iconName, iconSize } = props;
	const appTheme = useContext(ThemeContext);
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
						color={appTheme.MAIN_TEXT}
					/>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}


export const NavMoreBtn = (props) => {
	const { iconSize } = props;
	const appTheme = useContext(ThemeContext);
	

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
					<Icon 
						name='more-vertical' 
						size={iconSize} 
						ref={menu}
						color={appTheme.MAIN_TEXT}
					/>
				</View>
			</TouchableNativeFeedback>
		</View>
	)
}