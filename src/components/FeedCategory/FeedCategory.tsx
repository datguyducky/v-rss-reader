import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ChevronDownIcon, ChevronRightIcon } from 'react-native-heroicons/outline';

import { FeedItem } from '../FeedItem';
import { Icon } from '../Icon';
import { Text } from '../Text';

type FeedCategoryProps = {
	category: Record<string, unknown>;
	handleItemNavigate: (item: Record<string, unknown>) => void;
};

export const FeedCategory = ({ category, handleItemNavigate }: FeedCategoryProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<View>
			<View
				style={{
					marginBottom: isOpen ? 16 : 0,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Pressable
					onPress={() => setIsOpen(prevState => !prevState)}
					style={{ marginRight: 12 }}
				>
					{isOpen ? (
						<Icon name={ChevronDownIcon} size={20} />
					) : (
						<Icon name={ChevronRightIcon} size={20} />
					)}
				</Pressable>

				<Pressable onPress={() => handleItemNavigate(category)}>
					<Text fontFamily="Montserrat">{category.name}</Text>
				</Pressable>
			</View>

			{isOpen &&
				(category?.feeds?.length > 0 ? (
					(category.feeds as Record<string, unknown>[]).map((feed, index) => (
						<FeedItem
							item={feed}
							handleItemNavigate={handleItemNavigate}
							style={{ marginLeft: 32 }}
							key={feed.id as string}
							mb={
								index === (category.feeds as Record<string, unknown>[]).length - 1
									? 0
									: 16
							}
						/>
					))
				) : (
					<Text
						style={{ marginLeft: 32 }}
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
