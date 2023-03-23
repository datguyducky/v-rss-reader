import styled from 'styled-components/native';

export const ThumbnailCardWrap = styled.View``;

export const StyledImageBackground = styled.ImageBackground<{ density: string }>`
	height: ${({ density }) => (density === 'COMFORTABLE' ? 210 : 192)}px;
	background-color: #d9d9d9;
	border-radius: 6px;
	overflow: hidden;
	align-items: center;
	justify-content: center;
`;

export const ThumbnailTextWrap = styled.View`
	position: absolute;
	bottom: 0;
	margin: 8px;
`;

export const TitleWrap = styled.View`
	max-height: 63px;
	margin-right: 8px;
`;
