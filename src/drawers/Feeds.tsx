import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import { ForwardedRef, forwardRef } from 'react';
import { View } from 'react-native';

import { FEEDS_AND_CATEGORIES_LIST } from '../common/constants';
import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { FeedCategory } from '../components/FeedCategory';
import { FeedItem } from '../components/FeedItem';
import { ArchiveBoxIcon, InboxStackIcon } from 'react-native-heroicons/outline';

export const Feeds = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		const handleItemNavigate = item => {
			ref?.current?.forceClose();

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
				data={FEEDS_AND_CATEGORIES_LIST}
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
					icon={<InboxStackIcon size={20} color="#101113" />}
				/>

				<FeedItem
					item={{ name: 'Read later', id: 'READ_LATER_VIEW' }}
					handleItemNavigate={handleItemNavigate}
					icon={<ArchiveBoxIcon size={20} color="#101113" />}
				/>

				<Divider my={16} />
			</Drawer>
		);
	},
);
