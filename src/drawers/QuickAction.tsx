import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef } from 'react';
import { CheckCircleIcon, ArchiveBoxIcon, ShareIcon } from 'react-native-heroicons/outline';

import { BasicButton } from '../components/BasicButton';
import { Drawer } from '../components/Drawer';
import { Icon } from '../components/Icon';

export const QuickAction = forwardRef((_, ref: ForwardedRef<BottomSheetModal>) => {
	return (
		<Drawer ref={ref} snapPoints={[98]} horizontalContent>
			<BasicButton
				onPress={() => console.log('TODO: handle `mark as read` action')}
				icon={<Icon name={CheckCircleIcon} size={24} />}
				textSize={12}
				vertical
				spacing={0}
			>
				Read
			</BasicButton>

			<BasicButton
				onPress={() => console.log('TODO: handle `save` action')}
				icon={<Icon name={ArchiveBoxIcon} size={24} />}
				textSize={12}
				vertical
				spacing={0}
			>
				Save
			</BasicButton>

			<BasicButton
				onPress={() => console.log('TODO: handle `share` action')}
				icon={<Icon name={ShareIcon} size={24} />}
				textSize={12}
				vertical
				spacing={0}
			>
				Share
			</BasicButton>
		</Drawer>
	);
});
