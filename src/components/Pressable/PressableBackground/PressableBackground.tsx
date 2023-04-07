import { ColorValue } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';

import {
	createDoublePressGesture,
	createLongPressGesture,
	createSinglePressGesture,
} from '../../../utils/pressGestureHandler';
import { PressableProps } from '../Pressable';
import { StyledNativePressable } from '../Pressable.styles';

interface PressableBackgroundProps extends PressableProps {
	underlayColor?: ColorValue;
	foreground?: boolean;
	borderless?: boolean;
}

export const PressableBackground = ({
	onPress,
	onDoublePress,
	onLongPress,
	children,
	style,
	underlayColor, // TODO: Figure if this needs to be in theme colors object.
	foreground = true,
	borderless = false,
	px = 0,
	py = 0,
}: PressableBackgroundProps) => {
	const theme = useTheme();

	const singlePress = createSinglePressGesture(onPress);
	const doublePress = createDoublePressGesture(onDoublePress);
	const longPress = createLongPressGesture(onLongPress);

	return (
		<GestureDetector gesture={Gesture.Exclusive(longPress, doublePress, singlePress)}>
			<StyledNativePressable
				px={px}
				py={py}
				style={style}
				android_ripple={{
					color: underlayColor || theme.colors.pressableBackground,
					foreground,
					borderless,
				}}
			>
				{children}
			</StyledNativePressable>
		</GestureDetector>
	);
};
