import { useState } from 'react';
import { View } from 'react-native';
import { ChevronDownIcon, ChevronRightIcon } from 'react-native-heroicons/outline';

import { FeedItem } from '../FeedItem';
import { FeedItemIcon } from '../FeedItemIcon';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import { FeedCategoryWrap } from './FeedCategory.styles';

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
				<Pressable
					onPress={() => setIsOpen(prevState => !prevState)}
					style={{
						position: 'absolute',
						left: 16,
						zIndex: 10,
					}}
				>
					{isOpen ? (
						<Icon name={ChevronDownIcon} size={20} />
					) : (
						<Icon name={ChevronRightIcon} size={20} />
					)}
				</Pressable>

				<View
					style={{
						flex: 1,
					}}
				>
					<Pressable.Background
						onPress={() => handleItemNavigate(category)}
						style={{ paddingLeft: 48, paddingRight: 16 }}
						py={8}
					>
						<Text fontFamily="Montserrat">{category.name as string}</Text>
					</Pressable.Background>
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
					<Text
						style={{ marginLeft: 48, marginBottom: 8, marginTop: 8 }}
						fontSize={12}
						weight={300}
						fontFamily="Montserrat"
					>
						No feeds exist in this category yet.
					</Text>
				))}
		</View>
	);
};
