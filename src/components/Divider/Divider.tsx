import { StyleProp, ViewStyle } from 'react-native';

import { DividerStylesProps, StyledDivider } from './Divider.styles';

interface DividerProps extends DividerStylesProps {
	style?: StyleProp<ViewStyle>;
}

export const Divider = ({ color, size, my, style }: DividerProps) => {
	return <StyledDivider color={color} size={size} my={my} style={style} />;
};
