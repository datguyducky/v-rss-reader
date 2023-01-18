import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export interface InputWrapperStylesProps {
	mb?: number;
	isInvalid?: boolean;
}
export const InputWrapperContainer = styled.View<Required<Pick<InputWrapperStylesProps, 'mb'>>>`
	margin-bottom: ${({ mb }) => mb}px;
`;

export const ContentWithLabelWrap = styled.View<
	Required<Pick<InputWrapperStylesProps, 'isInvalid'>>
>`
	height: 56px;
	background-color: #f1f3f5;
	border-width: 1px;
	border-style: solid;
	border-color: ${({ isInvalid }) => (isInvalid ? '#fa5252' : 'transparent')};
	border-radius: 4px;
	color: #101113;
	position: relative;
	justify-content: center;
`;

export const AbsoluteAnimatedView = styled.View`
	position: absolute;
	z-index: 10;
	top: 0;
	bottom: 0;
	left: 12px;
`;

export const AnimatedLabel = styled(Animated.Text)`
	font-size: 16px;
	color: #adb5bd;
	font-family: 'Raleway-Medium';
`;
