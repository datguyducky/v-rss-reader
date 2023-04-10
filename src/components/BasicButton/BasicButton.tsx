import { ReactNode, ReactElement, cloneElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import {
	BasicButtonContent,
	BasicButtonStylesProps,
	BasicButtonWrap,
	IconWrap,
	RightInfoWrap,
} from './BasicButton.styles';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';
import { StyledNativeTextProps } from '../Text/Text.styles';

interface BasicButtonProps extends SharedStylesProps, BasicButtonStylesProps {
	children: ReactNode;
	onPress: () => void;
	icon?: ReactNode;
	rightInfo?: ReactNode;
	textSize?: number;
	textColor?: string;
	textWeight?: StyledNativeTextProps['weight'];
	style?: StyleProp<ViewStyle>;
	pressableComponent?: ReactElement;
}

export const BasicButton = ({
	children,
	onPress,
	icon,
	spacing = 12,
	rightInfo,
	textSize,
	vertical = false,
	textColor,
	textWeight,
	style,
	pressableComponent = <Pressable />,
	...otherProps
}: BasicButtonProps) => {
	return (
		<BasicButtonWrap {...otherProps} style={style}>
			{cloneElement(pressableComponent, {
				onPress,
				children: (
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
				),
			})}
		</BasicButtonWrap>
	);
};
