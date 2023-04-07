import React, { ReactNode, Children, isValidElement } from 'react';
import {
	Animated,
	FlatList,
	StyleProp,
	ViewStyle,
	ScrollView,
	ScrollViewProps,
	FlatListProps,
} from 'react-native';
import styled from 'styled-components/native';

import { Heading } from '../components/Heading';
import { HeadingAnimated } from '../components/HeadingAnimated';
import { theme } from '../theme';

interface LayoutProps {
	children: ReactNode;
	scrollY?: any;
	title?: string;
	animatedTitle?: string;
	style?: StyleProp<ViewStyle>;
	horizontalPadding?: boolean;
	headingSpacing?: number;
	bottomPadding?: number;
}

const StyledLayout = styled.View<{
	withAnimatedTitle: boolean;
	horizontalPadding: boolean;
	bottomPadding: number;
}>`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.base[0]};
	padding: ${({ theme, withAnimatedTitle, horizontalPadding }) =>
			withAnimatedTitle ? theme.spacing.size(1) : theme.spacing.size(2)}px
		${({ horizontalPadding }) => (horizontalPadding ? theme.spacing.size(1.5) : 0)}px
		${({ theme, bottomPadding }) => theme.spacing.size(bottomPadding)}px;
`;

export const Layout = ({
	children,
	scrollY,
	title,
	animatedTitle,
	style,
	horizontalPadding = true,
	headingSpacing = 0,
	bottomPadding = 0,
}: LayoutProps) => {
	// TODO: Maybe it would be better to have this called for only the first child?
	const addListHeaderComponent = (child: any) => {
		if (isValidElement(child) && child.type === FlatList) {
			return React.cloneElement<FlatListProps<any>>(child, {
				ListHeaderComponent: () => (
					<HeadingAnimated
						scrollY={scrollY}
						title={animatedTitle as string}
						action="hide"
						tag="h4"
						mb={16}
						style={{ paddingLeft: headingSpacing }}
					/>
				),
				onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
					useNativeDriver: false,
				}),
			});
		}

		if (isValidElement(child) && child.type === ScrollView) {
			return (
				<>
					{React.cloneElement<ScrollViewProps>(child, {
						children: [
							<HeadingAnimated
								scrollY={scrollY}
								title={animatedTitle as string}
								action="hide"
								tag="h4"
								mb={16}
								key="scroll-view-heading-animated"
								style={{ paddingLeft: headingSpacing }}
							/>,
							...React.Children.toArray(child.props.children),
						],
						onScroll: Animated.event(
							[{ nativeEvent: { contentOffset: { y: scrollY } } }],
							{
								useNativeDriver: false,
							},
						),
					})}
				</>
			);
		}

		return child;
	};

	return (
		<StyledLayout
			style={style}
			withAnimatedTitle={!!animatedTitle}
			horizontalPadding={horizontalPadding}
			bottomPadding={bottomPadding}
		>
			{!animatedTitle && title && (
				<Heading tag="h4" mb={16}>
					{title}
				</Heading>
			)}

			{animatedTitle && scrollY
				? Children.map(children, child => addListHeaderComponent(child))
				: children}
		</StyledLayout>
	);
};
