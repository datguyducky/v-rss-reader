import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { Layout } from '../layouts/Layout';
import { StatusBar } from 'expo-status-bar';
import { FEEDS } from '../common/constants';
import { MagazineCard } from '../components/MagazineCard';
import { FlatList } from 'react-native';
import { TextOnlyCard } from '../components/TextOnlyCard';

export const Read = ({ navigation }: StackScreenProps<any>) => {
	const renderFeedCard = ({ item }) => {
		const viewType = 'TEXT_ONLY';

		switch (viewType) {
			case 'TEXT_ONLY':
				return (
					<TextOnlyCard
						title={item.title}
						onLongPress={() => navigation.navigate('QuickAction')}
						mb={16}
						url={item.link._href}
					/>
				);

			case 'MAGAZINE':
				return (
					<MagazineCard
						title={item.title}
						onLongPress={() => navigation.navigate('QuickAction')}
						mb={16}
						thumbnailUrl={item.thumbnail?._url}
						url={item.link._href}
					/>
				);

			case 'THUMBNAIL':
				return <></>;
		}
	};

	return (
		<>
			<StatusBar backgroundColor="#fff" style="dark" />

			<Layout>
				<FlatList data={FEEDS} renderItem={renderFeedCard} keyExtractor={item => item.id} />
			</Layout>
		</>
	);
};
