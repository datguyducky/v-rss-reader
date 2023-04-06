import styled from 'styled-components/native';

export interface DividerStylesProps {
	size?: number;
	color?: string;
	my?: number;
}

export const StyledDivider = styled.View<DividerStylesProps>`
	width: 100%;
	height: ${({ size }) => size || 1}px;
	background-color: ${({ theme, color }) => color || theme.colors.base[3]};
	margin: ${({ my }) => my || 0}px 0;
`;
