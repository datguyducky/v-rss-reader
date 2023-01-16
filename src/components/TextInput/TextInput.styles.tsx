import styled from 'styled-components/native';
import { TextInput as NativeTextInput } from 'react-native';
import Animated from 'react-native-reanimated';

export interface TextInputStylesProps {
	mb?: number;
}

export const TextInputWrap = styled.View<Required<Pick<TextInputStylesProps, 'mb'>>>`
	margin-bottom: ${({ mb }) => mb}px;
	height: 56px;
	background-color: #f1f3f5;
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

export const StyledNativeTextInput = styled(NativeTextInput)`
	padding-left: 12px;
	font-size: 16px;
	font-family: 'Raleway-Regular';
`;
