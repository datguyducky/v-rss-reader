import { useEffect, useState } from 'react';

import { CategoryForm } from '../forms/CategoryForm';
import { useFeedsCategories } from '../hooks/useFeedsCategories';
import { Layout } from '../layouts/Layout';

export const Category = ({ navigation, route }) => {
	const { findFeedCategory } = useFeedsCategories();

	const [currentCategory, setCurrentCategory] = useState();

	useEffect(() => {
		if (route?.params?.categoryId) {
			const category = findFeedCategory(route.params.categoryId)?.item;
			setCurrentCategory(category);
		}
	}, [route?.params?.categoryId]);

	return (
		<Layout
			title={route?.params?.mode === 'edit' ? 'Edit category' : 'Create new category'}
			bottomPadding={2}
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
