import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export const HeaderBackWrap = styled.View<SharedStylesProps>`
	flex-direction: row;
	height: 48px;
	align-items: center;
	padding: ${({ theme }) => `${theme.spacing.size(2)}px ${theme.spacing.size(1.5)}px 0`};
	background-color: ${({ theme }) => theme.colors.base[0]};

	${SharedStyles};
`;

export const BackIconWrap = styled.View`
	height: 32px;
	width: 32px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.base[1]};
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
`;

export const HeaderTextWrap = styled.View`
	margin-left: ${({ theme }) => theme.spacing.size(1.5)}px;
`;
