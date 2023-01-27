import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, View, Keyboard } from 'react-native';

import { CATEGORIES } from '../../common/constants';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { TextInput } from '../../components/TextInput';
import { feedSchema } from '../../validation/feedSchema';

type FeedFormValues = {
	NAME: string;
	URL: string;
	CATEGORY?: string;
};

export const FeedForm = () => {
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
		console.log(values);
	};

	const handleKeyboardOnFocus = () => {
		setIsKeyboardVisible(true);
	};

	return (
		<>
			<FormProvider {...feedForm}>
				<TextInput label="Feed name" name="NAME" mb={16} onFocus={handleKeyboardOnFocus} />
				<TextInput
					label="Feed url"
					name="URL"
					mb={16}
					onFocus={handleKeyboardOnFocus}
					autoCapitalize="none"
				/>

				<Select
					label="Category"
					data={CATEGORIES}
					name="CATEGORY"
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
					style={{ marginTop: isKeyboardVisible ? 'auto' : 0 }}
					onPress={feedForm.handleSubmit(onSubmit)}
					disabled={!feedForm.formState.isValid || !feedForm.formState.isDirty}
				>
					Save
				</Button>
			</FormProvider>
		</>
	);
};
