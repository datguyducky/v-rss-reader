import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export const HeaderWrap = styled.View<SharedStylesProps>`
	flex-direction: row;
	height: auto;
	align-items: center;
	padding: ${({ theme }) => `${theme.spacing.size(2)}px ${theme.spacing.size(1.5)}px 0`};
	background-color: ${({ theme }) => theme.colors.base[0]};

	${SharedStyles};
`;

export const HeaderTextWrap = styled.View``;
