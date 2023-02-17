import { useState } from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import uuid from 'react-native-uuid';

// TODO: Separate hook for feeds and categories?
export const useFeedsCategories = () => {
	const [feedsCategories = [], setFeedsCategories] = useMMKVObject('feedsCategories');
	const createFeed = newFeed => {
		// TODO: Handle cases when category is passed.

		setFeedsCategories([...feedsCategories, { ...newFeed, id: uuid.v4(), type: 'FEED' }]);
	};

	const createCategory = newCategory => {
		setFeedsCategories([
			...feedsCategories,
			{ ...newCategory, id: uuid.v4(), type: 'CATEGORY', feeds: [] },
		]);
	};

	// TODO: return loading? Preferably separate for each function
	return {
		createFeed,
		createCategory,
		feedsCategories,
	};
};
