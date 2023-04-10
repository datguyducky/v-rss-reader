import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';

import { ButtonContent, ButtonStylesProps, ButtonWrap } from './Button.styles';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface ButtonProps extends SharedStylesProps, ButtonStylesProps {
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
	textSize,
	textColor,
	style,
	disabled,
	backgroundColor,
	size = 'regular',
	variant = 'filled',
	...otherProps
}: ButtonProps) => {
	const theme = useTheme();
	const selectTextColor = () => {
		switch (true) {
			case disabled:
				return theme.colors.base[5];
			case !!textColor:
				return textColor;
			case variant === 'outline':
				return theme.colors.text;
			case variant === 'filled':
				return theme.colors.base[0];
			default:
				return undefined;
		}
	};

	return (
		<ButtonWrap {...otherProps} style={style}>
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
