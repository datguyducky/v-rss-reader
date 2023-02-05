import { useState } from 'react';
import { View } from 'react-native';
import { ChevronDownIcon, ChevronRightIcon } from 'react-native-heroicons/outline';

import { BasicButton } from '../BasicButton';
import { FeedItem } from '../FeedItem';
import { Icon } from '../Icon';

type FeedCategoryProps = {
	category: Record<string, unknown>;
	handleItemNavigate: (item: Record<string, unknown>) => void;
};

export const FeedCategory = ({ category, handleItemNavigate }: FeedCategoryProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<View>
			<BasicButton
				onPress={() => setIsOpen(prevState => !prevState)}
				icon={
					isOpen ? (
						<Icon name={ChevronDownIcon} size={20} />
					) : (
						<Icon name={ChevronRightIcon} size={20} />
					)
				}
				mb={isOpen ? 16 : 0}
			>
				{category.name}
			</BasicButton>

			{isOpen &&
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
				))}
		</View>
	);
};
