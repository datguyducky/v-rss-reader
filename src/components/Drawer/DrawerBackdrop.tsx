import React, { useCallback, useMemo } from 'react';
import { BottomSheetBackdropProps, useBottomSheet } from '@gorhom/bottom-sheet';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler } from 'react-native-reanimated';

export const DrawerBackdrop = (props: BottomSheetBackdropProps) => {
	const { close } = useBottomSheet();

	const containerStyle = useMemo(
		() => [
			props.style,
			{
				backgroundColor: '#000000',
				opacity: 0.4,
			},
		],
		[props?.style],
	);

	const handleOnPress = useCallback(() => {
		close();
	}, [close]);

	const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
		{
			onFinish: () => {
				runOnJS(handleOnPress)();
			},
		},
		[handleOnPress],
	);

	return (
		<TapGestureHandler onGestureEvent={gestureHandler}>
			<Animated.View style={containerStyle} />
		</TapGestureHandler>
	);
};
