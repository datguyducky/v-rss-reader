import { SettingsFormValues } from '../forms/SettingsForm';
import { Feed, FeedItem } from 'react-native-rss-parser';

export interface FeedCardProps {
	title: string;
	handlePress: () => void;
	domainName: string;
	publishedAt: string;
	density: 'COMPACT' | 'COMFORTABLE';
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
