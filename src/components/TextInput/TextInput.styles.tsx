import { TextInput as NativeTextInput } from 'react-native';
import styled from 'styled-components/native';

export interface TextInputStylesProps {
	mb?: number;
	isInvalid?: boolean;
}

export const StyledNativeTextInput = styled(NativeTextInput)<
	Pick<TextInputStylesProps, 'isInvalid'>
>`
	padding-left: 12px;
	font-size: 16px;
	font-family: 'Raleway-Regular';
	color: ${({ isInvalid }) => (isInvalid ? '#fa5252' : '#101113')};
`;
