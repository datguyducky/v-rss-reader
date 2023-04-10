import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

import { SectionCount, SectionTitle, SectionWrap } from './ReadingStats.styles';
import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { Text } from '../components/Text';
import { useReadingStats } from '../hooks/useReadingStats';
import { formatMinutes } from '../utils/formatMinutes';

export const ReadingStats = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		const theme = useTheme();

		const {
			feedsOpened,
			averageFeedsPerDay,
			currentStreak,
			currentStreakAverageFeedsPerDay,
			longestStreak,
			longestStreakAverageFeedsPerDay,
			retrieveElapsedTime,
			appUsageTime,
		} = useReadingStats();

		const handleDrawerChange = (index: number) => {
			if (index === 0) {
				retrieveElapsedTime();
			}
		};

		return (
			<Drawer
				ref={ref}
				snapPoints={[376]}
				detached
				bottomInset={24}
				onChange={handleDrawerChange}
				pt={3}
				px={2}
			>
				<Text
					fontFamily="Montserrat"
					fontSize={18}
					color={theme.colors.primary}
					weight={600}
					mb={2}
					textAlign="center"
				>
					Reading Stats
				</Text>

				<SectionWrap mb={2}>
					<SectionTitle>Total articles read</SectionTitle>
					<SectionCount>{feedsOpened}</SectionCount>
				</SectionWrap>

				<SectionWrap>
					<SectionTitle>Average number of articles read per day:</SectionTitle>
					<SectionCount>{averageFeedsPerDay}</SectionCount>
				</SectionWrap>

				<Divider my={2} />

				<SectionWrap mb={2}>
					<View style={{ width: '80%' }}>
						<SectionTitle style={{ width: '100%' }}>
							Current reading streak
						</SectionTitle>
						<SectionTitle
							weight={300}
							fontSize={12}
							style={{ width: '100%' }}
						>{`With average of ${currentStreakAverageFeedsPerDay} articles/day`}</SectionTitle>
					</View>

					<SectionCount>{currentStreak}</SectionCount>
				</SectionWrap>

				<SectionWrap>
					<View>
						<SectionTitle style={{ width: '100%' }}>
							Longest reading streak
						</SectionTitle>
						<SectionTitle
							weight={300}
							fontSize={12}
							style={{ width: '100%' }}
						>{`With average of ${longestStreakAverageFeedsPerDay} articles/day`}</SectionTitle>
					</View>

					<SectionCount>{longestStreak}</SectionCount>
				</SectionWrap>

				<Divider my={2} />

				<SectionWrap>
					<SectionTitle>Total time spent reading</SectionTitle>
					<SectionCount>{formatMinutes(parseInt(appUsageTime, 10))}</SectionCount>
				</SectionWrap>
			</Drawer>
		);
	},
);
