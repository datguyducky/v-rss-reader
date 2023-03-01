import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, View, Keyboard } from 'react-native';

import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { TextInput } from '../../components/TextInput';
import { feedSchema } from '../../validation/feedSchema';
import { useFeedsCategories } from '../../hooks/useFeedsCategories';

type FeedFormValues = {
	name: string;
	url: string;
	category?: string;
};

export const FeedForm = ({ goBack }) => {
	const { createFeed, onlyCategories } = useFeedsCategories();

	const feedForm = useForm<FeedFormValues>({
		resolver: zodResolver(feedSchema),
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

	const onSubmit = (values: FeedFormValues) => {
		createFeed(values);

		goBack();
	};

	const handleKeyboardOnFocus = () => {
		setIsKeyboardVisible(true);
	};

	return (
		<>
			<FormProvider {...feedForm}>
				<TextInput label="Feed name" name="name" mb={16} onFocus={handleKeyboardOnFocus} />
				<TextInput
					label="Feed url"
					name="url"
					mb={16}
					onFocus={handleKeyboardOnFocus}
					autoCapitalize="none"
				/>

				<Select.Page
					label="Category"
					data={onlyCategories.map(category => ({
						label: category.name,
						value: category.id,
						extraInfo: `${category.feeds.length} feeds`,
					}))} // TODO: Function to display "0" at the beginning, if needed, and to display correct form.
					name="category"
					modalTitle="Select category"
				/>

				{!isKeyboardVisible && (
					<View
						style={{
							marginTop: 'auto',
							marginBottom: 24,
						}}
					>
						<Image
							source={require('../../assets/feedFormImage.png')}
							resizeMode="contain"
							style={{
								width: '100%',
								height: 240,
							}}
						/>
					</View>
				)}

				<Button
					style={{ marginTop: isKeyboardVisible ? 16 : 0 }}
					onPress={feedForm.handleSubmit(onSubmit)}
					disabled={!feedForm.formState.isValid || !feedForm.formState.isDirty}
				>
					Save
				</Button>
			</FormProvider>
		</>
	);
};
