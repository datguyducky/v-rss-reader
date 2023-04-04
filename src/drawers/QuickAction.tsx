import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef } from 'react';
import { Share } from 'react-native';
import { ArchiveBoxIcon, ShareIcon } from 'react-native-heroicons/outline';
import { FeedItem } from 'react-native-rss-parser';

import { BasicButton } from '../components/BasicButton';
import { Drawer } from '../components/Drawer';
import { Icon } from '../components/Icon';
import { Pressable } from '../components/Pressable';
import { useReadLater } from '../hooks/useReadLater';

type QuickActionProps = {
	selectedFeedData?: FeedItem;
};

export const QuickAction = forwardRef(
	({ selectedFeedData }: QuickActionProps, ref: ForwardedRef<BottomSheetModal>) => {
		const { addToReadLater, removeFromReadLater, isSavedInReadLater } = useReadLater();

		const handleShare = async () => {
			try {
				await Share.share({
					title: selectedFeedData?.title || 'Sent from V - RSS Reader',
					message: selectedFeedData?.links?.[0]?.url || selectedFeedData?.title || '',
				});
			} catch (error: any) {
				console.log(error.message);
			}
		};

		const handleReadLater = () => {
			if (isSavedInReadLater(selectedFeedData.id)) {
				removeFromReadLater(selectedFeedData.id);
			} else {
				addToReadLater(selectedFeedData);
			}
		};

		return (
			<Drawer ref={ref} snapPoints={[98]} horizontalContent>
				{/*<BasicButton*/}
				{/*	onPress={() => console.log('TODO: handle `mark as read` action')}*/}
				{/*	icon={<Icon name={CheckCircleIcon} size={24} />}*/}
				{/*	textSize={12}*/}
				{/*	vertical*/}
				{/*	spacing={0}*/}
				{/*>*/}
				{/*	Read*/}
				{/*</BasicButton>*/}

				<BasicButton
					onPress={handleReadLater}
					icon={<Icon name={ArchiveBoxIcon} size={24} />}
					textSize={12}
					vertical
					spacing={0}
					pressableComponent={<Pressable.Background borderless />}
				>
					{isSavedInReadLater(selectedFeedData?.id || '') ? 'Unsave' : 'Save'}
				</BasicButton>

				<BasicButton
					onPress={handleShare}
					icon={<Icon name={ShareIcon} size={24} />}
					textSize={12}
					vertical
					spacing={0}
					pressableComponent={<Pressable.Background borderless />}
				>
					Share
				</BasicButton>
			</Drawer>
		);
	},
);
