import React, { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';

import { Drawer } from '../components/Drawer';
import { Text } from '../components/Text';

export const Filters = ({ navigation }: StackScreenProps<any>) => {
	const filtersDrawersRef = useRef<BottomSheetModal>(null);

	return (
		<Drawer
			onClose={() => navigation.navigate('TabScreen', { screen: 'Read' })}
			ref={filtersDrawersRef}
			snapPoints={['40%']}
		>
			<Text>Filters here...</Text>
		</Drawer>
	);
};
