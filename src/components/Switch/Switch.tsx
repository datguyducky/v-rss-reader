import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import {
	AnimatedSwitch,
	AnimatedSwitchThumb,
	PressableSwitchWrap,
	SwitchLabel,
	SwitchStylesProps,
} from './Switch.styles';

interface SwitchProps extends SwitchStylesProps {
	name: string;
	label?: string;
	onValueChange?: () => void;
}

export const Switch = ({ name, label, onValueChange, mb }: SwitchProps) => {
	const { control, getValues } = useFormContext();

	const [internalValue, setInternalValue] = useState(getValues(name) || false);
	const switchAnimated = useSharedValue(0);

	useEffect(() => {
		if (internalValue) {
			switchAnimated.value = withSpring(21, {
				mass: 1,
				damping: 15,
				stiffness: 120,
				overshootClamping: false,
				restSpeedThreshold: 0.001,
				restDisplacementThreshold: 0.001,
			});
		} else {
			switchAnimated.value = withSpring(0, {
				mass: 1,
				damping: 15,
				stiffness: 120,
				overshootClamping: false,
				restSpeedThreshold: 0.001,
				restDisplacementThreshold: 0.001,
			});
		}
	}, [internalValue, switchAnimated]);

	const backgroundColorStyles = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(switchAnimated.value, [0, 21], ['#E9ECEF', '#228BE6']),
	}));

	const translateStyles = useAnimatedStyle(() => ({
		transform: [{ translateX: switchAnimated.value }],
	}));

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value: fieldValue } }) => (
				<PressableSwitchWrap
					onPress={() => {
						setInternalValue(!fieldValue);

						onChange(!fieldValue);
						onValueChange?.();
					}}
					mb={mb}
				>
					{label && <SwitchLabel>{label}</SwitchLabel>}

					<AnimatedSwitch style={backgroundColorStyles}>
						<AnimatedSwitchThumb style={translateStyles} />
					</AnimatedSwitch>
				</PressableSwitchWrap>
			)}
		/>
	);
};
