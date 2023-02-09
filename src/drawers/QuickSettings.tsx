import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Cog6ToothIcon, ChartPieIcon } from 'react-native-heroicons/outline';

import { BasicButton } from '../components/BasicButton';
import { DeletePopup } from '../components/DeletePopup';
import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { Icon } from '../components/Icon';
import { Text } from '../components/Text';
import { ThemeSection } from '../components/ThemeSelection';
import { ReadingStats } from './ReadingStats';

export const QuickSettings = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		const { dismiss } = useBottomSheetModal();

		const currentView = 'FEED';

		const readingStatsRef = useRef<BottomSheetModal>(null);
		const [deleteCurrentView, setDeleteCurrentView] = useState(false);
		const handleEditCurrentView = () => {
			// TODO: This function should retrieve data if the currently opened view is a category or just a feed
			// and then based on that navigate to a correct view to edit it

			ref?.current?.forceClose();
			if (currentView === 'FEED') {
				navigation.navigate('Feed');
			} else {
				navigation.navigate('Category');
			}
		};

		// TODO: For methods below and basically for the rest of this file - retrieve if feed or category is currently opened and display correct text and call correct methods
		const handleRemoveCategory = () => {};
		const handleRemoveFeed = () => {};

		return (
			<>
				<Drawer ref={ref} snapPoints={[387]} name="quickSettingsDrawer">
					<BasicButton
						onPress={() => {
							ref?.current?.forceClose();
							navigation.navigate('Settings');
						}}
						icon={<Icon name={Cog6ToothIcon} size={20} />}
						mb={16}
					>
						App settings
					</BasicButton>

					<BasicButton
						onPress={() => {
							dismiss('quickSettingsDrawer');

							readingStatsRef?.current?.present();
						}}
						icon={<Icon name={ChartPieIcon} size={20} />}
					>
						Reading stats
					</BasicButton>

					<Divider my={16} />

					<Pressable onPress={handleEditCurrentView}>
						<View style={{ marginBottom: 16 }}>
							<Text fontFamily="Montserrat">Rename feed/category</Text>
							<Text fontFamily="Montserrat" weight={300} fontSize={12}>
								{`Change name of ${'NAME'} feed/category`}
							</Text>
						</View>
					</Pressable>

					<Pressable
						onPress={() => {
							ref?.current?.forceClose();
							setDeleteCurrentView(true);
						}}
					>
						<View>
							<Text fontFamily="Montserrat">Delete feed/category</Text>
							<Text fontFamily="Montserrat" weight={300} fontSize={12}>
								{`Delete currently selected feed/category: ${'NAME'}`}
							</Text>
						</View>
					</Pressable>

					<Divider my={16} />

					<Text fontFamily="Montserrat" mb={16}>
						Themes
					</Text>
					<ThemeSection />
				</Drawer>

				<ReadingStats navigation={navigation} ref={readingStatsRef} />

				<DeletePopup
					isOpen={deleteCurrentView}
					onClose={() => setDeleteCurrentView(false)}
					title="Remove the '{Name}' category?"
					subTitle="Remember, this action cannot be undone!"
					handleRemove={handleRemoveCategory}
				/>
			</>
		);
	},
);
