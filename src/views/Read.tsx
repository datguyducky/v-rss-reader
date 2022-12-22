import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { Layout } from '../layouts/Layout';
import { StatusBar } from 'expo-status-bar';
import { FEEDS } from '../common/constants';
import { MagazineCard } from '../components/MagazineCard';
import { FlatList } from 'react-native';

export const Read = ({ navigation }: StackScreenProps<any>) => {
	const renderFeedCard = ({ item }) => (
		<MagazineCard
			title={item.title}
			onLongPress={() => navigation.navigate('QuickAction')}
			mb={16}
			thumbnailUrl={item.thumbnail?._url}
			url={item.link._href}
		/>
	);

	return (
		<>
			<StatusBar backgroundColor="#fff" style="dark" />

			<Layout>
				<FlatList data={FEEDS} renderItem={renderFeedCard} keyExtractor={item => item.id} />
			</Layout>
		</>
	);
};
