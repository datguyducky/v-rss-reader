import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ForwardedRef, forwardRef } from 'react';
import { PlusIcon, FolderPlusIcon } from 'react-native-heroicons/outline';

import { BasicButton } from '../components/BasicButton';
import { Drawer } from '../components/Drawer';

export const CreateSelection = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		return (
			<Drawer ref={ref} snapPoints={[112]}>
				<BasicButton
					onPress={() => {
						ref?.current?.forceClose();
						navigation.navigate('Feed');
					}}
					icon={<PlusIcon size={20} color="#101113" />}
					mb={16}
				>
					Add new RSS feed
				</BasicButton>

				<BasicButton
					onPress={() => {
						ref?.current?.forceClose();
						navigation.navigate('Category');
					}}
					icon={<FolderPlusIcon size={20} color="#101113" />}
				>
					Create new category
				</BasicButton>
			</Drawer>
		);
	},
);
