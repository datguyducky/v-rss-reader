import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';

import { Drawer } from '../components/Drawer';
import { Text } from '../components/Text';

export const CreateSelection = ({ navigation }: StackScreenProps<any>) => {
	const createSelectionDrawerRef = useRef<BottomSheet>(null);

	return (
		<Drawer
			onClose={() => navigation.navigate('TabScreen', { screen: 'Read' })}
			ref={createSelectionDrawerRef}
			snapPoints={['55%', '90%']}
		>
			<Text>decide here what to create/add</Text>
		</Drawer>
	);
};
