import { useEffect, useState } from 'react';

import { useFeedsCategoriesContext } from '../context/FeedsCategoriesContext';
import { FeedForm } from '../forms/FeedForm';
import { Layout } from '../layouts/Layout';

export const Feed = ({ navigation, route }) => {
	const { findFeedCategory } = useFeedsCategoriesContext();
	const [currentFeed, setCurrentFeed] = useState();

	useEffect(() => {
		const loadFeedDetails = async () => {
			const feed = await findFeedCategory(route.params.feedId);
			setCurrentFeed({ ...feed?.item, categoryId: feed?.parent?.id });
		};

		if (route?.params?.feedId) {
			loadFeedDetails();
		}
	}, [route?.params?.categoryId]);

	return (
		<Layout title={route?.params?.mode === 'edit' ? 'Edit feed' : 'Add new feed'} pb={2}>
			<FeedForm goBack={navigation.goBack} mode={route?.params?.mode} data={currentFeed} />
		</Layout>
	);
};
