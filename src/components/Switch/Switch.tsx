import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import { Pressable } from '../Pressable';
import {
	AnimatedSwitch,
	AnimatedSwitchThumb,
	SwitchLabel,
	SwitchStylesProps,
	SwitchWrap,
} from './Switch.styles';

interface SwitchProps extends SwitchStylesProps {
	name: string;
	label?: string;
	onValueChange?: () => void;
}

export const Switch = ({ name, label, onValueChange, mb }: SwitchProps) => {
	const theme = useTheme();
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
		backgroundColor: interpolateColor(
			switchAnimated.value,
			[0, 21],
			[theme.colors.base[2], theme.colors.primary],
		),
	}));

	const translateStyles = useAnimatedStyle(() => ({
		transform: [{ translateX: switchAnimated.value }],
	}));

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value: fieldValue } }) => (
				<Pressable
					onPress={() => {
						setInternalValue(!fieldValue);

						onChange(!fieldValue);
						onValueChange?.();
					}}
				>
					<SwitchWrap mb={mb}>
						{label && <SwitchLabel fontFamily="Montserrat">{label}</SwitchLabel>}

						<AnimatedSwitch style={backgroundColorStyles}>
							<AnimatedSwitchThumb style={translateStyles} />
						</AnimatedSwitch>
					</SwitchWrap>
				</Pressable>
			)}
		/>
	);
};
