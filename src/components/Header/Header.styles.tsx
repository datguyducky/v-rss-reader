import styled from 'styled-components/native';

export const HeaderWrap = styled.View<{ marginTop?: number; width?: number }>`
	flex-direction: row;
	height: auto;
	align-items: center;
	padding: ${({ theme }) => `${theme.spacing.size(2)}px ${theme.spacing.size(1.5)}px 0`};
	background-color: ${({ theme }) => theme.colors.base[0]};
`;

export const HeaderTextWrap = styled.View``;
