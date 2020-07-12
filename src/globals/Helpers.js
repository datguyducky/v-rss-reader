import AsyncStorage from '@react-native-community/async-storage';


export const scrollHandler = (event, props, editActive) => {
	const appTheme = props.theme;

	const SCROLL_Y = event.nativeEvent.contentOffset.y;
	editActive = editActive || false;
	props.navigation.setOptions({
		// hide elevation (shadow) when we're at the top of this screen
		// and show it, when we're not
		headerStyle: {
			elevation: SCROLL_Y <= 8 ? 0 : 4,
			// fix to set header backgroundColor to proper one, when edit mode is active
			// IMPORTANT, without this header background color is reset to default color
			backgroundColor: editActive ? appTheme.BRAND : appTheme.MAIN_BG
		}	
	})
};

export const defaultStats = async () => {
	const USER_STATS = {
		app_launch: '',
		news_opened: 0,
		reading_streak: 0,
		reading_longest_streak: 0,
		last_day: 0
	};


	let LAUNCH = new Date();
	LAUNCH.setMinutes(LAUNCH.getDate() - LAUNCH.getTimezoneOffset());
	let TODAY = new Date(LAUNCH);

	// date when app was first launched (YEAR-MONTH-DAY H:M)
	LAUNCH = LAUNCH.toJSON().slice(0, 16).replace('T', ' ');

	// setting today as a initial date for lastDay key (used later by reading_streak)
	USER_STATS.last_day = TODAY;


	// everything to AsyncStorage
	USER_STATS.app_launch = LAUNCH;
	AsyncStorage.setItem('user_stats', JSON.stringify(USER_STATS));
};

export const defaultSettings = async () => {
	const CREATE_SETTINGS = {
		theme: 'light',
		max_articles: 0, // TODO
		brand_color: '', // TODO
		max_cat: 0, // TODO
		max_cat_feeds: 0 // TODO
	}

	AsyncStorage.setItem('user_settings', JSON.stringify(CREATE_SETTINGS));
}

export const convertToRedesign = async () => {
	// getting all storage keys used by V app
	let ALL_KEYS = await AsyncStorage.getAllKeys();

	// storage key for categories used with redesign
	let USER_CATEGORIES = await AsyncStorage.getItem('user_categories');
	USER_CATEGORIES  = JSON.parse(USER_CATEGORIES);

	// old storage key for categories used before redesign
	let OLD_custom_feeds = await AsyncStorage.getItem('custom_feeds');
	OLD_custom_feeds = JSON.parse(OLD_custom_feeds);


	if(OLD_custom_feeds !== null) {
		for(let i=0; i<OLD_custom_feeds.length; i++) {
			// converting category
			let new_cat = {
				name: 'OLD ' + OLD_custom_feeds[i].category,
				id: 0,
				feeds: []
			}



			if(USER_CATEGORIES !== null) {
				new_cat.id = USER_CATEGORIES[USER_CATEGORIES.length - 1].id + 1;
			}

			// converting feeds for this category
			for(let j=0; j<OLD_custom_feeds[i].feeds.length; j++) {
				const FEED = OLD_custom_feeds[i].feeds[j];
				let new_feeds = {
					id: FEED.id,
					name: FEED.name,
					href: FEED.url
				}

				new_cat.feeds.push(new_feeds);
			}

			// adding converted user category to an array of all user categories
			USER_CATEGORIES.push(new_cat);
		}

		// saving converted category to a storage
		AsyncStorage.setItem('user_categories', JSON.stringify(USER_CATEGORIES));
	}

	// name of keys that were added with redesign and we don't want to delete them
	// when converting old keys to redesign ones
	const DONT_TOUCH_KEYS = [
		'user_settings',
		'user_stats',
		'user_categories',
		'user_nocatfeeds'
	];

	for(let i=0; i<DONT_TOUCH_KEYS.length; i++) {
		const INDEX = ALL_KEYS.indexOf(DONT_TOUCH_KEYS[i]);
		if(INDEX !== -1) {
			// find an index of key that we don't want to delete
			// and remove it from the ALL_KEYS array which stores all old keys that will be removed in the next step
			ALL_KEYS.splice(INDEX, 1);
		}
	}
	

	// delete all old keys from storage
	await AsyncStorage.multiRemove(ALL_KEYS);
}