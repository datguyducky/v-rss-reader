import { StyleProp, ViewStyle } from 'react-native';

import { BasicButton } from '../BasicButton';
import { Text } from '../Text';
import { NoFeedImageFound } from './FeedItem.styles';

type FeedItemProps = {
	item: Record<string, unknown>;
	handleItemNavigate: (item: Record<string, unknown>) => void;
	style?: StyleProp<ViewStyle>;
	mb?: number;
};
export const FeedItem = ({ item, handleItemNavigate, style, mb }: FeedItemProps) => {
	return (
		<BasicButton
			onPress={() => handleItemNavigate(item)}
			icon={<NoFeedImageFound />}
			mb={mb}
			rightInfo={
				<Text color="#4DABF7" fontSize={14} fontFamily="Montserrat">
					000
				</Text>
			} // TODO: Display correct value from item
			style={style}
		>
			{item.name}
		</BasicButton>
	);
};
