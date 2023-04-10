import { PressableProps as NativePressableProps, StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { StyledNativePressable } from './Pressable.styles';
import { PressableBackground } from './PressableBackground/PressableBackground';
import { PressableOpacity } from './PressableOpacity/PressableOpacity';
import {
	createDoublePressGesture,
	createLongPressGesture,
	createSinglePressGesture,
} from '../../utils/pressGestureHandler';
import { SharedStylesProps } from '../Shared.styles';

export interface PressableProps extends SharedStylesProps, NativePressableProps {
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
	...otherProps
}: PressableProps) => {
	const singlePress = createSinglePressGesture(onPress);
	const doublePress = createDoublePressGesture(onDoublePress);
	const longPress = createLongPressGesture(onLongPress);

	return (
		<GestureDetector gesture={Gesture.Exclusive(longPress, doublePress, singlePress)}>
			<StyledNativePressable {...otherProps} style={style}>
				{children}
			</StyledNativePressable>
		</GestureDetector>
	);
};

Pressable.Background = PressableBackground;
Pressable.Opacity = PressableOpacity;
