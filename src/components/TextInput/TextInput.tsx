import React, { useRef } from 'react';
import { TextInput as NativeTextInput } from 'react-native';

import { InputWrapper } from '../InputWrapper';
import { TextInputStylesProps, StyledNativeTextInput } from './TextInput.styles';

interface TextInputProps extends TextInputStylesProps {
	label: string;
	name: string;
	onFocus?: () => void;
	onBlur?: () => void;
}

export const TextInput = ({ label, mb, name, onFocus, onBlur }: TextInputProps) => {
	const inputRef = useRef<NativeTextInput>(null);

	return (
		<InputWrapper label={label} name={name} mb={mb} onBlur={onBlur} onFocus={onFocus}>
			<StyledNativeTextInput blurOnSubmit ref={inputRef} />
		</InputWrapper>
	);
};
