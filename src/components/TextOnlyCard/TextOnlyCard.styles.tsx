import styled from 'styled-components/native';

export interface TextOnlyCardStylesProps {
	mb?: number;
}

export const TextOnlyCardWrap = styled.View<Required<Pick<TextOnlyCardStylesProps, 'mb'>>>`
	margin-bottom: ${({ mb }) => mb}px;
`;

export const StyledPressable = styled.Pressable`
	flex-direction: row;
`;

export const TextOnlyTextWrap = styled.View`
	flex: 1 0 0;
`;

export const TitleWrap = styled.View`
	max-height: 63px;
	margin-bottom: 4px;
`;

export const DetailsWrap = styled.View`
	margin-top: auto;
`;
