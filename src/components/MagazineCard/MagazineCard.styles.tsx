import styled from 'styled-components/native';

export interface MagazineCardStylesProps {
	mb?: number;
}

export const MagazineCardWrap = styled.View<Required<Pick<MagazineCardStylesProps, 'mb'>>>`
	margin-bottom: ${({ mb }) => mb}px;
`;

export const StyledPressable = styled.Pressable`
	flex-direction: row;
`;

export const StyledImage = styled.Image`
	width: 64px;
	height: 64px;
	background-color: #d9d9d9;
	margin-right: 8px;
	border-radius: 6px;
`;

export const MagazineTextWrap = styled.View`
	flex: 1 0 0;
`;

export const TitleWrap = styled.View`
	height: 42px;
`;

export const DetailsWrap = styled.View`
	margin-top: auto;
`;
