import React, { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ArchiveBoxIcon } from 'react-native-heroicons/outline';
import { useMMKVObject } from 'react-native-mmkv';

import { DEFAULT_FILTERS_VALUES, DEFAULT_SETTINGS_VALUES } from '../../common/constants';
import { FilterFormValues } from '../../drawers/Filters';
import { SettingsFormValues } from '../../forms/SettingsForm';
import { useReadLater } from '../../hooks/useReadLater';
import { calculateTimePassed } from '../../utils/calculateTimePassed';
import { BasicButton } from '../BasicButton';
import { Icon } from '../Icon';
import { MagazineCard } from '../MagazineCard';
import { TextOnlyCard } from '../TextOnlyCard';
import { ThumbnailCard } from '../ThumbnailCard';
import { ReadLaterActionWrap } from './SwipeableFeedItem.styles';

interface SwipeableFeedItemProps {
	item: Record<string, unknown>; // TODO: Better type.
	onLongPress: () => void;
}

export const SwipeableFeedItem = ({ item, onLongPress }: SwipeableFeedItemProps) => {
	const swipeRef = useRef<Swipeable>(null);

	const [appSettings = DEFAULT_SETTINGS_VALUES] =
		useMMKVObject<SettingsFormValues>('appSettings');
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');
	const { addToReadLater, removeFromReadLater, isSavedInReadLater } = useReadLater();

	const renderReadLaterAction = () => {
		return (
			<ReadLaterActionWrap
				viewType={feedFilters.FEED_VIEW}
				isInverted={appSettings.invertSwipe}
			>
				<BasicButton
					onPress={() => {
						/* onPress handler is not needed here, as action for this component is completely handled by swipe */
					}}
					icon={
						appSettings.invertSwipe ? undefined : (
							<Icon name={ArchiveBoxIcon} size={16} color="#fff" strokeWidth={2.5} />
						)
					}
					rightInfo={
						appSettings.invertSwipe ? (
							<Icon
								name={ArchiveBoxIcon}
								size={16}
								color="#fff"
								strokeWidth={2.5}
								style={{ marginLeft: 8 }}
							/>
						) : undefined
					}
					textColor="#fff"
					textSize={12}
					spacing={8}
					textWeight={600}
				>
					{isSavedInReadLater(item.id as string) ? 'UNDO SAVE' : 'READ LATER'}
				</BasicButton>
			</ReadLaterActionWrap>
		);
	};

	// TODO: Some day this will be implemented...
	// const renderReadStatusAction = () => {
	// 	return (
	// 		<ReadStatusActionWrap viewType={feedFilters.FEED_VIEW} inverted={appSettings.invertSwipe}>
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
	// 		</ReadStatusActionWrap>
	// 	);
	// };

	const renderFeedCard = () => {
		const domainName = item.links[0].url
			.match(/^(?:https?:\/\/)?([^/]+)/)[1]
			.split('.')
			.slice(-2)
			.join('.')
			.replace(/^\w/, c => c.toUpperCase());

		const formattedPublishedAt = calculateTimePassed(item.published);

		switch (feedFilters.FEED_VIEW) {
			case 'TEXT_ONLY':
				return (
					<TextOnlyCard
						title={item.title}
						onLongPress={onLongPress}
						url={item.links[0].url}
						domainName={`${domainName} ${
							item?.feedAppCategory && item?.feedAppCategory?.length > 0
								? ' / ' + item.feedAppCategory
								: ''
						}`}
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
						thumbnailUrl={appSettings.disableArticleImages ? undefined : item?.imageUrl}
						url={item.links[0].url}
						domainName={`${domainName} ${
							item?.feedAppCategory && item?.feedAppCategory?.length > 0
								? ' / ' + item.feedAppCategory
								: ''
						}`}
						publishedAt={formattedPublishedAt}
						density={feedFilters.FEED_DENSITY}
						description={item?.description || item?.content}
					/>
				);

			case 'THUMBNAIL':
				return (
					<ThumbnailCard
						title={item.title}
						onLongPress={onLongPress}
						thumbnailUrl={appSettings.disableArticleImages ? undefined : item?.imageUrl}
						url={item.links[0].url}
						domainName={`${domainName} ${
							item?.feedAppCategory && item?.feedAppCategory?.length > 0
								? ' / ' + item.feedAppCategory
								: ''
						}`}
						publishedAt={formattedPublishedAt}
						density={feedFilters.FEED_DENSITY}
						description={item?.description || item?.content}
					/>
				);
		}
	};

	const handleReadLaterAction = () => {
		if (isSavedInReadLater(item.id)) {
			removeFromReadLater(item.id);
		} else {
			addToReadLater(item);
		}
	};

	const handleLeftSwipe = appSettings.invertSwipe ? undefined : handleReadLaterAction;
	const handleRightSwipe = appSettings.invertSwipe ? handleReadLaterAction : undefined;

	/**
	 * When swipeable feed is "open" then we do one of the possible actions:
	 * - when opened from left: we save this specific item to the "READ LATER" category, and if it exists there already, we remove it from there.
	 * - when opened from right: we mark this specific item as "READ", but if it's marked as one already then we mark it as "UNREAD",
	 *
	 * of course there's also a possibility that user set the app settings that the swipeable feeds should be inverted in places, in that case we need to check if that's true to use proper function for an action
	 */
	const onOpen = (direction: 'left' | 'right') => {
		if (direction === 'left') {
			handleLeftSwipe?.();
		} else {
			handleRightSwipe?.();
		}

		swipeRef?.current?.closeFromEnd();
	};

	return (
		<Swipeable
			renderLeftActions={appSettings.invertSwipe ? undefined : renderReadLaterAction}
			renderRightActions={appSettings.invertSwipe ? renderReadLaterAction : undefined}
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
