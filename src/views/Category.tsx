import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

import { useFeedsCategoriesContext } from '../context/FeedsCategoriesContext';
import { CategoryForm } from '../forms/CategoryForm';
import { Category as CategoryType } from '../hooks/useFeedsCategories';
import { Layout } from '../layouts/Layout';
import { StackParamList } from '../routing/Routes';

export const Category = ({
	navigation,
	route,
}: NativeStackScreenProps<StackParamList, 'Category'>) => {
	const { findFeedCategory } = useFeedsCategoriesContext();

	const [currentCategory, setCurrentCategory] = useState<CategoryType>();

	useEffect(() => {
		const loadCategoryDetails = async () => {
			const category = (await findFeedCategory(route.params.categoryId as string))?.item;

			setCurrentCategory(category as CategoryType);
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
					navigation.navigate('Read', { title: '', scrollY: new Animated.Value(0) });
				}}
				mode={route?.params?.mode}
				data={currentCategory}
			/>
		</Layout>
	);
};
