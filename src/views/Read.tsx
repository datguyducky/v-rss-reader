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
import { useReadLater } from '../hooks/useReadLater';
import { useRssFetch } from '../hooks/useRssFetch';
import { Layout } from '../layouts/Layout';

export const Read = ({ scrollY, title }) => {
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');
	const { activeItemDetails, feedsCategories } = useFeedsCategories();
	const { readLaterFeedsCategories } = useReadLater();

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
					}); // TODO: As this is repeated a couple of times already I think it needs to be refactored to a reusable utility function. :)

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

	const retrieveAllRssFeeds = async () => {
		const urlArray = feedsCategories.reduce((urls: string[], item) => {
			if (item.url) {
				urls.push(item.url);
			}
			if (item.feeds && item.feeds.length) {
				const nestedUrls = item.feeds.reduce((nestedUrls, nestedItem) => {
					if (nestedItem.url) {
						nestedUrls.push(nestedItem.url);
					}
					return nestedUrls;
				}, []);
				urls = urls.concat(nestedUrls);
			}
			return urls;
		}, []);

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
	};

	useEffect(() => {
		if (activeItemDetails?.id) {
			retrieveRssFeeds();
		}
		// Here we handle if the current view is the build-in "Read later" or "All articles" view
		else {
			if (title === 'All articles') {
				retrieveAllRssFeeds();
			} else if (title === 'Read later') {
				setRssItems(readLaterFeedsCategories);
			}
		}

		//return () => abortController.abort(); TODO: re-add this?
	}, [activeItemDetails, feedFilters?.SORT_BY, title, readLaterFeedsCategories]);

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
