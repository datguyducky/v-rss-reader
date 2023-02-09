import React, { ReactNode } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

import { Text } from '../Text';
import { StyledNativeTextProps } from '../Text/Text.styles';
import {
	BasicButtonContent,
	BasicButtonStylesProps,
	BasicButtonWrap,
	IconWrap,
	RightInfoWrap,
} from './BasicButton.styles';

interface BasicButtonProps extends BasicButtonStylesProps {
	children: ReactNode;
	onPress: () => void;
	icon?: ReactNode;
	rightInfo?: ReactNode;
	textSize?: number;
	textColor?: string;
	textWeight?: StyledNativeTextProps['weight'];
	style?: StyleProp<ViewStyle>;
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
	style,
}: BasicButtonProps) => {
	return (
		<Pressable onPress={onPress}>
			<BasicButtonWrap mb={mb} style={style}>
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
			</BasicButtonWrap>
		</Pressable>
	);
};
