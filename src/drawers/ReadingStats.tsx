import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef } from 'react';
import { View } from 'react-native';

import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { Text } from '../components/Text';
import { SectionCount, SectionTitle, SectionWrap } from './ReadingStats.styles';

export const ReadingStats = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		return (
			<Drawer ref={ref} snapPoints={[376]} detached bottomInset={24}>
				<Text
					fontFamily="Montserrat"
					fontSize={18}
					color="#228BE6"
					weight={600}
					mb={16}
					textAlign="center"
				>
					Reading Stats
				</Text>

				<SectionWrap mb={16}>
					<SectionTitle>Total articles read</SectionTitle>
					<SectionCount>XX</SectionCount>
				</SectionWrap>

				<SectionWrap>
					<SectionTitle>Average number of articles read per day:</SectionTitle>
					<SectionCount>XX</SectionCount>
				</SectionWrap>

				<Divider my={16} />

				<SectionWrap mb={16}>
					<SectionTitle>Current reading streak (5 articles/day)</SectionTitle>
					<SectionCount>XX</SectionCount>
				</SectionWrap>

				<SectionWrap>
					<SectionTitle>Longest reading streak (5 articles/day)</SectionTitle>
					<SectionCount>XX</SectionCount>
				</SectionWrap>

				<Divider my={16} />

				<SectionWrap>
					<SectionTitle>Total time spent reading</SectionTitle>
					<SectionCount>XX</SectionCount>
				</SectionWrap>
			</Drawer>
		);
	},
);
