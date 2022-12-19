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
}

export const BasicButton = ({
	children,
	onPress,
	icon,
	spacing = 12,
	marginBottom = 0,
	rightInfo,
}: BasicButtonProps) => {
	return (
		<BasicButtonWrap marginBottom={marginBottom}>
			<Pressable onPress={onPress}>
				<BasicButtonContent>
					{icon && <IconWrap spacing={spacing}>{icon}</IconWrap>}

					<Text fontFamily="Montserrat">{children}</Text>

					{rightInfo && <RightInfoWrap>{rightInfo}</RightInfoWrap>}
				</BasicButtonContent>
			</Pressable>
		</BasicButtonWrap>
	);
};
