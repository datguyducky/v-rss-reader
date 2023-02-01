import styled from 'styled-components/native';

export interface BasicSelectStylesProps {
	mb?: number;
}

export const BasicSelectContainer = styled.Pressable<Pick<BasicSelectStylesProps, 'mb'>>`
	flex-direction: row;
	align-items: center;
	margin-bottom: ${({ mb }) => mb || 0}px;
`;

export const StyledScrollView = styled.ScrollView`
	margin-top: 16px;
	margin-bottom: 24px;
`;
