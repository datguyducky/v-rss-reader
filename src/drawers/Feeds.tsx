import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import { ForwardedRef, forwardRef } from 'react';
import { View } from 'react-native';
import { ArchiveBoxIcon, InboxStackIcon } from 'react-native-heroicons/outline';

import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { FeedCategory } from '../components/FeedCategory';
import { FeedItem } from '../components/FeedItem';
import { Icon } from '../components/Icon';

import { useFeedsCategories } from '../hooks/useFeedsCategories';

export const Feeds = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		const { feedsCategories, setActiveItemDetails } = useFeedsCategories();

		const handleItemNavigate = item => {
			ref?.current?.forceClose();

			/**
			 * Saving selected feed or category details to MMKV storage for later use.
			 */
			if (item.id === 'ALL_ARTICLES_VIEW' || item.id === 'READ_LATER_VIEW') {
				setActiveItemDetails();
			} else {
				setActiveItemDetails(item.id);
			}

			navigation.navigate('TabScreen', {
				name: item.name,
				screen: 'Read',
				params: { id: item.id },
			});
			setStatusBarBackgroundColor('#fff', false);
			setStatusBarStyle('dark');
		};

		return (
			<Drawer
				ref={ref}
				snapPoints={[256, '85%']}
				useFlatList
				data={feedsCategories}
				emptyListText="Click the '+' button to begin adding new feeds or categories."
				renderItem={({ item }) =>
					item.type === 'CATEGORY' ? (
						<FeedCategory category={item} handleItemNavigate={handleItemNavigate} />
					) : (
						<FeedItem item={item} handleItemNavigate={handleItemNavigate} />
					)
				}
				keyExtractor={item => item.id}
				ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
			>
				<FeedItem
					item={{ name: 'All articles', id: 'ALL_ARTICLES_VIEW' }}
					handleItemNavigate={handleItemNavigate}
					mb={16}
					icon={<Icon name={InboxStackIcon} size={20} />}
				/>

				<FeedItem
					item={{ name: 'Read later', id: 'READ_LATER_VIEW' }}
					handleItemNavigate={handleItemNavigate}
					icon={<Icon name={ArchiveBoxIcon} size={20} />}
				/>

				<Divider my={16} />
			</Drawer>
		);
	},
);
