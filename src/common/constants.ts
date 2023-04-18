import { FilterFormValues } from '../drawers/Filters';
import { SettingsFormValues } from '../forms/SettingsForm';

export const DEFAULT_FILTERS_VALUES: FilterFormValues = {
	SORT_BY: 'LATEST',
	FEED_VIEW: 'MAGAZINE',
	FEED_DENSITY: 'COMFORTABLE',
};

export const DEFAULT_SETTINGS_VALUES: SettingsFormValues = {
	readOnScroll: false,
	scrollBehaviour: 'SMOOTH',
	autoNextSection: true,
	quickActionDrawerGesture: 'LONG_PRESS',
	invertSwipe: false,
	disablePullRefresh: false,
	sortAlphabetically: true,
	hideFeedUnreadCount: false,
	hideFeedIcons: false,
	disableArticleImages: false,
	trackOnHeader: true,
	disableReadingStatistics: false,
	startWithCategoriesOpen: false,
};
