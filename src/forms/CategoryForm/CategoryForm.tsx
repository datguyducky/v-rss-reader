import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, View, Keyboard } from 'react-native';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { useFeedsCategories } from '../../hooks/useFeedsCategories';
import { categorySchema } from '../../validation/categorySchema';

type CategoryFormProps = {
	onClose: () => void;
	mode: 'edit' | 'create';
	data?: Record<string, unknown>;
};

export const CategoryForm = ({ onClose, mode, data }: CategoryFormProps) => {
	const { createCategory, editCategory } = useFeedsCategories();

	const categoryForm = useForm({
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
			categoryForm.reset({ name });
		}
	}, [data]);

	const onSubmit = submitData => {
		if (mode === 'edit' && data?.id) {
			editCategory(data.id as string, submitData);
		} else {
			createCategory(submitData);
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
					mb={16}
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
					style={{ marginTop: isKeyboardVisible ? 16 : 0 }}
					onPress={categoryForm.handleSubmit(onSubmit)}
					disabled={!categoryForm.formState.isValid || !categoryForm.formState.isDirty}
				>
					Save
				</Button>
			</FormProvider>
		</>
	);
};
