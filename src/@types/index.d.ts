import { Feed, FeedItem } from 'react-native-rss-parser';

import { SettingsFormValues } from '@forms/SettingsForm';

export interface FeedCardProps {
	title: string;
	handlePress: () => void;
	domainName: string;
	publishedAt: string;
	density: FeedsFilters['feedDensity'];
	actionPress: SettingsFormValues['quickActionDrawerGesture'];
	thumbnailUrl?: string;
	handleActionPress?: () => void;
	description?: string;
}

export interface RssFeed extends Feed {
	items: RssFeedItem[];
}

export interface RssFeedItem extends FeedItem {
	feedAppCategory?: string;
	imageUrl?: string;
}

export interface FeedsFilters {
	sortBy: 'LATEST' | 'OLDEST';
	feedView: 'TEXT_ONLY' | 'MAGAZINE' | 'THUMBNAIL';
	feedDensity: 'COMPACT' | 'COMFORTABLE';
}
