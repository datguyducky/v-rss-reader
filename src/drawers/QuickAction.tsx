import React, { useRef } from 'react';
import { View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { CheckCircleIcon, ArchiveBoxIcon, ShareIcon } from 'react-native-heroicons/outline';

import { Drawer } from '../components/Drawer';
import { BasicButton } from '../components/BasicButton';

export const QuickAction = ({ navigation }: StackScreenProps<any>) => {
	const actionDrawerRef = useRef<BottomSheet>(null);

	return (
		<Drawer
			onClose={() => navigation.navigate('TabScreen', { screen: 'Read' })}
			ref={actionDrawerRef}
			snapPoints={[98]}
		>
			<View
				style={{ flexDirection: 'row', justifyContent: 'space-around' }}
				onLayout={event => console.log(event.nativeEvent.layout)}
			>
				<BasicButton
					onPress={() => console.log('TODO: handle `mark as read` action')}
					icon={<CheckCircleIcon size={24} color="#101113" />}
					textSize={12}
					vertical
					spacing={0}
				>
					Read
				</BasicButton>

				<BasicButton
					onPress={() => console.log('TODO: handle `save` action')}
					icon={<ArchiveBoxIcon size={24} color="#101113" />}
					textSize={12}
					vertical
					spacing={0}
				>
					Save
				</BasicButton>

				<BasicButton
					onPress={() => console.log('TODO: handle `share` action')}
					icon={<ShareIcon size={24} color="#101113" />}
					textSize={12}
					vertical
					spacing={0}
				>
					Share
				</BasicButton>
			</View>
		</Drawer>
	);
};
