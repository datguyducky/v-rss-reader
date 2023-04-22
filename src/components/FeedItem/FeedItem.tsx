import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MinusSmallIcon } from 'react-native-heroicons/outline';

import { Category, Feed } from '@hooks/useFeedsCategories';

import { NoFeedImageFound } from './FeedItem.styles';
import { BasicButton } from '../BasicButton';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';

interface FeedItemProps extends SharedStylesProps {
	item: Feed | Category;
	handleItemNavigate: (item: Feed | Category) => void;
	style?: StyleProp<ViewStyle>;
	pressableStyle?: StyleProp<ViewStyle>;
	icon?: React.ReactElement;
	iconDisabled?: boolean;
}
export const FeedItem = ({
	item,
	handleItemNavigate,
	style,
	pressableStyle,
	icon,
	iconDisabled,
	...otherProps
}: FeedItemProps) => {
	return (
		<BasicButton
			{...otherProps}
			onPress={() => handleItemNavigate(item)}
			icon={
				iconDisabled ? (
					<Icon name={MinusSmallIcon} size={20} />
				) : (
					icon || <NoFeedImageFound />
				)
			}
			style={style}
			pressableComponent={<Pressable.Background py={1} px={2} style={pressableStyle} />}
		>
			{item.name}
		</BasicButton>
	);
};
