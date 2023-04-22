import React, { ForwardedRef, forwardRef } from 'react';
import { Share } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ArchiveBoxIcon, ShareIcon } from 'react-native-heroicons/outline';

import { BasicButton } from '@components/BasicButton';
import { Drawer } from '@components/Drawer';
import { Icon } from '@components/Icon';
import { Pressable } from '@components/Pressable';
import { useReadLaterContext } from '@context/ReadLaterContext';

import { RssFeedItem } from '../@types';

type QuickActionProps = {
	selectedFeedData?: RssFeedItem;
};

export const QuickAction = forwardRef(
	({ selectedFeedData }: QuickActionProps, ref: ForwardedRef<BottomSheetModal>) => {
		const { addToReadLater, removeFromReadLater, isSavedInReadLater } = useReadLaterContext();

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

		const handleReadLater = async () => {
			if (selectedFeedData) {
				if (isSavedInReadLater(selectedFeedData.id)) {
					await removeFromReadLater(selectedFeedData.id);
				} else {
					await addToReadLater(selectedFeedData);
				}
			}
		};

		return (
			<Drawer ref={ref} snapPoints={[98]} horizontalContent pt={3}>
				{/*<BasicButton*/}
				{/*	onPress={() => {}}*/}
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
