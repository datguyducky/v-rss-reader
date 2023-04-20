import { openURL } from 'expo-linking';
import React, { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ArchiveBoxIcon } from 'react-native-heroicons/outline';
import { useMMKVObject } from 'react-native-mmkv';
import { useTheme } from 'styled-components/native';

import { PressableThumbnail, ReadLaterActionWrap } from './SwipeableFeedItem.styles';
import { DEFAULT_FILTERS_VALUES, DEFAULT_SETTINGS_VALUES } from '../../common/constants';
import { useReadLaterContext } from '../../context/ReadLaterContext';
import { useReadingStatsContext } from '../../context/ReadingStatsContext';
import { FilterFormValues } from '../../drawers/Filters';
import { SettingsFormValues } from '../../forms/SettingsForm';
import { calculateTimePassed } from '../../utils/calculateTimePassed';
import { BasicButton } from '../BasicButton';
import { Icon } from '../Icon';
import { MagazineCard } from '../MagazineCard';
import { SharedStylesProps } from '../Shared.styles';
import { TextOnlyCard } from '../TextOnlyCard';
import { ThumbnailCard } from '../ThumbnailCard';
import { RssFeedItem } from '../../@types';

interface SwipeableFeedItemProps extends SharedStylesProps {
	item: RssFeedItem;
	handleActionPress: () => void;
	enabled?: boolean;
}

export const SwipeableFeedItem = ({
	item,
	handleActionPress,
	enabled = true,
	...otherProps
}: SwipeableFeedItemProps) => {
	const theme = useTheme();
	const swipeRef = useRef<Swipeable>(null);
	const { handleReadingStats } = useReadingStatsContext();

	const [appSettings = DEFAULT_SETTINGS_VALUES] =
		useMMKVObject<SettingsFormValues>('appSettings');
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');
	const { addToReadLater, removeFromReadLater, isSavedInReadLater } = useReadLaterContext();

	const handlePress = async () => {
		openURL(item?.links[0]?.url);

		if (!appSettings.disableReadingStatistics) {
			await handleReadingStats();
		}
	};

	const renderReadLaterAction = () => {
		return (
			<ReadLaterActionWrap
				viewType={feedFilters.feedView}
				isInverted={appSettings.invertSwipe}
			>
				<BasicButton
					onPress={() => {
						/* onPress handler is not needed here, as action for this component is completely handled by swipe */
					}}
					icon={
						appSettings.invertSwipe ? undefined : (
							<Icon
								name={ArchiveBoxIcon}
								size={16}
								color={theme.colors.black}
								strokeWidth={2.5}
							/>
						)
					}
					rightInfo={
						appSettings.invertSwipe ? (
							<Icon
								name={ArchiveBoxIcon}
								size={16}
								color={theme.colors.black}
								strokeWidth={2.5}
								style={{ marginLeft: 8 }}
							/>
						) : undefined
					}
					textColor={theme.colors.black}
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
	// 		<ReadStatusActionWrap viewType={feedFilters.feedView} inverted={appSettings.invertSwipe}>
	// 			<BasicButton
	// 				onPress={() => {
	// 					/* onPress handler is not needed here, as action for this component is completely handled by swipe */
	// 				}}
	// 				textColor={theme.colors.text}
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
		const domainName =
			item?.links?.[0]?.url
				?.match(/^(?:https?:\/\/)?([^/]+)/)?.[1]
				?.split('.')
				.slice(-2)
				.join('.')
				.replace(/^\w/, c => c.toUpperCase()) ?? '';

		const formattedPublishedAt = calculateTimePassed(item.published);

		switch (feedFilters.feedView) {
			case 'TEXT_ONLY':
				return (
					<TextOnlyCard
						{...otherProps}
						title={item.title}
						handleActionPress={handleActionPress}
						handlePress={handlePress}
						domainName={`${domainName} ${
							item?.feedAppCategory && item?.feedAppCategory?.length > 0
								? ' / ' + item.feedAppCategory
								: ''
						}`}
						publishedAt={formattedPublishedAt}
						density={feedFilters.feedDensity}
						description={item?.description || item?.content}
						actionPress={appSettings.quickActionDrawerGesture}
					/>
				);

			case 'MAGAZINE':
				return (
					<MagazineCard
						{...otherProps}
						title={item.title}
						handleActionPress={handleActionPress}
						thumbnailUrl={appSettings.disableArticleImages ? undefined : item?.imageUrl}
						handlePress={handlePress}
						domainName={`${domainName} ${
							item?.feedAppCategory && item?.feedAppCategory?.length > 0
								? ' / ' + item.feedAppCategory
								: ''
						}`}
						publishedAt={formattedPublishedAt}
						density={feedFilters.feedDensity}
						description={item?.description || item?.content}
						actionPress={appSettings.quickActionDrawerGesture}
					/>
				);

			case 'THUMBNAIL':
				return (
					<ThumbnailCard
						{...otherProps}
						title={item.title}
						thumbnailUrl={appSettings.disableArticleImages ? undefined : item?.imageUrl}
						domainName={`${domainName} ${
							item?.feedAppCategory && item?.feedAppCategory?.length > 0
								? ' / ' + item.feedAppCategory
								: ''
						}`}
						publishedAt={formattedPublishedAt}
						density={feedFilters.feedDensity}
						description={item?.description || item?.content}
					/>
				);
		}
	};

	const handleReadLaterAction = async () => {
		if (isSavedInReadLater(item.id)) {
			await removeFromReadLater(item.id);
		} else {
			await addToReadLater(item);
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

	if (feedFilters.feedView === 'THUMBNAIL') {
		return (
			<PressableThumbnail
				onLongPress={
					appSettings.quickActionDrawerGesture === 'LONG_PRESS'
						? () => handleActionPress?.()
						: undefined
				}
				onDoublePress={
					appSettings.quickActionDrawerGesture === 'DOUBLE_PRESS'
						? () => handleActionPress?.()
						: undefined
				}
				onPress={handlePress}
			>
				<Swipeable
					renderLeftActions={appSettings.invertSwipe ? undefined : renderReadLaterAction}
					renderRightActions={appSettings.invertSwipe ? renderReadLaterAction : undefined}
					friction={1.1}
					onSwipeableOpen={onOpen}
					ref={swipeRef}
					containerStyle={{ borderRadius: 0 }}
					leftThreshold={75}
					//rightThreshold={75}
				>
					{renderFeedCard()}
				</Swipeable>
			</PressableThumbnail>
		);
	}

	return (
		<Swipeable
			renderLeftActions={appSettings.invertSwipe ? undefined : renderReadLaterAction}
			renderRightActions={appSettings.invertSwipe ? renderReadLaterAction : undefined}
			friction={1.1}
			onSwipeableOpen={onOpen}
			ref={swipeRef}
			leftThreshold={75}
			enabled={enabled}
			//rightThreshold={75}
		>
			{renderFeedCard()}
		</Swipeable>
	);
};
