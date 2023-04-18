import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useMMKVListener, useMMKVObject } from 'react-native-mmkv';
import { Feed, FeedItem } from 'react-native-rss-parser';
import { useTheme } from 'styled-components/native';

import { EmptyCategoryText } from './Read.styles';
import { DEFAULT_FILTERS_VALUES, DEFAULT_SETTINGS_VALUES } from '../common/constants';
import { SwipeableFeedItem } from '../components/SwipeableFeedItem';
import { useFeedsCategoriesContext } from '../context/FeedsCategoriesContext';
import { useReadLaterContext } from '../context/ReadLaterContext';
import { FilterFormValues } from '../drawers/Filters';
import { QuickAction } from '../drawers/QuickAction';
import { SettingsFormValues } from '../forms/SettingsForm';
import { useRssFetch } from '../hooks/useRssFetch';
import { Layout } from '../layouts/Layout';

export const Read = ({ scrollY, title }) => {
	const theme = useTheme();

	const { activeItem, feedsCategories } = useFeedsCategoriesContext();
	const [loadingTest, setLoadingTest] = useState(false);

	const [appSettings = DEFAULT_SETTINGS_VALUES] =
		useMMKVObject<SettingsFormValues>('appSettings');
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FilterFormValues>('feedFilters');
	const { readLaterFeedsCategories } = useReadLaterContext();

	const [fetchRss, { loading }] = useRssFetch();
	const [rssItems, setRssItems] = useState<FeedItem[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [reRender, setReRender] = useState(new Date().getTime());
	const [isScrolling, setIsScrolling] = useState(false);

	// TODO: I wonder is there a better way to handle this than this state? Maybe context could work here...
	const [selectedFeedData, setSelectedFeedData] = useState<FeedItem | undefined>();

	const quickActionDrawerRef = useRef<BottomSheetModal>(null);

	const retrieveRssFeeds = async () => {
		if (activeItem.type === 'CATEGORY') {
			const { data } = await fetchRss(activeItem.feeds);

			if (data) {
				const items: FeedItem[] = data
					.reduce((acc: FeedItem[], feed: Feed) => {
						return [
							...acc,
							...feed.items.map(item => ({
								...item,
								feedAppCategory: feed.feedAppCategory,
							})),
						];
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
			const { data } = await fetchRss(activeItem.url);

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

		setLoadingTest(false);
	};

	const retrieveAllRssFeeds = async () => {
		const urlArray = feedsCategories.reduce((urls: string[], item) => {
			if (item.url) {
				urls.push(item);
			}
			if (item.feeds && item.feeds.length) {
				const nestedUrls = item.feeds.reduce((nestedUrls, nestedItem) => {
					if (nestedItem.url) {
						nestedUrls.push(nestedItem);
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
					return [
						...acc,
						...feed.items.map(item => ({
							...item,
							feedAppCategory: feed.feedAppCategory,
						})),
					];
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

		setLoadingTest(false);
	};

	const getFeeds = () => {
		if (activeItem?.id) {
			retrieveRssFeeds();
		}
		// Here we handle if the current view is the build-in "Read later" or "All articles" view
		else {
			if (title === 'All articles') {
				retrieveAllRssFeeds();
			} else if (title === 'Read later') {
				setRssItems(readLaterFeedsCategories);
				setLoadingTest(false);
			} else {
				setLoadingTest(false);
			}
		}
	};

	useEffect(() => {
		setLoadingTest(true);

		getFeeds();

		return () => setLoadingTest(false);
	}, [activeItem, feedFilters?.SORT_BY, title, readLaterFeedsCategories]);

	const handleRefresh = async () => {
		setRefreshing(true);

		getFeeds();

		setRefreshing(false);

		return () => {
			setRefreshing(false);
		};
	};

	// Updating local state when app settings are changed to make sure that the FlatList is rendered again, with new props based on the new app settings values
	useMMKVListener(key => {
		if (key === 'appSettings') {
			setReRender(new Date().getTime());
		}
	});

	const handleScroll = () => {
		setIsScrolling(true);
	};

	const handleScrollEnd = () => {
		setIsScrolling(false);
	};

	const getItemLayout = (index: number) => {
		let itemHeight;
		switch (feedFilters.FEED_VIEW) {
			case 'MAGAZINE':
				itemHeight = feedFilters?.FEED_DENSITY === 'COMPACT' ? 80 : 116;
				break;

			case 'THUMBNAIL':
				itemHeight = feedFilters?.FEED_DENSITY === 'COMPACT' ? 192 : 210;
				break;
		}

		return {
			length: itemHeight as number,
			offset: (itemHeight as number) * index,
			index,
		};
	};

	return (
		<>
			<Layout
				scrollY={scrollY}
				animatedTitle={activeItem?.name || title}
				horizontalPadding={false}
				headingSpacing={12}
			>
				{loading || loadingTest ? (
					<ActivityIndicator size="large" color={theme.colors.primary} />
				) : (
					<FlatList
						key={reRender}
						data={rssItems}
						onScroll={handleScroll}
						onScrollEndDrag={handleScrollEnd}
						renderItem={p => (
							<SwipeableFeedItem
								item={p.item}
								handleActionPress={() => {
									setSelectedFeedData(p.item);
									quickActionDrawerRef?.current?.present();
								}}
								enabled={!isScrolling}
							/>
						)}
						keyExtractor={item => item?.id || item.links?.[0]?.url}
						contentContainerStyle={{ paddingVertical: 8 }}
						ListEmptyComponent={() => (
							<EmptyCategoryText weight={300} fontSize={12}>
								Sorry, something went wrong and no articles were found for this
								feed.
							</EmptyCategoryText>
						)}
						scrollEventThrottle={16}
						refreshControl={
							!appSettings.disablePullRefresh ? (
								<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
							) : undefined
						}
						// I would watch out with using the 'pagingEnabled' prop, as per the React Native (v0.71) docs it's not supported for vertical lists,
						// but as shown in our app - it works, but it's possible that it's buggy in some untested ways or devices, so if there's ever an issue reported about this functionality then
						// it would be smart to start here.
						pagingEnabled={appSettings?.scrollBehaviour === 'PAGED' ? true : undefined}
						decelerationRate={appSettings?.scrollBehaviour === 'PAGED' ? 0 : undefined}
						disableIntervalMomentum={
							appSettings?.scrollBehaviour === 'PAGED' ? true : undefined
						}
						snapToAlignment={
							appSettings?.scrollBehaviour === 'PAGED' ? 'start' : undefined
						}
						getItemLayout={
							feedFilters.FEED_VIEW !== 'TEXT_ONLY'
								? (_, index) => getItemLayout(index)
								: undefined
						}
					/>
				)}
			</Layout>

			<QuickAction ref={quickActionDrawerRef} selectedFeedData={selectedFeedData} />
		</>
	);
};
