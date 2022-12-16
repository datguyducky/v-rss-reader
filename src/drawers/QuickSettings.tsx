import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';

import { Drawer } from '../components/Drawer';
import { StatusBarLayout } from '../layouts/StatusBarLayout';
import { Text } from '../components/Text';

export const QuickSettings = ({ navigation }: StackScreenProps<any>) => {
	const quickSettingsDrawerRef = useRef<BottomSheet>(null);

	return (
		<StatusBarLayout statusBarBackgroundColor="rgba(0, 0, 0, 0)" statusBarStyle="light">
			<Drawer
				navigation={navigation}
				ref={quickSettingsDrawerRef}
				snapPoints={['55%', '90%']}
			>
				<Text>Quick settings here...</Text>
			</Drawer>
		</StatusBarLayout>
	);
};
