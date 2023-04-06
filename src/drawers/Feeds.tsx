import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import { ForwardedRef, forwardRef } from 'react';
import { ArchiveBoxIcon, InboxStackIcon } from 'react-native-heroicons/outline';
import { useMMKVObject } from 'react-native-mmkv';
import { useTheme } from 'styled-components/native';

import { DEFAULT_SETTINGS_VALUES } from '../common/constants';
import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { FeedCategory } from '../components/FeedCategory';
import { FeedItem } from '../components/FeedItem';
import { FeedItemIcon } from '../components/FeedItemIcon';
import { Icon } from '../components/Icon';
import { SettingsFormValues } from '../forms/SettingsForm';
import { useFeedsCategories } from '../hooks/useFeedsCategories';

export const Feeds = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		const theme = useTheme();

		const { feedsCategories, setActiveItemDetails } = useFeedsCategories();
		const [appSettings = DEFAULT_SETTINGS_VALUES] =
			useMMKVObject<SettingsFormValues>('appSettings');

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
			setStatusBarBackgroundColor(theme.colors.base[0], false);
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
						<FeedCategory
							category={item}
							handleItemNavigate={handleItemNavigate}
							feedIconDisabled={appSettings.hideFeedIcons}
							initiallyOpen={appSettings.startWithCategoriesOpen}
						/>
					) : (
						<FeedItem
							icon={item?.url ? <FeedItemIcon url={item.url} /> : undefined}
							item={item}
							handleItemNavigate={handleItemNavigate}
							iconDisabled={appSettings.hideFeedIcons}
						/>
					)
				}
				keyExtractor={item => item.id}
			>
				<FeedItem
					item={{ name: 'All articles', id: 'ALL_ARTICLES_VIEW' }}
					handleItemNavigate={handleItemNavigate}
					icon={<Icon name={InboxStackIcon} size={20} />}
				/>

				<FeedItem
					item={{ name: 'Read later', id: 'READ_LATER_VIEW' }}
					handleItemNavigate={handleItemNavigate}
					icon={<Icon name={ArchiveBoxIcon} size={20} />}
				/>

				<Divider my={8} style={{ marginLeft: 16, marginRight: 16, width: 'auto' }} />
			</Drawer>
		);
	},
);
