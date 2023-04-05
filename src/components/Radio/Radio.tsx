import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

import { Text } from '../Text';
import { RadioCircle, RadioStylesProps, RadioWrap, StyledPressable } from './Radio.styles';
import { RadioGroup } from './RadioGroup/RadioGroup';

interface RadioProps extends RadioStylesProps {
	label: string;
	value: string;
	name?: string;
	onValueChange?: () => void;
	pressableStyle?: StyleProp<ViewStyle>;
}

export const Radio = ({ label, mb, name, value, onValueChange, pressableStyle }: RadioProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			render={({ field: { onChange, value: fieldValue } }) => (
				<RadioWrap mb={mb || 0}>
					<StyledPressable
						onPress={() => {
							onChange(value);
							onValueChange?.();
						}}
						style={pressableStyle}
					>
						<RadioCircle isChecked={fieldValue === value} />
						<Text fontFamily="Montserrat">{label}</Text>
					</StyledPressable>
				</RadioWrap>
			)}
			name={name as string}
		/>
	);
};

Radio.Group = RadioGroup;
