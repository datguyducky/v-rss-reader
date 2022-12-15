import styled from 'styled-components/native';

export const HeaderWrap = styled.View<{ marginTop?: number; width?: number }>`
	flex-direction: row;
	height: auto;
	margin-top: ${({ marginTop }) => marginTop}px;
	align-items: center;
	padding: 16px 12px;
	padding-bottom: 0px;
`;

export const HeaderTextWrap = styled.View``;

export const IconWrap = styled.View`
	margin-left: auto;
`;
