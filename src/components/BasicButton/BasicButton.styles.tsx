import styled from 'styled-components/native';

export interface BasicButtonStylesProps {
	spacing?: number;
	mb?: number;
	vertical?: boolean;
}

export const BasicButtonWrap = styled.View<Required<Pick<BasicButtonStylesProps, 'mb'>>>`
	margin-bottom: ${({ mb }) => mb}px;
`;
export const BasicButtonContent = styled.View<Required<Pick<BasicButtonStylesProps, 'vertical'>>>`
	flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
	align-items: center;
`;

export const IconWrap = styled.View<Pick<BasicButtonStylesProps, 'spacing'>>`
	margin-right: ${({ spacing }) => spacing || 0}px;
`;

export const RightInfoWrap = styled.View`
	margin-left: auto;
`;
