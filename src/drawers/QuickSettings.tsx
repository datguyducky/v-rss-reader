import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { View } from 'react-native';
import { Cog6ToothIcon, ChartPieIcon } from 'react-native-heroicons/outline';

import { ThemeSectionContainer } from './QuickSettings.styles';
import { ReadingStats } from './ReadingStats';
import { BasicButton } from '../components/BasicButton';
import { ConfirmPopup } from '../components/ConfirmPopup';
import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { Icon } from '../components/Icon';
import { Pressable } from '../components/Pressable';
import { Text } from '../components/Text';
import { ThemeSection } from '../components/ThemeSelection';
import { useFeedsCategoriesContext } from '../context/FeedsCategoriesContext';

export const QuickSettings = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		const { activeItem, deleteItem, setActiveItem } = useFeedsCategoriesContext();

		const { dismiss } = useBottomSheetModal();

		const readingStatsRef = useRef<BottomSheetModal>(null);
		const [deleteCurrentView, setDeleteCurrentView] = useState(false);
		const handleEditCurrentView = () => {
			ref?.current?.forceClose();

			if (activeItem?.type === 'FEED') {
				navigation.navigate('Feed', { feedId: activeItem.id, mode: 'edit' });
			} else if (activeItem?.type === 'CATEGORY') {
				navigation.navigate('Category', { categoryId: activeItem.id, mode: 'edit' });
			}
		};

		const handleRemoveItem = async () => {
			setDeleteCurrentView(false);

			setActiveItem();

			navigation.navigate('TabScreen', {
				name: 'All articles',
				screen: 'Read',
				params: { id: 'ALL_ARTICLES_VIEW' },
			});

			if (activeItem) {
				await deleteItem(activeItem.id);
			}
		};

		return (
			<>
				<Drawer
					ref={ref}
					snapPoints={activeItem?.id ? [387] : [256]}
					name="quickSettingsDrawer"
				>
					<BasicButton
						onPress={() => {
							ref?.current?.forceClose();
							navigation.navigate('Settings', { name: 'Settings' });
						}}
						icon={<Icon name={Cog6ToothIcon} size={20} />}
						pressableComponent={<Pressable.Background py={1} px={2} />}
					>
						App settings
					</BasicButton>
					<BasicButton
						onPress={() => {
							dismiss('quickSettingsDrawer');

							readingStatsRef?.current?.present();
						}}
						icon={<Icon name={ChartPieIcon} size={20} />}
						pressableComponent={<Pressable.Background py={1} px={2} />}
					>
						Reading stats
					</BasicButton>
					{activeItem?.id && (
						<>
							<Divider my={1} />

							<View>
								<Pressable.Background onPress={handleEditCurrentView} py={1} px={2}>
									<Text fontFamily="Montserrat">{`Rename ${
										activeItem.type === 'FEED' ? 'feed' : 'category'
									}`}</Text>
									<Text fontFamily="Montserrat" weight={300} fontSize={12}>
										{`Change name of ${activeItem.name} ${
											activeItem.type === 'FEED' ? 'feed' : 'category'
										}`}
									</Text>
								</Pressable.Background>
							</View>

							<View>
								<Pressable.Background
									onPress={() => {
										ref?.current?.forceClose();
										setDeleteCurrentView(true);
									}}
									py={1}
									px={2}
								>
									<Text fontFamily="Montserrat">{`Delete ${
										activeItem.type === 'FEED' ? 'feed' : 'category'
									}`}</Text>
									<Text fontFamily="Montserrat" weight={300} fontSize={12}>
										{`Delete currently selected ${
											activeItem.type === 'FEED' ? 'feed' : 'category'
										}: ${activeItem.name}`}
									</Text>
								</Pressable.Background>
							</View>
						</>
					)}
					<Divider mt={1} mb={2} />
					<ThemeSectionContainer>
						<Text fontFamily="Montserrat" mb={2}>
							Themes
						</Text>
						<ThemeSection onClose={() => ref?.current?.forceClose()} />
					</ThemeSectionContainer>
				</Drawer>

				<ReadingStats navigation={navigation} ref={readingStatsRef} />

				<ConfirmPopup
					isOpen={deleteCurrentView}
					onClose={() => setDeleteCurrentView(false)}
					title={`Remove the ${activeItem?.name} ${
						activeItem?.type === 'FEED' ? 'feed' : 'category'
					}?`}
					subTitle="Remember, this action cannot be undone!"
					handleConfirm={handleRemoveItem}
					confirmText="Yes, Remove"
				/>
			</>
		);
	},
);
