import React, { ForwardedRef, forwardRef } from 'react';
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps } from 'react-native';

import { StyledNativeTextInput, TextInputStylesProps } from './TextInput.styles';
import { InputWrapper } from '../InputWrapper';
import { SharedStylesProps } from '../Shared.styles';

interface TextInputProps extends SharedStylesProps, TextInputStylesProps {
	label: string;
	name: string;
	onFocus?: () => void;
	onBlur?: () => void;
	autoCapitalize?: NativeTextInputProps['autoCapitalize'];
}

export const TextInput = forwardRef(
	(
		{ label, name, onFocus, onBlur, autoCapitalize, ...otherProps }: TextInputProps,
		ref: ForwardedRef<NativeTextInput>,
	) => {
		return (
			<InputWrapper
				{...otherProps}
				label={label}
				name={name}
				onBlur={onBlur}
				onFocus={onFocus}
			>
				<StyledNativeTextInput blurOnSubmit autoCapitalize={autoCapitalize} ref={ref} />
			</InputWrapper>
		);
	},
);
