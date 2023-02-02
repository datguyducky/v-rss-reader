import React, { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ArchiveBoxIcon, CheckIcon, ArrowUturnLeftIcon } from 'react-native-heroicons/outline';

import { TextOnlyCard } from '../TextOnlyCard';
import { MagazineCard } from '../MagazineCard';
import { ThumbnailCard } from '../ThumbnailCard';
import { BasicButton } from '../BasicButton';

import { LeftSwipeWrap, RightSwipeWrap } from './SwipeableFeedItem.styles';

interface SwipeableFeedItemProps {
	item: Record<string, unknown>; // TODO: Better type.
	onLongPress: () => void;
}

/**
 *  TODO: Right now, the react-native-gesture-handler is patched by me to add a handler to close an "open" swipeable instantly, so without any animation and some extra fluff.
 *	As I didn't liked how the default close handler animation looked like, but maybe this should be re-visited as I'm not 100% sure if I like the "instant close" no-animation that we have here right now.
 */
export const SwipeableFeedItem = ({ item, onLongPress }: SwipeableFeedItemProps) => {
	const swipeRef = useRef<Swipeable>(null);
	const viewType = 'MAGAZINE'; // TODO: Use hook and get it from a storage.

	const renderLeftActions = () => {
		return (
			<LeftSwipeWrap viewType={viewType}>
				<BasicButton
					onPress={() => {
						/* onPress handler is not needed here, as action for this component is completely handled by swipe */
					}}
					icon={<ArchiveBoxIcon size={16} color="#fff" strokeWidth={2.5} />}
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

	const renderRightActions = () => {
		return (
			<RightSwipeWrap viewType={viewType}>
				<BasicButton
					onPress={() => {
						/* onPress handler is not needed here, as action for this component is completely handled by swipe */
					}}
					textColor="#101113"
					textSize={12}
					spacing={8}
					rightInfo={
						item.isRead ? (
							<ArrowUturnLeftIcon
								size={16}
								color="#101113"
								style={{ marginLeft: 8 }}
								strokeWidth={2.5}
							/>
						) : (
							<CheckIcon
								size={16}
								color="#101113"
								style={{ marginLeft: 8 }}
								strokeWidth={2.5}
							/>
						)
					}
					textWeight={600}
				>
					{item.isRead ? 'MARK AS UNREAD' : 'MARK AS READ'}
				</BasicButton>
			</RightSwipeWrap>
		);
	};

	const renderFeedCard = () => {
		switch (viewType) {
			case 'TEXT_ONLY':
				return (
					<TextOnlyCard
						title={item.title}
						onLongPress={onLongPress}
						url={item.link._href}
					/>
				);

			case 'MAGAZINE':
				return (
					<MagazineCard
						title={item.title}
						onLongPress={onLongPress}
						thumbnailUrl={item.thumbnail?._url}
						url={item.link._href}
					/>
				);

			case 'THUMBNAIL':
				return (
					<ThumbnailCard
						title={item.title}
						onLongPress={onLongPress}
						thumbnailUrl={item.thumbnail?._url}
						url={item.link._href}
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

		swipeRef?.current?.closeInstantly();
	};

	return (
		<Swipeable
			renderLeftActions={renderLeftActions}
			renderRightActions={renderRightActions}
			friction={1.1}
			onSwipeableOpen={onOpen}
			ref={swipeRef}
			containerStyle={{ borderRadius: viewType === 'TEXT_ONLY' ? 0 : 6 }}
			leftThreshold={75}
			rightThreshold={75}
		>
			{renderFeedCard()}
		</Swipeable>
	);
};
