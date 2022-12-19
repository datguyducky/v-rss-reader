import React, { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { PlusIcon, FolderPlusIcon } from 'react-native-heroicons/outline';

import { Drawer } from '../components/Drawer';
import { BasicButton } from '../components/BasicButton';

export const CreateSelection = ({ navigation }: StackScreenProps<any>) => {
	const createSelectionDrawerRef = useRef<BottomSheet>(null);

	return (
		<Drawer
			onClose={() => navigation.navigate('TabScreen', { screen: 'Read' })}
			ref={createSelectionDrawerRef}
			snapPoints={[112]}
		>
			<BasicButton
				onPress={() => console.log('TODO: open new feed view')}
				icon={<PlusIcon size={20} color="#101113" />}
				marginBottom={16}
			>
				Add new RSS feed
			</BasicButton>

			<BasicButton
				onPress={() => console.log('TODO: open new category view')}
				icon={<FolderPlusIcon size={20} color="#101113" />}
			>
				Create new category
			</BasicButton>
		</Drawer>
	);
};
