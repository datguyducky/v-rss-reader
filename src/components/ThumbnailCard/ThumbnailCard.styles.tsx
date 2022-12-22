import styled from 'styled-components/native';

export interface ThumbnailCardStylesProps {
	mb?: number;
}

export const ThumbnailCardWrap = styled.View<Required<Pick<ThumbnailCardStylesProps, 'mb'>>>`
	margin-bottom: ${({ mb }) => mb}px;
`;

export const StyledImageBackground = styled.ImageBackground`
	height: 192px;
	background-color: #d9d9d9;
	margin-right: 8px;
	border-radius: 6px;
	overflow: hidden;
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
