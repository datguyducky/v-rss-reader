import { CategoryForm } from '../forms/CategoryForm';
import { LayoutWithTitle } from '../layouts/LayoutWithTitle';
import { useEffect, useState } from 'react';
import { useFeedsCategories } from '../hooks/useFeedsCategories';

export const Category = ({ navigation, route }) => {
	const { findFeedCategory } = useFeedsCategories();

	const [currentCategory, setCurrentCategory] = useState();

	useEffect(() => {
		if (route?.params?.categoryId) {
			const category = findFeedCategory(route.params.categoryId);
			setCurrentCategory(category);
		}
	}, [route?.params?.categoryId]);

	return (
		<LayoutWithTitle
			title={route?.params?.mode === 'edit' ? 'Edit category' : 'Create new category'}
		>
			<CategoryForm
				onClose={() => {
					navigation.navigate('Read');
				}}
				mode={route?.params?.mode}
				data={currentCategory}
			/>
		</LayoutWithTitle>
	);
};
