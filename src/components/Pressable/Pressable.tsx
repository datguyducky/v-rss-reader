import { PressableProps as NativePressableProps, StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import {
	createDoublePressGesture,
	createLongPressGesture,
	createSinglePressGesture,
} from '../../utils/pressGestureHandler';
import { StyledNativePressable, StyledNativePressableStyles } from './Pressable.styles';
import { PressableBackground } from './PressableBackground/PressableBackground';
import { PressableOpacity } from './PressableOpacity/PressableOpacity';

export interface PressableProps extends StyledNativePressableStyles, NativePressableProps {
	onPress?: () => void;
	onLongPress?: () => void;
	onDoublePress?: () => void;
	style?: StyleProp<ViewStyle>;
}

export const Pressable = ({
	onPress,
	onDoublePress,
	onLongPress,
	children,
	style,
	py = 0,
	px = 0,
}: PressableProps) => {
	const singlePress = createSinglePressGesture(onPress);
	const doublePress = createDoublePressGesture(onDoublePress);
	const longPress = createLongPressGesture(onLongPress);

	return (
		<GestureDetector gesture={Gesture.Exclusive(longPress, doublePress, singlePress)}>
			<StyledNativePressable py={py} px={px} style={style}>
				{children}
			</StyledNativePressable>
		</GestureDetector>
	);
};

Pressable.Background = PressableBackground;
Pressable.Opacity = PressableOpacity;
