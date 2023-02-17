import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState, useId } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, View, Keyboard } from 'react-native';

import { CATEGORIES } from '../../common/constants';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { TextInput } from '../../components/TextInput';
import { feedSchema } from '../../validation/feedSchema';
import { useMMKVObject } from 'react-native-mmkv';

type FeedFormValues = {
	NAME: string;
	URL: string;
	CATEGORY?: string;
};

export const FeedForm = ({ goBack }) => {
	const [feedsAndCategories = [], setFeedsAndCategories] = useMMKVObject('feedsAndCategories');

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
		setFeedsAndCategories([
			...feedsAndCategories,
			{ ...values, id: 'TODO: gen here', type: 'FEED' },
		]);

		goBack();
	};

	const handleKeyboardOnFocus = () => {
		setIsKeyboardVisible(true);
	};

	console.log(feedsAndCategories, 'array here pls');
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

				<Select.Page
					label="Category"
					data={CATEGORIES.map(category => ({ ...category, extraInfo: '00 feeds' }))}
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
