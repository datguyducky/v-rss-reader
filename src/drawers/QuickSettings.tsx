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
import { useFeedsCategories } from '../hooks/useFeedsCategories';

export const QuickSettings = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		const { activeItemDetails, deleteItem, setActiveItemDetails } = useFeedsCategories();

		const { dismiss } = useBottomSheetModal();

		const readingStatsRef = useRef<BottomSheetModal>(null);
		const [deleteCurrentView, setDeleteCurrentView] = useState(false);
		const handleEditCurrentView = () => {
			ref?.current?.forceClose();

			if (activeItemDetails?.type === 'FEED') {
				navigation.navigate('Feed', { feedId: activeItemDetails.id, mode: 'edit' });
			} else if (activeItemDetails?.type === 'CATEGORY') {
				navigation.navigate('Category', { categoryId: activeItemDetails.id, mode: 'edit' });
			}
		};

		const handleRemoveItem = () => {
			setDeleteCurrentView(false);

			setActiveItemDetails();

			navigation.navigate('TabScreen', {
				name: 'All articles',
				screen: 'Read',
				params: { id: 'ALL_ARTICLES_VIEW' },
			});

			deleteItem(activeItemDetails.id);
		};

		return (
			<>
				<Drawer
					ref={ref}
					snapPoints={activeItemDetails?.id ? [387] : [256]}
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
					{activeItemDetails?.id && (
						<>
							<Divider my={1} />

							<View>
								<Pressable.Background onPress={handleEditCurrentView} py={1} px={2}>
									<Text fontFamily="Montserrat">{`Rename ${
										activeItemDetails.type === 'FEED' ? 'feed' : 'category'
									}`}</Text>
									<Text fontFamily="Montserrat" weight={300} fontSize={12}>
										{`Change name of ${activeItemDetails.name} ${
											activeItemDetails.type === 'FEED' ? 'feed' : 'category'
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
										activeItemDetails.type === 'FEED' ? 'feed' : 'category'
									}`}</Text>
									<Text fontFamily="Montserrat" weight={300} fontSize={12}>
										{`Delete currently selected ${
											activeItemDetails.type === 'FEED' ? 'feed' : 'category'
										}: ${activeItemDetails.name}`}
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
					title={`Remove the ${activeItemDetails?.name} ${
						activeItemDetails?.type === 'FEED' ? 'feed' : 'category'
					}?`}
					subTitle="Remember, this action cannot be undone!"
					handleConfirm={handleRemoveItem}
					confirmText="Yes, Remove"
				/>
			</>
		);
	},
);
