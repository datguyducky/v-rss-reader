import { TextInput as NativeTextInput } from 'react-native';
import styled from 'styled-components/native';

export interface TextInputStylesProps {
	isInvalid?: boolean;
}

export const StyledNativeTextInput = styled(NativeTextInput)<
	Pick<TextInputStylesProps, 'isInvalid'>
>`
	font-size: 16px;
	font-family: ${({ theme }) => theme.font.retrieve('Raleway', 400)};
	padding-left: ${({ theme }) => theme.spacing.size(1.5)}px;
	color: ${({ theme, isInvalid }) => (isInvalid ? theme.colors.error : theme.colors.text)};
`;
