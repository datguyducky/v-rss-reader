import { useState } from 'react';
import { View } from 'react-native';
import { ChevronDownIcon, ChevronRightIcon } from 'react-native-heroicons/outline';

import { Category, Feed } from '@hooks/useFeedsCategories';

import {
	EmptyCategoryText,
	FeedCategoryWrap,
	PressableOpenIcon,
	PressableSelectCategory,
} from './FeedCategory.styles';
import { FeedItem } from '../FeedItem';
import { FeedItemIcon } from '../FeedItemIcon';
import { Icon } from '../Icon';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface FeedCategoryProps extends SharedStylesProps {
	category: Category;
	handleItemNavigate: (item: Feed | Category) => void;
	initiallyOpen?: boolean;
	feedIconDisabled?: boolean;
}

export const FeedCategory = ({
	category,
	handleItemNavigate,
	initiallyOpen = false,
	feedIconDisabled,
	...otherProps
}: FeedCategoryProps) => {
	const [isOpen, setIsOpen] = useState(initiallyOpen);

	return (
		<View>
			<FeedCategoryWrap {...otherProps}>
				<PressableOpenIcon onPress={() => setIsOpen(prevState => !prevState)}>
					{isOpen ? (
						<Icon name={ChevronDownIcon} size={20} />
					) : (
						<Icon name={ChevronRightIcon} size={20} />
					)}
				</PressableOpenIcon>

				<View
					style={{
						flex: 1,
					}}
				>
					<PressableSelectCategory onPress={() => handleItemNavigate(category)} py={1}>
						<Text fontFamily="Montserrat">{category.name as string}</Text>
					</PressableSelectCategory>
				</View>
			</FeedCategoryWrap>

			{isOpen &&
				(category?.feeds?.length > 0 ? (
					category.feeds.map(feed => (
						<FeedItem
							item={feed}
							icon={feed?.url ? <FeedItemIcon url={feed.url} /> : undefined}
							handleItemNavigate={handleItemNavigate}
							key={feed.id as string}
							iconDisabled={feedIconDisabled}
							pressableStyle={{ paddingLeft: 48 }}
						/>
					))
				) : (
					<EmptyCategoryText fontSize={12} weight={300} fontFamily="Montserrat">
						No feeds exist in this category yet.
					</EmptyCategoryText>
				))}
		</View>
	);
};
