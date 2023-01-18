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
}: ButtonProps) => {
	return (
		<ButtonWrap mb={mb} style={style}>
			<Pressable onPress={() => !disabled && onPress()}>
				<ButtonContent disabled={disabled}>
					<Text
						fontFamily="Montserrat"
						fontSize={textSize}
						color={disabled ? '#adb5bd' : textColor || '#fff'}
						weight={600}
					>
						{children}
					</Text>
				</ButtonContent>
			</Pressable>
		</ButtonWrap>
	);
};
