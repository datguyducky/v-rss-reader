import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, FlatList, RefreshControl } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useMMKVListener, useMMKVObject } from 'react-native-mmkv';
import { useTheme } from 'styled-components/native';

import { DEFAULT_FILTERS_VALUES, DEFAULT_SETTINGS_VALUES } from '@common/constants';
import { SwipeableFeedItem } from '@components/SwipeableFeedItem';
import { Text } from '@components/Text';
import { useFeedsCategoriesContext } from '@context/FeedsCategoriesContext';
import { useReadLaterContext } from '@context/ReadLaterContext';
import { SettingsFormValues } from '@forms/SettingsForm';
import { Feed } from '@hooks/useFeedsCategories';
import { useRssFetch } from '@hooks/useRssFetch';
import { Layout } from '@layouts/Layout';

import { FeedsFilters, RssFeed, RssFeedItem } from '../@types';
import { QuickAction } from '../drawers/QuickAction';
import { TabParamList } from '../routing/Routes';

export const Read = ({
	scrollY,
	title,
}: { scrollY: Animated.Value; title: string } & BottomTabScreenProps<TabParamList, 'Read'>) => {
	const theme = useTheme();

	const [fetchRss, { loading }] = useRssFetch();

	const { activeItem, feedsCategories } = useFeedsCategoriesContext();
	const { readLaterFeedsCategories } = useReadLaterContext();
	const [appSettings = DEFAULT_SETTINGS_VALUES] =
		useMMKVObject<SettingsFormValues>('appSettings');
	const [feedFilters = DEFAULT_FILTERS_VALUES] = useMMKVObject<FeedsFilters>('feedFilters');

	const [loadingFeeds, setLoadingFeeds] = useState(false);
	const [rssItems, setRssItems] = useState<RssFeedItem[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [reRender, setReRender] = useState(new Date().getTime());
	const [isScrolling, setIsScrolling] = useState(false);

	// TODO: I wonder is there a better way to handle this than this state? Maybe context could work here...
	const [selectedFeedData, setSelectedFeedData] = useState<RssFeedItem | undefined>();

	const quickActionDrawerRef = useRef<BottomSheetModal>(null);

	const retrieveRssFeeds = async () => {
		setLoadingFeeds(true);

		if (!activeItem) {
			setLoadingFeeds(false);
			return;
		}

		if (activeItem.type === 'CATEGORY') {
			const { data } = await fetchRss(activeItem.feeds);

			if (data) {
				const items: RssFeedItem[] = data
					.reduce((acc: RssFeedItem[], feed: RssFeed) => {
						return [
							...acc,
							...feed.items.map(item => ({
								...item,
							})),
						];
					}, [])
					.sort((a, b) => {
						const dateA = new Date(a.published);
						const dateB = new Date(b.published);
						if (feedFilters.sortBy === 'OLDEST') {
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
					if (feedFilters.sortBy === 'OLDEST') {
						return dateA.getTime() - dateB.getTime();
					} else {
						return dateB.getTime() - dateA.getTime();
					}
				});

				setRssItems(sortedItems);
			}
		}

		setLoadingFeeds(false);
	};

	const retrieveAllRssFeeds = async () => {
		setLoadingFeeds(true);

		const urlArray = feedsCategories.reduce((urls: Feed[], item) => {
			if (item.type === 'FEED' && item.url) {
				urls.push(item);
			}

			if (item.type === 'CATEGORY' && item.feeds && item.feeds.length) {
				const nestedUrls = item.feeds.reduce((nestedUrls: Feed[], nestedItem) => {
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
			const items: RssFeedItem[] = data
				.reduce((acc: RssFeedItem[], feed) => {
					return [
						...acc,
						...feed.items.map(item => ({
							...item,
						})),
					];
				}, [])
				.sort((a, b) => {
					const dateA = new Date(a.published);
					const dateB = new Date(b.published);
					if (feedFilters.sortBy === 'OLDEST') {
						return dateA.getTime() - dateB.getTime();
					} else {
						return dateB.getTime() - dateA.getTime();
					}
				});

			setRssItems(items);
		}

		setLoadingFeeds(false);
	};

	const getFeeds = async () => {
		if (activeItem?.id) {
			await retrieveRssFeeds();
		}
		// Here we handle if the current view is the build-in "Read later" or "All articles" view
		else {
			if (title === 'All articles') {
				await retrieveAllRssFeeds();
			}
		}
	};

	// Loading category/feed items or all articles if that view is active
	useEffect(() => {
		getFeeds();

		return () => {
			setLoadingFeeds(false);
			setRssItems([]);
		};
	}, [activeItem, feedFilters?.sortBy, title]);

	// Loading only "read later" items
	useEffect(() => {
		if (title === 'Read later') {
			setRssItems(readLaterFeedsCategories);
		}

		return () => {
			if (title === 'Read later') {
				setRssItems([]);
			}
		};
	}, [readLaterFeedsCategories, title, feedFilters?.sortBy]);

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
		switch (feedFilters.feedView) {
			case 'MAGAZINE':
				itemHeight = feedFilters?.feedDensity === 'COMPACT' ? 80 : 116;
				break;

			case 'THUMBNAIL':
				itemHeight = feedFilters?.feedDensity === 'COMPACT' ? 192 : 210;
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
					ListEmptyComponent={() =>
						loadingFeeds || loading ? (
							<ActivityIndicator size="large" color={theme.colors.primary} />
						) : (
							<Text weight={300} fontSize={12} textAlign="center" mx={1.5}>
								{title === 'Read later'
									? 'Looks like there are no articles currently saved for reading later. To add articles, simply swipe any article you want to revisit in the future.'
									: 'We apologize, but there are no articles available for this feed at the moment. If you suspect a bug, please report it to us.'}
							</Text>
						)
					}
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
					snapToAlignment={appSettings?.scrollBehaviour === 'PAGED' ? 'start' : undefined}
					getItemLayout={
						feedFilters.feedView !== 'TEXT_ONLY'
							? (_, index) => getItemLayout(index)
							: undefined
					}
				/>
			</Layout>

			<QuickAction ref={quickActionDrawerRef} selectedFeedData={selectedFeedData} />
		</>
	);
};
