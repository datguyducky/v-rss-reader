import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MinusSmallIcon } from 'react-native-heroicons/outline';

import { BasicButton } from '../BasicButton';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { NoFeedImageFound } from './FeedItem.styles';

type FeedItemProps = {
	item: Record<string, unknown>;
	handleItemNavigate: (item: Record<string, unknown>) => void;
	style?: StyleProp<ViewStyle>;
	mb?: number;
	icon?: React.ReactElement;
	iconDisabled?: boolean;
};
export const FeedItem = ({
	item,
	handleItemNavigate,
	style,
	mb,
	icon,
	iconDisabled,
}: FeedItemProps) => {
	return (
		<BasicButton
			onPress={() => handleItemNavigate(item)}
			icon={
				iconDisabled ? (
					<Icon name={MinusSmallIcon} size={20} />
				) : (
					icon || <NoFeedImageFound />
				)
			}
			mb={mb}
			style={style}
			pressableComponent={<Pressable.Background />}
		>
			{item.name}
		</BasicButton>
	);
};
