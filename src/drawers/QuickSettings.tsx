import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { Cog6ToothIcon, ChartPieIcon } from 'react-native-heroicons/outline';
import { Pressable, View } from 'react-native';

import { Drawer } from '../components/Drawer';
import { BasicButton } from '../components/BasicButton';
import { Divider } from '../components/Divider';
import { Text } from '../components/Text';
import { ThemeSection } from '../components/ThemeSelection';

export const QuickSettings = ({ navigation }: StackScreenProps<any>) => {
	const quickSettingsDrawerRef = useRef<BottomSheet>(null);

	return (
		<Drawer
			onClose={() => navigation.navigate('TabScreen', { screen: 'Read' })}
			ref={quickSettingsDrawerRef}
			snapPoints={[387]}
		>
			<BasicButton
				onPress={() => console.log('TODO: app settings view')}
				icon={<Cog6ToothIcon size={20} color="#101113" />}
				mb={16}
			>
				App settings
			</BasicButton>

			<BasicButton
				onPress={() => console.log('TODO: open reading stats view')}
				icon={<ChartPieIcon size={20} color="#101113" />}
			>
				Reading stats
			</BasicButton>

			<Divider my={16} />

			<View style={{ marginBottom: 16 }}>
				<Pressable
					onPress={() =>
						console.log('TODO: display view to rename current feed/category')
					}
				>
					<Text fontFamily="Montserrat">{`Rename feed/category`}</Text>
					<Text fontFamily="Montserrat" weight={300} fontSize={12}>
						{`Change name of ${'NAME'} feed/category`}
					</Text>
				</Pressable>
			</View>

			<View>
				<Pressable
					onPress={() => console.log('TODO: display view to delete this feed/category')}
				>
					<Text fontFamily="Montserrat">{`Delete feed/category`}</Text>
					<Text fontFamily="Montserrat" weight={300} fontSize={12}>
						{`Delete currently selected feed/category: ${'NAME'}`}
					</Text>
				</Pressable>
			</View>

			<Divider my={16} />

			<Text fontFamily="Montserrat" mb={16}>
				Themes
			</Text>
			<ThemeSection />
		</Drawer>
	);
};
