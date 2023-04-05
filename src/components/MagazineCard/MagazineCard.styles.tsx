import styled from 'styled-components/native';

import { Text } from '../Text';

export const MagazineCardWrap = styled.View`
	background-color: #fff;
	border-radius: 6px;
`;

export const StyledImage = styled.ImageBackground<{ density: string }>`
	width: ${({ density }) => (density === 'COMFORTABLE' ? 100 : 64)}px;
	height: ${({ density }) => (density === 'COMFORTABLE' ? 100 : 64)}px;
	background-color: #d9d9d9;
	margin-right: 8px;
	border-radius: 6px;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

export const MagazineTextWrap = styled.View`
	flex: 1 0 0;
`;

export const TitleWrap = styled.View<{ density: string }>`
	${({ density }) => density !== 'COMFORTABLE' && 'height: 48px;'}
	${({ density }) => density === 'COMFORTABLE' && 'max-height: 48px;'}
`;

export const TitleText = styled(Text)<{ density: string }>`
	${({ density }) => density === 'COMFORTABLE' && 'line-height: 14px;'}
`;

export const DetailsWrap = styled.View<{ density: string }>`
	${({ density }) => density !== 'COMFORTABLE' && 'margin-top: auto;'}
`;
