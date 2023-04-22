import { ForwardedRef, forwardRef, useContext } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import { ArchiveBoxIcon, InboxStackIcon } from 'react-native-heroicons/outline';
import { useMMKVObject } from 'react-native-mmkv';
import { useTheme } from 'styled-components/native';

import { DEFAULT_SETTINGS_VALUES } from '@common/constants';
import { Divider } from '@components/Divider';
import { Drawer } from '@components/Drawer';
import { FeedCategory } from '@components/FeedCategory';
import { FeedItem } from '@components/FeedItem';
import { FeedItemIcon } from '@components/FeedItemIcon';
import { Icon } from '@components/Icon';
import { useFeedsCategoriesContext } from '@context/FeedsCategoriesContext';
import { ThemeContext, THEMES } from '@context/ThemeContext';
import { SettingsFormValues } from '@forms/SettingsForm';
import { Category, Feed } from '@hooks/useFeedsCategories';

export const Feeds = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		const theme = useTheme();
		const { getTheme } = useContext(ThemeContext);
		const { setActiveItem, feedsCategories } = useFeedsCategoriesContext();

		const [appSettings = DEFAULT_SETTINGS_VALUES] =
			useMMKVObject<SettingsFormValues>('appSettings');

		const handleItemNavigate = async (item: Feed | Category) => {
			ref?.current?.forceClose();

			/**
			 * Saving selected feed or category details to storage for later use.
			 */
			if (item.id === 'ALL_ARTICLES_VIEW' || item.id === 'READ_LATER_VIEW') {
				await setActiveItem();
			} else {
				await setActiveItem(item.id);
			}

			navigation.navigate('TabScreen', {
				name: item.name,
				screen: 'Read',
				params: { id: item.id },
			});

			setStatusBarBackgroundColor(theme.colors.base[0], false);
			setStatusBarStyle(getTheme() === THEMES.light ? 'dark' : 'light');
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
					item={{
						name: 'All articles',
						id: 'ALL_ARTICLES_VIEW',
						type: 'CATEGORY',
						createdAt: '',
						feeds: [],
					}}
					handleItemNavigate={handleItemNavigate}
					icon={<Icon name={InboxStackIcon} size={20} />}
				/>

				<FeedItem
					item={{
						name: 'Read later',
						id: 'READ_LATER_VIEW',
						type: 'CATEGORY',
						createdAt: '',
						feeds: [],
					}}
					handleItemNavigate={handleItemNavigate}
					icon={<Icon name={ArchiveBoxIcon} size={20} />}
				/>

				<Divider my={1} mx={2} style={{ width: 'auto' }} />
			</Drawer>
		);
	},
);
