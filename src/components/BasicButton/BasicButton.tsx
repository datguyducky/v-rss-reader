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

interface BasicButtonProps extends BasicButtonStylesProps {
	children: ReactNode;
	onPress: () => void;
	icon?: ReactNode;
	rightInfo?: ReactNode;
	textSize?: number;
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
}: BasicButtonProps) => {
	return (
		<BasicButtonWrap mb={mb} vertical={vertical}>
			<Pressable onPress={onPress}>
				<BasicButtonContent vertical={vertical}>
					{icon && <IconWrap spacing={spacing}>{icon}</IconWrap>}

					<Text fontFamily="Montserrat" fontSize={textSize}>
						{children}
					</Text>

					{rightInfo && <RightInfoWrap>{rightInfo}</RightInfoWrap>}
				</BasicButtonContent>
			</Pressable>
		</BasicButtonWrap>
	);
};
