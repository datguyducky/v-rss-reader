import { SettingsFormValues } from '@forms/SettingsForm';

import { FeedsFilters } from '../@types';

export const DEFAULT_FILTERS_VALUES: FeedsFilters = {
	sortBy: 'LATEST',
	feedView: 'MAGAZINE',
	feedDensity: 'COMPACT',
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
