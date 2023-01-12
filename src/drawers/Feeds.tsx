import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ForwardedRef, forwardRef } from 'react';
import { View } from 'react-native';
import { InboxStackIcon, ArchiveBoxIcon } from 'react-native-heroicons/outline';

import { BasicButton } from '../components/BasicButton';
import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { Text } from '../components/Text';

export const Feeds = forwardRef((_, ref: ForwardedRef<BottomSheetModal>) => {
	// TODO: this Drawer needs to be scrollable
	return (
		<Drawer ref={ref} snapPoints={[256, '85%']}>
			<BasicButton
				onPress={() => console.log('TODO: open all articles view')}
				icon={<InboxStackIcon size={20} color="#101113" />}
				mb={16}
				rightInfo={
					<Text color="#4DABF7" fontSize={14} fontFamily="Montserrat">
						000
					</Text>
				} // TODO: make this Text into a separate component?
			>
				All articles
			</BasicButton>

			<BasicButton
				onPress={() => console.log('TODO: open all articles view')}
				icon={<ArchiveBoxIcon size={20} color="#101113" />}
				rightInfo={
					<Text color="#4DABF7" fontSize={14} fontFamily="Montserrat">
						000
					</Text>
				}
			>
				Read later
			</BasicButton>

			<Divider my={16} />

			<BasicButton
				onPress={() => console.log('TODO: open all articles view')}
				icon={
					<View
						style={{
							backgroundColor: 'red',
							width: 20,
							height: 20,
							borderRadius: 20,
						}}
					/>
				}
				mb={16}
				rightInfo={
					<Text color="#4DABF7" fontSize={14} fontFamily="Montserrat">
						000
					</Text>
				}
			>
				Feed name
			</BasicButton>

			{/* TODO: Add Accordion component for categories... */}
		</Drawer>
	);
});
