import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Pressable, TextInput as NativeTextInput } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import {
	TextInputStylesProps,
	StyledNativeTextInput,
	TextInputWrap,
	AnimatedLabel,
	AbsoluteAnimatedView,
} from './TextInput.styles';

interface TextInputProps extends TextInputStylesProps {
	label: string;
	value: string;
	name?: string;
	onValueChange?: () => void;
}

export const TextInput = ({ label, mb, name, onValueChange }: TextInputProps) => {
	//const { control } = useFormContext();
	const inputRef = useRef<NativeTextInput>(null);
	const [value, setValue] = useState('');

	const [isFocused, setIsFocused] = useState(false);

	const [fontSizeAnimated, setFontSizeAnimated] = useState(16);
	const [topAnimated, setTopAnimated] = useState(16);

	const onChangeText = (text: string) => {
		setValue(text);
	};

	useEffect(() => {
		if (value !== '' || isFocused) {
			setIsFocused(true);
		} else if (value === '' || value === null) {
			setIsFocused(false);
		}
	}, [value, isFocused]);

	useEffect(() => {
		if (isFocused || value !== '') {
			animateFocus();
		} else {
			animateBlur();
		}
	}, [isFocused, value]);

	function handleFocus() {
		setIsFocused(true);
	}

	function handleBlur() {
		if (value === '') {
			setIsFocused(false);
		}
	}

	function animateFocus() {
		setFontSizeAnimated(10);
		setTopAnimated(0);
	}

	function animateBlur() {
		setFontSizeAnimated(16);
		setTopAnimated(16);
	}

	const textAnimatedStyles = useAnimatedStyle(() => {
		return {
			fontSize: withTiming(fontSizeAnimated, {
				duration: 200,
				easing: Easing.in(Easing.ease),
			}),
		};
	});

	const topAnimatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: withTiming(topAnimated, {
						duration: 200,
						easing: Easing.in(Easing.ease),
					}),
				},
			],
		};
	});

	return (
		<Pressable onPress={() => inputRef?.current?.focus()}>
			<TextInputWrap mb={mb || 0}>
				<AbsoluteAnimatedView>
					<Animated.View
						style={{
							...topAnimatedStyles,
						}}
					>
						<AnimatedLabel
							style={{
								...textAnimatedStyles,
							}}
						>
							{label}
						</AnimatedLabel>
					</Animated.View>
				</AbsoluteAnimatedView>
				<StyledNativeTextInput
					onFocus={handleFocus}
					onBlur={handleBlur}
					blurOnSubmit
					value={value}
					ref={inputRef}
					onChangeText={(text: string) => onChangeText(text)}
				/>
			</TextInputWrap>
		</Pressable>
	);
};
