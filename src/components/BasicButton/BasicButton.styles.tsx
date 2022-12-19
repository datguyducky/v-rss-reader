import styled from 'styled-components/native';

export interface BasicButtonStylesProps {
	spacing?: number;
	marginBottom?: number;
}

export const BasicButtonWrap = styled.View<Pick<BasicButtonStylesProps, 'marginBottom'>>`
	margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
`;
export const BasicButtonContent = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const IconWrap = styled.View<Pick<BasicButtonStylesProps, 'spacing'>>`
	margin-right: ${({ spacing }) => spacing || 0}px;
`;

export const RightInfoWrap = styled.View`
	margin-left: auto;
`;
