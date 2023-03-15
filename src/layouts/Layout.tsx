import React, { ReactNode, Children, isValidElement } from 'react';
import { Animated, FlatList } from 'react-native';
import styled from 'styled-components/native';

import { HeadingAnimated } from '../components/HeadingAnimated';

interface LayoutProps {
	children: ReactNode;
	scrollY: any;
	title?: string;
}

const StyledLayout = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 8px 12px 16px;
`;

export const Layout = ({ children, scrollY, title }: LayoutProps) => {
	const addListHeaderComponent = (child: any) => {
		if (title && isValidElement(child) && child.type === FlatList) {
			return React.cloneElement(child, {
				ListHeaderComponent: () => (
					<HeadingAnimated
						scrollY={scrollY}
						title={title}
						action="hide"
						tag="h4"
						mb={16}
					/>
				),
				onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
					useNativeDriver: false,
				}),
			}); // TODO: Correct type here...
		}

		// TODO: Display animated heading also when using ScrollView with this layout?

		return child;
	};

	return (
		<StyledLayout>
			{Children.map(children, child => addListHeaderComponent(child))}
		</StyledLayout>
	);
};
