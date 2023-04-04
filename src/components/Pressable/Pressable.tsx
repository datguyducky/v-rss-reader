import { ReactElement } from 'react';
import {
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
} from '../../utils/pressGestureHandler';
import { PressableBackground } from './PressableBackground/PressableBackground';
import { PressableOpacity } from './PressableOpacity/PressableOpacity';

export interface PressableProps extends NativePressableProps {
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
}: PressableProps): ReactElement => {
	const singlePress = createSinglePressGesture(onPress);
	const doublePress = createDoublePressGesture(onDoublePress);
	const longPress = createLongPressGesture(onLongPress);

	return (
		<GestureDetector gesture={Gesture.Exclusive(longPress, doublePress, singlePress)}>
			<NativePressable style={style}>{children}</NativePressable>
		</GestureDetector>
	);
};

Pressable.Background = PressableBackground;
Pressable.Opacity = PressableOpacity;
