import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';

import { Drawer } from '../components/Drawer';
import { Text } from '../components/Text';

export const Feeds = ({ navigation }: StackScreenProps<any>) => {
	const feedsDrawerRef = useRef<BottomSheet>(null);

	return (
		<Drawer
			onClose={() => navigation.navigate('TabScreen', { screen: 'Read' })}
			ref={feedsDrawerRef}
			snapPoints={['55%', '90%']}
		>
			<Text>Feeds here...</Text>
		</Drawer>
	);
};
