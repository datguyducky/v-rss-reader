import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
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
	const [refreshing, setRefreshing] = useState(false);

	// TODO: I wonder is there a better way to handle this than this state? Maybe context could work here...
	const [selectedFeedData, setSelectedFeedData] = useState<FeedItem | undefined>();

	const quickActionDrawerRef = useRef<BottomSheetModal>(null);

	const retrieveRssFeeds = async () => {
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
				const sortedItems = data[0].items.sort((a, b) => {
					const dateA = new Date(a.published);
					const dateB = new Date(b.published);
					if (feedFilters.SORT_BY === 'OLDEST') {
						return dateA.getTime() - dateB.getTime();
					} else {
						return dateB.getTime() - dateA.getTime();
					}
				});

				setRssItems(sortedItems);
			}
		}
	};

	useEffect(() => {
		if (activeItemDetails?.id) {
			retrieveRssFeeds();
		}

		//return () => abortController.abort(); TODO: re-add this?
	}, [activeItemDetails, feedFilters?.SORT_BY]);

	const handleRefresh = async () => {
		setRefreshing(true);
		await retrieveRssFeeds();

		setRefreshing(false);
	};

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
								onLongPress={() => {
									setSelectedFeedData(p.item);
									quickActionDrawerRef?.current?.present();
								}}
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
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
						}
					/>
				)}
			</Layout>

			<QuickAction ref={quickActionDrawerRef} selectedFeedData={selectedFeedData} />
		</>
	);
};
