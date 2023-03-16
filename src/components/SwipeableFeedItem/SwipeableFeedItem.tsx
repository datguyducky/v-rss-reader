import React, { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ArchiveBoxIcon } from 'react-native-heroicons/outline';
import { useMMKVObject } from 'react-native-mmkv';

import { DEFAULT_FILTERS_VALUES } from '../../common/constants';
import { FilterFormValues } from '../../drawers/Filters';
import { calculateTimePassed } from '../../utils/calculateTimePassed';
import { BasicButton } from '../BasicButton';
import { Icon } from '../Icon';
import { MagazineCard } from '../MagazineCard';
import { TextOnlyCard } from '../TextOnlyCard';
import { ThumbnailCard } from '../ThumbnailCard';
import { LeftSwipeWrap } from './SwipeableFeedItem.styles';

interface SwipeableFeedItemProps {
	item: Record<string, unknown>; // TODO: Better type.
	onLongPress: () => void;
}

export const SwipeableFeedItem = ({ item, onLongPress }: SwipeableFeedItemProps) => {
	const swipeRef = useRef<Swipeable>(null);
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');

	const renderLeftActions = () => {
		return (
			<LeftSwipeWrap viewType={feedFilters.FEED_VIEW}>
				<BasicButton
					onPress={() => {
						/* onPress handler is not needed here, as action for this component is completely handled by swipe */
					}}
					icon={<Icon name={ArchiveBoxIcon} size={16} color="#fff" strokeWidth={2.5} />}
					textColor="#fff"
					textSize={12}
					spacing={8}
					textWeight={600}
				>
					{item.isSaved ? 'UNDO SAVE' : 'READ LATER'}
				</BasicButton>
			</LeftSwipeWrap>
		);
	};

	// TODO: Some day this will be implemented...
	// const renderRightActions = () => {
	// 	return (
	// 		<RightSwipeWrap viewType={feedFilters.FEED_VIEW}>
	// 			<BasicButton
	// 				onPress={() => {
	// 					/* onPress handler is not needed here, as action for this component is completely handled by swipe */
	// 				}}
	// 				textColor="#101113"
	// 				textSize={12}
	// 				spacing={8}
	// 				rightInfo={
	// 					item.isRead ? (
	// 						<Icon
	// 							name={ArrowUturnLeftIcon}
	// 							size={16}
	// 							style={{ marginLeft: 8 }}
	// 							strokeWidth={2.5}
	// 						/>
	// 					) : (
	// 						<Icon
	// 							name={CheckIcon}
	// 							size={16}
	// 							style={{ marginLeft: 8 }}
	// 							strokeWidth={2.5}
	// 						/>
	// 					)
	// 				}
	// 				textWeight={600}
	// 			>
	// 				{item.isRead ? 'MARK AS UNREAD' : 'MARK AS READ'}
	// 			</BasicButton>
	// 		</RightSwipeWrap>
	// 	);
	// };

	const renderFeedCard = () => {
		const domainName = item.links[0].url
			.match(/^(?:https?:\/\/)?([^\/]+)/)[1]
			.split('.')
			.slice(-2)
			.join('.')
			.replace(/^\w/, c => c.toUpperCase());

		const formattedPublishedAt = calculateTimePassed(item.published);

		console.log(item);

		switch (feedFilters.FEED_VIEW) {
			case 'TEXT_ONLY':
				return (
					<TextOnlyCard
						title={item.title}
						onLongPress={onLongPress}
						url={item.links[0].url}
						domainName={domainName}
						publishedAt={formattedPublishedAt}
						density={feedFilters.FEED_DENSITY}
						description={item?.description || item?.content}
					/>
				);

			case 'MAGAZINE':
				return (
					<MagazineCard
						title={item.title}
						onLongPress={onLongPress}
						thumbnailUrl={item?.imageUrl}
						url={item.links[0].url}
						domainName={domainName}
						publishedAt={formattedPublishedAt}
						density={feedFilters.FEED_DENSITY}
					/>
				);

			case 'THUMBNAIL':
				return (
					<ThumbnailCard
						title={item.title}
						onLongPress={onLongPress}
						thumbnailUrl={item?.imageUrl}
						url={item.links[0].url}
						domainName={domainName}
						publishedAt={formattedPublishedAt}
						density={feedFilters.FEED_DENSITY}
					/>
				);
		}
	};

	/**
	 * When swipeable feed is "open" then we do one of the possible actions:
	 * - when opened from left: we save this specific item to the "READ LATER" category, and if it exists there already, we remove it from there.
	 * - when opened from right: we mark this specific item as "READ", but if it's marked as one already then we mark it as "UNREAD"
	 */
	const onOpen = (direction: 'left' | 'right') => {
		console.log(direction, 'onOpen stuff');
		if (direction === 'left') {
			// TODO: Handle left action
		} else {
			// TODO: Handle right action
		}

		swipeRef?.current?.closeFromEnd();
	};

	return (
		<Swipeable
			renderLeftActions={renderLeftActions}
			//renderRightActions={renderRightActions}
			friction={1.1}
			onSwipeableOpen={onOpen}
			ref={swipeRef}
			containerStyle={{ borderRadius: feedFilters.FEED_VIEW === 'TEXT_ONLY' ? 0 : 6 }}
			leftThreshold={75}
			//rightThreshold={75}
		>
			{renderFeedCard()}
		</Swipeable>
	);
};
