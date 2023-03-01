import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { FlatList, View } from 'react-native';

import { DEFAULT_SETTINGS_VALUES, FEEDS } from '../common/constants';
import { SwipeableFeedItem } from '../components/SwipeableFeedItem';
import { QuickAction } from '../drawers/QuickAction';
import { Layout } from '../layouts/Layout';
import { useFeedsCategories } from '../hooks/useFeedsCategories';

const feedTest = 'https://reddit.com/r/popular/.rss?geo_filter=GLOBAL';

export const Read = ({ route }) => {
	const { id } = route?.params || {};
	const { feedsCategories } = useFeedsCategories();

	const quickActionDrawerRef = useRef<BottomSheetModal>(null);

	useEffect(() => {
		//console.log(id); // TODO: Handle displaying correct feeds via retrieved id
	}, [id]);

	return (
		<>
			<Layout>
				<FlatList
					data={FEEDS}
					renderItem={p => (
						<SwipeableFeedItem
							item={p.item}
							onLongPress={() => quickActionDrawerRef?.current?.present()}
						/>
					)}
					keyExtractor={item => item.id}
					ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
					contentContainerStyle={{ paddingVertical: 24 }}
				/>
			</Layout>

			<QuickAction ref={quickActionDrawerRef} />
		</>
	);
};
