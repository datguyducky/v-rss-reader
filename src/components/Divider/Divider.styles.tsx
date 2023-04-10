import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export interface DividerStylesProps {
	size?: number;
	color?: string;
}

export const StyledDivider = styled.View<DividerStylesProps & SharedStylesProps>`
	width: 100%;
	height: ${({ size }) => size || 1}px;
	background-color: ${({ theme, color }) => color || theme.colors.base[3]};

	${SharedStyles};
`;
