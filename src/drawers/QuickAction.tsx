import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';

import { Drawer } from '../components/Drawer';
import { StatusBarLayout } from '../layouts/StatusBarLayout';
import { Text } from '../components/Text';

export const QuickAction = ({ navigation }: StackScreenProps<any>) => {
	const actionDrawerRef = useRef<BottomSheet>(null);

	return (
		<StatusBarLayout statusBarBackgroundColor="rgba(0, 0, 0, 0)" statusBarStyle="light">
			<Drawer navigation={navigation} ref={actionDrawerRef} snapPoints={['55%', '90%']}>
				<Text>*quick* actions here...</Text>
			</Drawer>
		</StatusBarLayout>
	);
};
