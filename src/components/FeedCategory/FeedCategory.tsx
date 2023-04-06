import { useState } from 'react';
import { View } from 'react-native';
import { ChevronDownIcon, ChevronRightIcon } from 'react-native-heroicons/outline';

import { FeedItem } from '../FeedItem';
import { FeedItemIcon } from '../FeedItemIcon';
import { Icon } from '../Icon';
import { Text } from '../Text';
import {
	EmptyCategoryText,
	FeedCategoryWrap,
	PressableOpenIcon,
	PressableSelectCategory,
} from './FeedCategory.styles';

type FeedCategoryProps = {
	category: Record<string, unknown>;
	handleItemNavigate: (item: Record<string, unknown>) => void;
	initiallyOpen?: boolean;
	feedIconDisabled?: boolean;
};

export const FeedCategory = ({
	category,
	handleItemNavigate,
	initiallyOpen = false,
	feedIconDisabled,
}: FeedCategoryProps) => {
	const [isOpen, setIsOpen] = useState(initiallyOpen);

	return (
		<View>
			<FeedCategoryWrap>
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
					<PressableSelectCategory onPress={() => handleItemNavigate(category)} py={8}>
						<Text fontFamily="Montserrat">{category.name as string}</Text>
					</PressableSelectCategory>
				</View>
			</FeedCategoryWrap>

			{isOpen &&
				(category?.feeds?.length > 0 ? (
					(category.feeds as Record<string, unknown>[]).map((feed, index) => (
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
