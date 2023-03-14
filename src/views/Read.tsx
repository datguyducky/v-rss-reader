import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { FeedItem } from 'react-native-rss-parser';

import { SwipeableFeedItem } from '../components/SwipeableFeedItem';
import { Text } from '../components/Text';
import { QuickAction } from '../drawers/QuickAction';
import { useFeedsCategories } from '../hooks/useFeedsCategories';
import { useRssFetch } from '../hooks/useRssFetch';
import { Layout } from '../layouts/Layout';

export const Read = () => {
	const { activeItemDetails } = useFeedsCategories();

	const [fetchRss, { loading }] = useRssFetch();
	const [rssItems, setRssItems] = useState<FeedItem[]>([]);

	const quickActionDrawerRef = useRef<BottomSheetModal>(null);

	useEffect(() => {
		const handleItems = async () => {
			if (activeItemDetails.type === 'CATEGORY') {
				/**
				 * TODO: Here we need to fetch every feed separately and store the returned data in local state, I think there's two solutions here:
				 * - Just map activeItemsDetails feeds and fetch each feed separately and add it to the local state
				 * - or maybe we can refactor the fetchRss hook so it accepts array of urls
				 */
			} else {
				const { data } = await fetchRss(activeItemDetails.url);

				setRssItems(data?.items || []);
			}
		};

		if (activeItemDetails?.id) {
			handleItems();
		}

		//return () => abortController.abort(); TODO: re-add this?
	}, [activeItemDetails]);

	/**
	 * TODO: Refactor layout for this view?
	 * - Display nothing on the header when we're at the top of the view? Display big text on layout.
	 * - On scroll (after we scrolled 'x' pixels) -> hide the text on a layout, and display a text on the header with some smooth animation (probably just opacity transform)
	 */

	return (
		<>
			<Layout>
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
						contentContainerStyle={{ paddingVertical: 24 }}
						ListEmptyComponent={() => (
							<Text weight={300} fontSize={12}>
								Sorry, something went wrong and no articles were found for this
								feed.
							</Text>
						)}
					/>
				)}
			</Layout>

			<QuickAction ref={quickActionDrawerRef} />
		</>
	);
};
