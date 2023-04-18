import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export const ThumbnailCardWrap = styled.View<SharedStylesProps>`
	${SharedStyles};
`;

export const StyledImageBackground = styled(FastImage)<{ density: string }>`
	overflow: hidden;
	align-items: center;
	justify-content: center;
	height: ${({ density }) => (density === 'COMFORTABLE' ? 210 : 192)}px;
	background-color: ${({ theme }) => theme.colors.base[4]};
	border-radius: ${({ theme }) => theme.borderRadius.regular}px;
`;

export const ThumbnailTextWrap = styled.View`
	position: absolute;
	bottom: 0;
	margin: ${({ theme }) => theme.spacing.size(1)}px;
`;

export const TitleWrap = styled.View`
	max-height: 63px;
	margin-right: ${({ theme }) => theme.spacing.size(1)}px;
`;
