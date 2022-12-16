import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';

import { Drawer } from '../components/Drawer';
import { StatusBarLayout } from '../layouts/StatusBarLayout';
import { Text } from '../components/Text';

export const CreateSelection = ({ navigation }: StackScreenProps<any>) => {
	const createSelectionDrawerRef = useRef<BottomSheet>(null);

	return (
		<StatusBarLayout statusBarBackgroundColor="rgba(0, 0, 0, 0)" statusBarStyle="light">
			<Drawer
				navigation={navigation}
				ref={createSelectionDrawerRef}
				snapPoints={['55%', '90%']}
			>
				<Text>decide here what to create/add</Text>
			</Drawer>
		</StatusBarLayout>
	);
};
