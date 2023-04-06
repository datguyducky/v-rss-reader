import styled from 'styled-components/native';

import { Text } from '../Text';

export const MagazineCardWrap = styled.View`
	background-color: ${({ theme }) => theme.colors.base[0]};
`;

export const StyledImage = styled.ImageBackground<{ density: string }>`
	justify-content: center;
	align-items: center;
	overflow: hidden;
	width: ${({ density }) => (density === 'COMFORTABLE' ? 100 : 64)}px;
	height: ${({ density }) => (density === 'COMFORTABLE' ? 100 : 64)}px;
	background-color: ${({ theme }) => theme.colors.base[4]};
	margin-right: ${({ theme }) => theme.spacing.size(1)}px;
	border-radius: ${({ theme }) => theme.borderRadius.regular}px;
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
