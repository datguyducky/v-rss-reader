import React, { ReactNode } from 'react';

import { Text } from '../Text';

import {
	BasicButtonContent,
	BasicButtonStylesProps,
	BasicButtonWrap,
	IconWrap,
	RightInfoWrap,
} from './BasicButton.styles';
import { Pressable } from 'react-native';
import { StyledNativeTextProps } from '../Text/Text.styles';

interface BasicButtonProps extends BasicButtonStylesProps {
	children: ReactNode;
	onPress: () => void;
	icon?: ReactNode;
	rightInfo?: ReactNode;
	textSize?: number;
	textColor?: string;
	textWeight?: StyledNativeTextProps['weight'];
}

export const BasicButton = ({
	children,
	onPress,
	icon,
	spacing = 12,
	mb = 0,
	rightInfo,
	textSize,
	vertical = false,
	textColor,
	textWeight,
}: BasicButtonProps) => {
	return (
		<BasicButtonWrap mb={mb}>
			<Pressable onPress={onPress}>
				<BasicButtonContent vertical={vertical}>
					{icon && <IconWrap spacing={spacing}>{icon}</IconWrap>}

					<Text
						fontFamily="Montserrat"
						fontSize={textSize}
						color={textColor}
						weight={textWeight}
					>
						{children}
					</Text>

					{rightInfo && <RightInfoWrap>{rightInfo}</RightInfoWrap>}
				</BasicButtonContent>
			</Pressable>
		</BasicButtonWrap>
	);
};
