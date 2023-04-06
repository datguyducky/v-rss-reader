import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Pressable } from '../Pressable';
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
	backgroundColor,
	size = 'regular',
	variant = 'filled',
}: ButtonProps) => {
	const theme = useTheme();
	const selectTextColor = () => {
		switch (true) {
			case disabled:
				return theme.colors.base[5];
			case !!textColor:
				return textColor;
			case variant === 'outline':
				return theme.colors.base[9];
			case variant === 'filled':
				return theme.colors.base[0];
			default:
				return undefined;
		}
	};

	return (
		<ButtonWrap mb={mb} style={style}>
			<Pressable.Background onPress={() => !disabled && onPress()}>
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
			</Pressable.Background>
		</ButtonWrap>
	);
};
