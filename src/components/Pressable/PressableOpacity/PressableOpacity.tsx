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
} from '../../../utils/pressGestureHandler';

interface PressableProps extends NativePressableProps {
	onPress?: () => void;
	onLongPress?: () => void;
	onDoublePress?: () => void;
	activeOpacity?: number;
	style?: StyleProp<ViewStyle>;
}

export const PressableOpacity = ({
	onPress,
	onDoublePress,
	onLongPress,
	children,
	style,
	activeOpacity = 0.2,
}: PressableProps) => {
	const singlePress = createSinglePressGesture(onPress);
	const doublePress = createDoublePressGesture(onDoublePress);
	const longPress = createLongPressGesture(onLongPress);

	return (
		<GestureDetector gesture={Gesture.Exclusive(longPress, doublePress, singlePress)}>
			<NativePressable style={({ pressed }) => [style || {}, { opacity: pressed ? 0.5 : 1 }]}>
				{children}
			</NativePressable>
		</GestureDetector>
	);
};
