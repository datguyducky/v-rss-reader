import { StyleProp, ViewStyle } from 'react-native';

import { BasicButton } from '../BasicButton';
import { NoFeedImageFound } from './FeedItem.styles';

type FeedItemProps = {
	item: Record<string, unknown>;
	handleItemNavigate: (item: Record<string, unknown>) => void;
	style?: StyleProp<ViewStyle>;
	mb?: number;
	icon?: React.ReactElement;
};
export const FeedItem = ({ item, handleItemNavigate, style, mb, icon }: FeedItemProps) => {
	return (
		<BasicButton
			onPress={() => handleItemNavigate(item)}
			icon={icon || <NoFeedImageFound />}
			mb={mb}
			style={style}
		>
			{item.name}
		</BasicButton>
	);
};
