import { ForwardedRef, forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FolderPlusIcon, PlusIcon } from 'react-native-heroicons/outline';

import { BasicButton } from '@components/BasicButton';
import { Drawer } from '@components/Drawer';
import { Icon } from '@components/Icon';
import { Pressable } from '@components/Pressable';

import { StackParamList } from '../routing/Routes';

export const CreateSelection = forwardRef((_, ref: ForwardedRef<BottomSheetModal>) => {
	const navigation = useNavigation<NavigationProp<StackParamList>>();

	return (
		<Drawer ref={ref} snapPoints={[112]}>
			<BasicButton
				onPress={() => {
					ref?.current?.forceClose();
					navigation.navigate('Feed', { mode: 'create' });
				}}
				icon={<Icon name={PlusIcon} size={20} />}
				pressableComponent={<Pressable.Background px={2} py={1} />}
			>
				Add new RSS feed
			</BasicButton>

			<BasicButton
				onPress={() => {
					ref?.current?.forceClose();
					navigation.navigate('Category', { mode: 'create' });
				}}
				icon={<Icon name={FolderPlusIcon} size={20} />}
				pressableComponent={<Pressable.Background px={2} py={1} />}
			>
				Create new category
			</BasicButton>
		</Drawer>
	);
});
