import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ArchiveBoxIcon } from 'react-native-heroicons/outline';

import { TextOnlyCard } from '../TextOnlyCard';
import { MagazineCard } from '../MagazineCard';
import { ThumbnailCard } from '../ThumbnailCard';
import { BasicButton } from '../BasicButton';

export const SwipeableFeed = ({ item }) => {
	const swipeRef = useRef(null);

	const renderLeftActions = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [0, 100],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});
		return (
			<Animated.View
				style={[
					{
						backgroundColor: 'green',
						justifyContent: 'center',
						flex: 1,
						paddingLeft: 8,
						transform: [{ translateX: scale }],
					},
				]}
			>
				<BasicButton
					onPress={() => {}}
					icon={<ArchiveBoxIcon size={16} color="#000" />}
					textColor="#000"
					textSize={12}
				>
					READ LATER
				</BasicButton>
			</Animated.View>
		);
	};

	const renderRightActions = (progress, dragX) => {
		return (
			<Animated.View
				style={[
					{
						backgroundColor: 'red',
						justifyContent: 'center',
						flex: 1,
						paddingLeft: 8,
					},
				]}
			>
				<BasicButton
					onPress={() => {}}
					icon={<ArchiveBoxIcon size={16} color="#fff" />}
					textColor="#fff"
					textSize={12}
				>
					READ LATER
				</BasicButton>
			</Animated.View>
		);
	};

	const renderFeedCard = () => {
		const viewType = 'THUMBNAIL';

		switch (viewType) {
			case 'TEXT_ONLY':
				return (
					<TextOnlyCard
						title={item.title}
						//onLongPress={() => navigation.navigate('QuickAction')}
						mb={16}
						url={item.link._href}
					/>
				);

			case 'MAGAZINE':
				return (
					<MagazineCard
						title={item.title}
						//onLongPress={() => navigation.navigate('QuickAction')}
						mb={16}
						thumbnailUrl={item.thumbnail?._url}
						url={item.link._href}
					/>
				);

			case 'THUMBNAIL':
				return (
					<ThumbnailCard
						title={item.title}
						//onLongPress={() => navigation.navigate('QuickAction')}
						thumbnailUrl={item.thumbnail?._url}
						url={item.link._href}
						mb={16}
					/>
				);
		}
	};

	const onOpen = props => {
		console.log(props);
		// todo: do stuff here and close...

		swipeRef?.current?.closeInstantly();
	};

	return (
		<Swipeable
			renderLeftActions={renderLeftActions}
			renderRightActions={renderRightActions}
			friction={1.4}
			onSwipeableOpen={onOpen}
			ref={swipeRef}
			//containerStyle={{ backgroundColor: 'blue' }}
		>
			{renderFeedCard()}
		</Swipeable>
	);
};
