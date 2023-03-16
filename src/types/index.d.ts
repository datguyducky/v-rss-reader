export interface FeedCardProps {
	title: string;
	url: string;
	domainName: string;
	publishedAt: string;
	density: 'COMPACT' | 'COMFORTABLE';
	thumbnailUrl?: string;
	onLongPress?: () => void;
	description?: string;
}
