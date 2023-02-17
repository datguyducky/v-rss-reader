import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, View, Keyboard } from 'react-native';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { useFeedsCategories } from '../../hooks/useFeedsCategories';
import { categorySchema } from '../../validation/categorySchema';

export const CategoryForm = ({ onClose }) => {
	const { createCategory } = useFeedsCategories();

	const categoryForm = useForm({ resolver: zodResolver(categorySchema), mode: 'onChange' });
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

	const onSubmit = data => {
		createCategory(data);

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
					name="NAME"
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
					style={{ marginTop: isKeyboardVisible ? 'auto' : 0 }}
					onPress={categoryForm.handleSubmit(onSubmit)}
					disabled={!categoryForm.formState.isValid || !categoryForm.formState.isDirty}
				>
					Save
				</Button>
			</FormProvider>
		</>
	);
};
