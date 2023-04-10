import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export interface InputWrapperStylesProps {
	isInvalid?: boolean;
}
export const InputWrapperContainer = styled.View<SharedStylesProps>`
	${SharedStyles};
`;

export const ContentWithLabelWrap = styled.View<
	Required<Pick<InputWrapperStylesProps, 'isInvalid'>>
>`
	height: 56px;
	border-width: 1px;
	border-style: solid;
	position: relative;
	justify-content: center;
	border-radius: ${({ theme }) => theme.borderRadius.small}px;
	color: ${({ theme }) => theme.colors.text};
	background-color: ${({ theme }) => theme.colors.base[1]};
	border-color: ${({ theme, isInvalid }) => (isInvalid ? theme.colors.error : 'transparent')};
`;

export const AbsoluteAnimatedView = styled.View`
	position: absolute;
	z-index: 10;
	top: 0;
	bottom: 0;
	left: ${({ theme }) => theme.spacing.size(1.5)}px;
`;

export const AnimatedLabel = styled(Animated.Text)`
	font-size: 16px;
	font-family: ${({ theme }) => theme.font.retrieve('Montserrat', 500)};
	color: ${({ theme }) => theme.colors.base[5]};
`;
