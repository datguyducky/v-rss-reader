import React, { ReactNode } from 'react';

import { Text } from '../Text';

import {
	BasicButtonContent,
	BasicButtonStylesProps,
	BasicButtonWrap,
	IconWrap,
} from './BasicButton.styles';
import { Pressable } from 'react-native';

interface BasicButtonProps extends BasicButtonStylesProps {
	children: ReactNode;
	onPress: () => void;
	icon?: ReactNode;
}

export const BasicButton = ({
	children,
	onPress,
	icon,
	spacing = 12,
	marginBottom = 0,
}: BasicButtonProps) => {
	return (
		<BasicButtonWrap marginBottom={marginBottom}>
			<Pressable onPress={onPress}>
				<BasicButtonContent>
					{icon && <IconWrap spacing={spacing}>{icon}</IconWrap>}

					<Text fontFamily="Montserrat">{children}</Text>
				</BasicButtonContent>
			</Pressable>
		</BasicButtonWrap>
	);
};
