import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import {
	createDoublePressGesture,
	createLongPressGesture,
	createSinglePressGesture,
} from '../../../utils/pressGestureHandler';
import { PressableProps } from '../Pressable';
import { StyledNativePressable } from '../Pressable.styles';

interface PressableOpacityProps extends PressableProps {
	activeOpacity?: number;
}

export const PressableOpacity = ({
	onPress,
	onDoublePress,
	onLongPress,
	children,
	style,
	activeOpacity = 0.5,
	px = 0,
	py = 0,
}: PressableOpacityProps) => {
	const singlePress = createSinglePressGesture(onPress);
	const doublePress = createDoublePressGesture(onDoublePress);
	const longPress = createLongPressGesture(onLongPress);

	return (
		<GestureDetector gesture={Gesture.Exclusive(longPress, doublePress, singlePress)}>
			<StyledNativePressable
				px={px}
				py={py}
				style={({ pressed }) => [style || {}, { opacity: pressed ? activeOpacity : 1 }]}
			>
				{children}
			</StyledNativePressable>
		</GestureDetector>
	);
};
