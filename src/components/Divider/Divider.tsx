import { StyleProp, ViewStyle } from 'react-native';

import { DividerStylesProps, StyledDivider } from './Divider.styles';
import { SharedStylesProps } from '../Shared.styles';

interface DividerProps extends SharedStylesProps, DividerStylesProps {
	style?: StyleProp<ViewStyle>;
}

export const Divider = ({ color, size, style, ...otherProps }: DividerProps) => {
	return <StyledDivider {...otherProps} color={color} size={size} style={style} />;
};
