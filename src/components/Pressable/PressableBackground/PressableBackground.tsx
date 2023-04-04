import {
	ColorValue,
	Pressable as NativePressable,
	PressableProps as NativePressableProps,
	StyleProp,
	ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import {
	createDoublePressGesture,
	createLongPressGesture,
	createSinglePressGesture,
} from '../../../utils/pressGestureHandler';
import React from 'react';

interface PressableProps extends NativePressableProps {
	onPress?: () => void;
	onLongPress?: () => void;
	onDoublePress?: () => void;
	underlayColor?: ColorValue;
	foreground?: boolean;
	borderless?: boolean;
	style?: StyleProp<ViewStyle>;
}

export const PressableBackground = ({
	onPress,
	onDoublePress,
	onLongPress,
	children,
	style,
	underlayColor = '#00000aa',
	foreground = true,
	borderless = false,
}: PressableProps): React.ReactElement => {
	const singlePress = createSinglePressGesture(onPress);
	const doublePress = createDoublePressGesture(onDoublePress);
	const longPress = createLongPressGesture(onLongPress);

	return (
		<GestureDetector gesture={Gesture.Exclusive(longPress, doublePress, singlePress)}>
			<NativePressable
				style={style}
				android_ripple={{ color: underlayColor, foreground, borderless }}
			>
				{children}
			</NativePressable>
		</GestureDetector>
	);
};
