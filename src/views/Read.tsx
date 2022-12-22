import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { Layout } from '../layouts/Layout';
import { StatusBar } from 'expo-status-bar';
import { FEEDS } from '../common/constants';
import { MagazineCard } from '../components/MagazineCard';

export const Read = ({ navigation }: StackScreenProps<any>) => {
	return (
		<>
			<StatusBar backgroundColor="#fff" style="dark" />

			<Layout>
				{FEEDS.map(feed => (
					<MagazineCard
						title={feed.title}
						onLongPress={() => navigation.navigate('QuickAction')}
					/>
				))}
			</Layout>
		</>
	);
};
