import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { FlatList, View } from 'react-native';

import { FEEDS } from '../common/constants';
import { SwipeableFeedItem } from '../components/SwipeableFeedItem';
import { Layout } from '../layouts/Layout';

export const Read = ({ navigation }: StackScreenProps<any>) => {
	return (
		<>
			<StatusBar backgroundColor="#fff" style="dark" />

			<Layout viewType="MAGAZINE">
				<FlatList
					data={FEEDS}
					renderItem={p => (
						<SwipeableFeedItem
							item={p.item}
							onLongPress={() => navigation.navigate('QuickAction')}
						/>
					)}
					keyExtractor={item => item.id}
					ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
				/>
			</Layout>
		</>
	);
};
