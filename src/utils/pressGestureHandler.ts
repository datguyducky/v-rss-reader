import { Gesture } from 'react-native-gesture-handler';

export function createSinglePressGesture(onPress?: () => void) {
	return Gesture.Tap()
		.runOnJS(true)
		.maxDuration(250)
		.onStart(event => {
			onPress?.();
		});
}

export function createDoublePressGesture(onDoublePress?: () => void) {
	return Gesture.Tap()
		.runOnJS(true)
		.maxDuration(250)
		.numberOfTaps(2)
		.onStart(() => {
			onDoublePress?.();
		});
}

export function createLongPressGesture(onLongPress?: () => void) {
	return Gesture.LongPress()
		.runOnJS(true)
		.onStart(e => {
			if (e.duration >= 500) {
				onLongPress?.();
			}
		});
}
