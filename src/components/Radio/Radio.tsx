import React from 'react';

import { RadioCircle, RadioStylesProps, RadioWrap, StyledPressable } from './Radio.styles';
import { Text } from '../Text';
import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup } from './RadioGroup/RadioGroup';

interface RadioProps extends RadioStylesProps {
	label: string;
	value: string;
	name?: string;
	onValueChange?: () => void;
}

export const Radio = ({ label, mb, name, value, onValueChange }: RadioProps) => {
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
					>
						<RadioCircle isChecked={fieldValue === value} />
						<Text>{label}</Text>
					</StyledPressable>
				</RadioWrap>
			)}
			name={name as string}
		/>
	);
};

Radio.Group = RadioGroup;
