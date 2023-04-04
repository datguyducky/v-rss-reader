import { ReactNode, ReactElement, cloneElement } from 'react';
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
	pressableComponent?: ReactElement;
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
	pressableComponent = <Pressable />,
}: BasicButtonProps) => {
	return (
		<BasicButtonWrap mb={mb} style={style}>
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
