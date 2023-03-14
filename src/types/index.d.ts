export interface FeedCardProps {
	title: string;
	url: string;
	domainName: string;
	publishedAt: string;
	thumbnailUrl?: string;
	onLongPress?: () => void;
}
