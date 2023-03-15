import styled from 'styled-components/native';

export const HeaderBackWrap = styled.View<{ marginTop?: number; width?: number }>`
	flex-direction: row;
	height: 48px;
	align-items: center;
	padding: 16px 12px 0;
	background-color: #fff;
`;

export const BackIconWrap = styled.View`
	height: 32px;
	width: 32px;
	background-color: #f1f3f5;
	align-items: center;
	justify-content: center;
	border-radius: 26px;
`;

export const HeaderTextWrap = styled.View`
	margin-left: 12px;
`;
