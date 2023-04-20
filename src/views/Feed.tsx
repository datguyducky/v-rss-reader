import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import { useFeedsCategoriesContext } from '../context/FeedsCategoriesContext';
import { FeedForm } from '../forms/FeedForm';
import { Feed as FeedType } from '../hooks/useFeedsCategories';
import { Layout } from '../layouts/Layout';
import { StackParamList } from '../routing/Routes';

export const Feed = ({ navigation, route }: NativeStackScreenProps<StackParamList, 'Feed'>) => {
	const { findFeedCategory } = useFeedsCategoriesContext();
	const [currentFeed, setCurrentFeed] = useState<
		(FeedType & { categoryId: string | undefined }) | undefined
	>();

	useEffect(() => {
		const loadFeedDetails = async () => {
			const feed = await findFeedCategory(route.params.feedId as string);
			if (feed?.item && feed?.item?.type === 'FEED') {
				setCurrentFeed({ ...feed?.item, categoryId: feed?.parent?.id });
			}
		};

		if (route?.params?.feedId) {
			loadFeedDetails();
		}
	}, [route?.params?.feedId]);

	return (
		<Layout title={route?.params?.mode === 'edit' ? 'Edit feed' : 'Add new feed'} pb={2}>
			<FeedForm goBack={navigation.goBack} mode={route?.params?.mode} data={currentFeed} />
		</Layout>
	);
};
