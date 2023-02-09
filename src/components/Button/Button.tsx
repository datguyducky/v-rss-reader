import React, { ReactNode } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

import { Text } from '../Text';
import { ButtonContent, ButtonStylesProps, ButtonWrap } from './Button.styles';

interface ButtonProps extends ButtonStylesProps {
	children: ReactNode;
	onPress: () => void;
	icon?: ReactNode;
	rightInfo?: ReactNode;
	textSize?: number;
	textColor?: string;
	style?: StyleProp<ViewStyle>;
}

export const Button = ({
	children,
	onPress,
	mb = 0,
	textSize,
	textColor,
	style,
	disabled,
	backgroundColor = '#228be6',
	size = 'regular',
	variant = 'filled',
}: ButtonProps) => {
	const selectTextColor = () => {
		// TODO: Use switch here?
		if (disabled) {
			return '#adb5bd';
		}

		if (textColor) {
			return textColor;
		}

		if (variant === 'outline') {
			return '#101113';
		}

		if (variant === 'filled') {
			return '#fff';
		}
	};

	return (
		<Pressable onPress={() => !disabled && onPress()}>
			<ButtonWrap mb={mb} style={style}>
				<ButtonContent
					disabled={disabled}
					backgroundColor={backgroundColor}
					size={size}
					variant={variant}
				>
					<Text
						fontFamily="Montserrat"
						fontSize={textSize}
						color={selectTextColor()}
						weight={600}
					>
						{children}
					</Text>
				</ButtonContent>
			</ButtonWrap>
		</Pressable>
	);
};
