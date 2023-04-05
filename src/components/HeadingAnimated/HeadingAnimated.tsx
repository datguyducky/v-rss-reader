import { Animated, StyleProp, ViewStyle } from 'react-native';

import { Heading } from '../Heading';
import { StyledNativeHeadingTextProps } from '../Heading/Heading.styles';

type HeadingAnimatedProps = {
	scrollY: any;
	title: string;
	action: 'hide' | 'unhide';
	tag: StyledNativeHeadingTextProps['tag'];
	mb?: number;
	style?: StyleProp<ViewStyle>;
};

export const HeadingAnimated = ({
	scrollY,
	title,
	action,
	tag,
	mb,
	style,
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
			<Heading tag={tag} mb={mb}>
				{title}
			</Heading>
		</Animated.View>
	);
};
