import { Animated, StyleProp, ViewStyle } from 'react-native';

import { Heading } from '../Heading';
import { StyledNativeHeadingTextProps } from '../Heading/Heading.styles';
import { SharedStylesProps } from '../Shared.styles';

interface HeadingAnimatedProps extends SharedStylesProps {
	scrollY: any;
	title: string;
	action: 'hide' | 'unhide';
	tag: StyledNativeHeadingTextProps['tag'];
	style?: StyleProp<ViewStyle>;
}

export const HeadingAnimated = ({
	scrollY,
	title,
	action,
	tag,
	style,
	...otherProps
}: HeadingAnimatedProps) => {
	return (
		<Animated.View
			style={[
				style || {},
				{
					opacity: scrollY.interpolate({
						inputRange: [0, 28],
						outputRange: action === 'unhide' ? [0, 1] : [1, 0],
						extrapolate: 'clamp',
					}),
				},
			]}
		>
			<Heading {...otherProps} tag={tag}>
				{title}
			</Heading>
		</Animated.View>
	);
};
