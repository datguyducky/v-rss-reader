import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import {
	AbsoluteAnimatedView,
	AnimatedLabel,
	ContentWithLabelWrap,
	InputWrapperContainer,
	InputWrapperStylesProps,
} from './InputWrapper.styles';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface TextInputProps extends SharedStylesProps, InputWrapperStylesProps {
	label: string;
	name: string;
	children: React.ReactElement;
	onFocus?: () => void;
	onBlur?: () => void;
	onPress?: () => void;
	forceUnfocus?: boolean;
}

export const InputWrapper = ({
	label,
	name,
	onFocus,
	onBlur,
	children,
	onPress,
	forceUnfocus,
	...otherProps
}: TextInputProps) => {
	const inputRef = useRef(null);

	const { control, getValues } = useFormContext();

	const [isFocused, setIsFocused] = useState(false);

	const [fontSizeAnimated, setFontSizeAnimated] = useState(16);
	const [topAnimated, setTopAnimated] = useState(12);

	// TODO: Not sure if this is my favourite solution this, as it looks a little bit weird
	// especially that this prop is passed as one value and then set to an opposite one
	useEffect(() => {
		if (forceUnfocus) {
			setIsFocused(!forceUnfocus);
		}
	}, [forceUnfocus]);

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
		if (getValues(name) === '' || getValues(name) === null || getValues(name) === undefined) {
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
				<Pressable onPress={() => onPress?.()}>
					<InputWrapperContainer {...otherProps}>
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
										onPress={() => {
											inputRef?.current?.focus();
											handleFocus();
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
								ref: inputRef,
							})}
						</ContentWithLabelWrap>

						{error?.message && (
							<Text
								color="#fa5252"
								fontSize={12}
								weight={300}
								mt={0.5}
								fontFamily="Montserrat"
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
