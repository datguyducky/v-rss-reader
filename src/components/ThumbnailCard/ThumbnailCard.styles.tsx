import styled from 'styled-components/native';

export const ThumbnailCardWrap = styled.View``;

export const StyledImageBackground = styled.ImageBackground<{ density: string }>`
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
