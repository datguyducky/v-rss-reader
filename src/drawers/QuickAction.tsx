import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';

import { Drawer } from '../components/Drawer';
import { Text } from '../components/Text';

export const QuickAction = ({ navigation }: StackScreenProps<any>) => {
	const actionDrawerRef = useRef<BottomSheet>(null);

	return (
		<Drawer
			onClose={() => navigation.navigate('TabScreen', { screen: 'Read' })}
			ref={actionDrawerRef}
			snapPoints={['55%', '90%']}
		>
			<Text>*quick* actions here...</Text>
		</Drawer>
	);
};
