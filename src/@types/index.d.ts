import { SettingsFormValues } from '../forms/SettingsForm';

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
