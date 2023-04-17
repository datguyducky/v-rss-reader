import { useEffect, useState } from 'react';

import { useFeedsCategoriesContext } from '../context/FeedsCategoriesContext';
import { CategoryForm } from '../forms/CategoryForm';
import { Layout } from '../layouts/Layout';

export const Category = ({ navigation, route }) => {
	const { findFeedCategory } = useFeedsCategoriesContext();

	const [currentCategory, setCurrentCategory] = useState<Record<string, unknown>>();

	useEffect(() => {
		const loadCategoryDetails = async () => {
			const category = (await findFeedCategory(route.params.categoryId))?.item;

			setCurrentCategory(category);
		};

		if (route?.params?.categoryId) {
			loadCategoryDetails();
		}
	}, [route?.params?.categoryId]);

	return (
		<Layout
			title={route?.params?.mode === 'edit' ? 'Edit category' : 'Create new category'}
			pb={2}
		>
			<CategoryForm
				onClose={() => {
					navigation.navigate('Read');
				}}
				mode={route?.params?.mode}
				data={currentCategory}
			/>
		</Layout>
	);
};
