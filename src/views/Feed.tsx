import { FeedForm } from '../forms/FeedForm';
import { LayoutWithTitle } from '../layouts/LayoutWithTitle';
import { useFeedsCategories } from '../hooks/useFeedsCategories';
import { useEffect, useState } from 'react';

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
		<LayoutWithTitle title={route?.params?.mode === 'edit' ? 'Edit feed' : 'Add new feed'}>
			<FeedForm goBack={navigation.goBack} mode={route?.params?.mode} data={currentFeed} />
		</LayoutWithTitle>
	);
};
