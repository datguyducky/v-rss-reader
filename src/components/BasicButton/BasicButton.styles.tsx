import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export interface BasicButtonStylesProps {
	spacing?: number;
	vertical?: boolean;
}

export const BasicButtonWrap = styled.View<SharedStylesProps>`
	${SharedStyles};
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
