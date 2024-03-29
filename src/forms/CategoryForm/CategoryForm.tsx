import { useEffect, useState } from 'react';
import { Image, Keyboard, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@components/Button';
import { TextInput } from '@components/TextInput';
import { useFeedsCategoriesContext } from '@context/FeedsCategoriesContext';
import { Category } from '@hooks/useFeedsCategories';
import { categorySchema } from '@validation/categorySchema';

type CategoryFormProps = {
	onClose: () => void;
	mode: 'edit' | 'create';
	data?: Category;
};

export interface CategoryFormValues {
	name: string;
}

export const CategoryForm = ({ onClose, mode, data }: CategoryFormProps) => {
	const { editCategory, createCategory } = useFeedsCategoriesContext();

	const categoryForm = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		mode: 'onChange',
	});

	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			setIsKeyboardVisible(true);
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setIsKeyboardVisible(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	// Setting form values to the ones that were passed via props
	useEffect(() => {
		if (data) {
			const { name } = data;
			categoryForm.reset({ name: name as string });
		}
	}, [data]);

	const onSubmit = async (submitData: CategoryFormValues) => {
		if (mode === 'edit' && data?.id) {
			await editCategory(data.id as string, submitData);
		} else {
			await createCategory(submitData);
		}

		onClose();
	};

	const handleKeyboardOnFocus = () => {
		setIsKeyboardVisible(true);
	};

	return (
		<>
			<FormProvider {...categoryForm}>
				<TextInput
					label="Category name"
					name="name"
					mb={2}
					onFocus={handleKeyboardOnFocus}
				/>

				{!isKeyboardVisible && (
					<View
						style={{
							marginTop: 'auto',
							marginBottom: 24,
						}}
					>
						<Image
							source={require('../../assets/categoryFormImage.png')}
							resizeMode="contain"
							style={{
								width: '100%',
								height: 210,
							}}
						/>
					</View>
				)}

				<Button
					mt={isKeyboardVisible ? 2 : 0}
					onPress={categoryForm.handleSubmit(onSubmit)}
					disabled={!categoryForm.formState.isValid || !categoryForm.formState.isDirty}
				>
					Save
				</Button>
			</FormProvider>
		</>
	);
};
