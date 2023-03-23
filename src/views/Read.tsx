import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { Feed, FeedItem } from 'react-native-rss-parser';

import { DEFAULT_FILTERS_VALUES } from '../common/constants';
import { SwipeableFeedItem } from '../components/SwipeableFeedItem';
import { Text } from '../components/Text';
import { FilterFormValues } from '../drawers/Filters';
import { QuickAction } from '../drawers/QuickAction';
import { useFeedsCategories } from '../hooks/useFeedsCategories';
import { useRssFetch } from '../hooks/useRssFetch';
import { Layout } from '../layouts/Layout';

export const Read = ({ scrollY, title }) => {
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');
	const { activeItemDetails } = useFeedsCategories();

	const [fetchRss, { loading }] = useRssFetch();
	const [rssItems, setRssItems] = useState<FeedItem[]>([]);

	const quickActionDrawerRef = useRef<BottomSheetModal>(null);

	useEffect(() => {
		const handleItems = async () => {
			if (activeItemDetails.type === 'CATEGORY') {
				const urlArray = activeItemDetails.feeds.map(
					(feed: Record<string, unknown>) => feed.url,
				);

				const { data } = await fetchRss(urlArray);

				if (data) {
					const items: FeedItem[] = data
						.reduce((acc: FeedItem[], feed: Feed) => {
							return [...acc, ...feed.items];
						}, [])
						.sort((a, b) => {
							const dateA = new Date(a.published);
							const dateB = new Date(b.published);
							if (feedFilters.SORT_BY === 'OLDEST') {
								return dateA.getTime() - dateB.getTime();
							} else {
								return dateB.getTime() - dateA.getTime();
							}
						});

					setRssItems(items);
				}
			} else {
				const { data } = await fetchRss(activeItemDetails.url);

				if (data) {
					setRssItems(data[0].items);
				}
			}
		};

		if (activeItemDetails?.id) {
			handleItems();
		}

		//return () => abortController.abort(); TODO: re-add this?
	}, [activeItemDetails, feedFilters?.SORT_BY]);

	return (
		<>
			<Layout scrollY={scrollY} animatedTitle={activeItemDetails?.name || title}>
				{loading ? (
					<ActivityIndicator size="large" color="#228be6" />
				) : (
					<FlatList
						data={rssItems}
						renderItem={p => (
							<SwipeableFeedItem
								item={p.item}
								onLongPress={() => quickActionDrawerRef?.current?.present()}
							/>
						)}
						keyExtractor={item => item?.id || item.links?.[0]?.url}
						ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
						contentContainerStyle={{ paddingVertical: 8 }}
						ListEmptyComponent={() => (
							<Text weight={300} fontSize={12}>
								Sorry, something went wrong and no articles were found for this
								feed.
							</Text>
						)}
						scrollEventThrottle={16}
					/>
				)}
			</Layout>

			<QuickAction ref={quickActionDrawerRef} />
		</>
	);
};
