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
	//value: string;
	name: string;
	onValueChange?: () => void;
}

export const TextInput = ({ label, mb, name, onValueChange }: TextInputProps) => {
	const { control, getValues } = useFormContext();
	const inputRef = useRef<NativeTextInput>(null);

	const [isFocused, setIsFocused] = useState(false);

	const [fontSizeAnimated, setFontSizeAnimated] = useState(16);
	const [topAnimated, setTopAnimated] = useState(16);

	console.log(getValues(name));

	useEffect(() => {
		if (
			(getValues(name) !== '' && getValues(name) !== null && getValues(name) !== undefined) ||
			isFocused
		) {
			setIsFocused(true);
		} else if (
			getValues(name) === '' ||
			getValues(name) === null ||
			getValues(name) === undefined
		) {
			setIsFocused(false);
		}
	}, [getValues(name), isFocused]);

	useEffect(() => {
		if (
			isFocused ||
			(getValues(name) !== '' && getValues(name) !== null && getValues(name) !== undefined)
		) {
			animateFocus();
		} else {
			animateBlur();
		}
	}, [isFocused, getValues(name)]);

	function handleFocus() {
		setIsFocused(true);
	}

	function handleBlur() {
		if (getValues(name) === '') {
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
		<Controller
			control={control}
			render={({ field: { onChange, value: fieldValue } }) => (
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
							value={fieldValue}
							ref={inputRef}
							onChangeText={onChange}
						/>
					</TextInputWrap>
				</Pressable>
			)}
			name={name}
		/>
	);
};
