import React, { useRef } from 'react';
import { 
	View,
	UIManager, 
	findNodeHandle,
	TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


export const CancelBtn = (props) => {
	const { CancelBtnHandler, MarginL, MarginR } = props;
	return (
		<View style={{
			padding: 8, 
			borderRadius: 32, 
			overflow: 'hidden',
			marginLeft: MarginL,
			marginRight: MarginR,
		}}>
			<TouchableNativeFeedback 
				onPress={CancelBtnHandler}
				background={TouchableNativeFeedback.Ripple('#555', true)}
			>
				<View>
					<Icon name='x' size={24}/>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};


export const DeleteBtn = (props) => {
	const { DeleteBtnHandler, MarginL, MarginR } = props;
	return (
		<View style={{
			padding: 8, 
			borderRadius: 32,
			marginLeft: MarginL,
			marginRight: MarginR,
			overflow: 'hidden'
		}}>
			<TouchableNativeFeedback 
				onPress={DeleteBtnHandler}
				background={TouchableNativeFeedback.Ripple('#555', true)}
			>
				<View>
					<Icon name='trash' size={21}/>
				</View>
			</TouchableNativeFeedback>
		</View>
	);	
};


export const SaveBtn = (props) => {
	const { SaveBtnHandler, MarginL, MarginR } = props;
	return (
		<View style={{
			padding: 8,
			marginLeft: MarginL,
			marginRight: MarginR,
			borderRadius: 32, 
			overflow: 'hidden'
		}}>
			<TouchableNativeFeedback 
				onPress={SaveBtnHandler}
				background={TouchableNativeFeedback.Ripple('#555', true)}
			>
				<View>
					<Icon name='check' size={24}/>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};


export const RenameBtn = (props) => {
	const { RenameBtnHandler, MarginL, MarginR } = props;
	return (
		<View style={{
			padding: 8, 
			borderRadius: 32,
			marginLeft: MarginL,
			marginRight: MarginR,
			overflow: 'hidden'
		}}>
			<TouchableNativeFeedback 
				onPress={RenameBtnHandler}
				background={TouchableNativeFeedback.Ripple('#555', true)}
			>
				<View>
					<Icon name='edit-3' size={21}/>
				</View>
			</TouchableNativeFeedback>
		</View>
	);	
};


export const MoreBtn = (props) => {
	const { MarginL, MarginR } = props;
	const menu = useRef();
	const onPress = () => {
		const { MoreBtnHandler, actions } = props;

		UIManager.showPopupMenu(
			findNodeHandle(menu.current),
			actions,
			onError,
			MoreBtnHandler
		)
	}

	const onError = () => {
		console.log('Popup Error');
	}

	return (
		<View style={{
			padding: 8, 
			borderRadius: 32, 
			overflow: 'hidden',
			marginLeft: MarginL,
			marginRight: MarginR,
		}}>
			<TouchableNativeFeedback 
				onPress={onPress}
				background={TouchableNativeFeedback.Ripple('#555', true)}
			>
				<View>
					<Icon name='more-vertical' size={24} ref={menu}/>
				</View>
			</TouchableNativeFeedback>
		</View>
	)
};