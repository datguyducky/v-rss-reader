import { useEffect, useState } from 'react';

import { FeedForm } from '../forms/FeedForm';
import { useFeedsCategories } from '../hooks/useFeedsCategories';
import { Layout } from '../layouts/Layout';

export const Feed = ({ navigation, route }) => {
	const { findFeedCategory } = useFeedsCategories();
	const [currentFeed, setCurrentFeed] = useState();

	useEffect(() => {
		if (route?.params?.feedId) {
			const feed = findFeedCategory(route.params.feedId);
			setCurrentFeed({ ...feed?.item, categoryId: feed?.parent?.id });
		}
	}, [route?.params?.categoryId]);

	return (
		<Layout
			title={route?.params?.mode === 'edit' ? 'Edit feed' : 'Add new feed'}
			bottomPadding={2}
		>
			<FeedForm goBack={navigation.goBack} mode={route?.params?.mode} data={currentFeed} />
		</Layout>
	);
};
