import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Pressable } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { Text } from '../Text';
import {
	ContentWithLabelWrap,
	InputWrapperContainer,
	InputWrapperStylesProps,
	AbsoluteAnimatedView,
	AnimatedLabel,
} from './InputWrapper.styles';

interface TextInputProps extends InputWrapperStylesProps {
	label: string;
	name: string;
	children: React.ReactElement;
	onFocus?: () => void;
	onBlur?: () => void;
}

export const InputWrapper = ({ label, mb, name, onFocus, onBlur, children }: TextInputProps) => {
	const { control, getValues } = useFormContext();
	const inputRef = useRef<unknown>(null);

	const [isFocused, setIsFocused] = useState(false);

	const [fontSizeAnimated, setFontSizeAnimated] = useState(16);
	const [topAnimated, setTopAnimated] = useState(12);

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
		onFocus?.();
	}

	function handleBlur() {
		if (getValues(name) === '') {
			setIsFocused(false);
			onBlur?.();
		}
	}

	function animateFocus() {
		setFontSizeAnimated(10);
		setTopAnimated(0);
	}

	function animateBlur() {
		setFontSizeAnimated(16);
		setTopAnimated(12);
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
			name={name}
			render={({ field: { onChange, value: fieldValue }, fieldState: { error } }) => (
				<Pressable onPress={() => inputRef?.current?.focus()}>
					<InputWrapperContainer mb={mb || 0}>
						<ContentWithLabelWrap isInvalid={!!error?.message}>
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

							{React.cloneElement(children, {
								onFocus: handleFocus,
								onBlur: handleBlur,
								value: fieldValue,
								onChangeText: onChange,
								isInvalid: !!error?.message,
							})}
						</ContentWithLabelWrap>

						{error?.message && (
							<Text
								color="#fa5252"
								fontSize={12}
								weight={400}
								style={{ marginTop: 4 }}
							>
								{error.message}
							</Text>
						)}
					</InputWrapperContainer>
				</Pressable>
			)}
		/>
	);
};
