import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

import { RadioCircle, RadioWrap, StyledPressable } from './Radio.styles';
import { RadioGroup } from './RadioGroup/RadioGroup';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface RadioProps extends SharedStylesProps {
	label: string;
	value: string;
	name?: string;
	onValueChange?: () => void;
	pressableStyle?: StyleProp<ViewStyle>;
}

export const Radio = ({
	label,
	name,
	value,
	onValueChange,
	pressableStyle,
	...otherProps
}: RadioProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			render={({ field: { onChange, value: fieldValue } }) => (
				<RadioWrap {...otherProps}>
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
