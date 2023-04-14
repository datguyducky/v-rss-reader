import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

import { SectionCount, SectionTitle, SectionWrap } from './ReadingStats.styles';
import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { Text } from '../components/Text';
import { useAppUsageTime } from '../hooks/useAppUsageTime';
import { formatMinutes } from '../utils/formatMinutes';
import { getReadingStats } from '../utils/getReadingStats';

const DEFAULT_READING_STATS = {
	feedsOpened: '00',
	averageFeedsPerDay: '00',
	currentStreak: '00',
	longestStreak: '00',
	currentStreakAverageFeedsPerDay: '00',
	longestStreakAverageFeedsPerDay: '00',
};

export const ReadingStats = forwardRef(
	({ navigation }: { navigation: any }, ref: ForwardedRef<BottomSheetModal>) => {
		const theme = useTheme();

		const [appStats, setAppStats] = useState(DEFAULT_READING_STATS);

		const { appUsageTime, retrieveAppUsageTime } = useAppUsageTime();

		const handleDrawerChange = async (index: number) => {
			if (index === 0) {
				const storageStats = await getReadingStats();
				setAppStats(storageStats);
				retrieveAppUsageTime();
			} else if (index === -1) {
				setAppStats(DEFAULT_READING_STATS);
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
					<SectionCount>{appStats.feedsOpened}</SectionCount>
				</SectionWrap>

				<SectionWrap>
					<SectionTitle>Average number of articles read per day:</SectionTitle>
					<SectionCount>{appStats.averageFeedsPerDay}</SectionCount>
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
						>{`With average of ${appStats.currentStreakAverageFeedsPerDay} articles/day`}</SectionTitle>
					</View>

					<SectionCount>{appStats.currentStreak}</SectionCount>
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
						>{`With average of ${appStats.longestStreakAverageFeedsPerDay} articles/day`}</SectionTitle>
					</View>

					<SectionCount>{appStats.longestStreak}</SectionCount>
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
