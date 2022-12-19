import { DividerStylesProps, StyledDivider } from './Divider.styles';

interface DividerProps extends DividerStylesProps {}

export const Divider = ({ color, size, my }: DividerProps) => {
	return <StyledDivider color={color} size={size} my={my} />;
};
