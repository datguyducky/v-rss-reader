import React, { ForwardedRef, forwardRef, useRef } from 'react';
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps } from 'react-native';

import { InputWrapper } from '../InputWrapper';
import { TextInputStylesProps, StyledNativeTextInput } from './TextInput.styles';

interface TextInputProps extends TextInputStylesProps {
	label: string;
	name: string;
	onFocus?: () => void;
	onBlur?: () => void;
	autoCapitalize?: NativeTextInputProps['autoCapitalize'];
}

export const TextInput = forwardRef(
	(
		{ label, mb, name, onFocus, onBlur, autoCapitalize }: TextInputProps,
		ref: ForwardedRef<NativeTextInput>,
	) => {
		return (
			<InputWrapper label={label} name={name} mb={mb} onBlur={onBlur} onFocus={onFocus}>
				<StyledNativeTextInput blurOnSubmit autoCapitalize={autoCapitalize} ref={ref} />
			</InputWrapper>
		);
	},
);
