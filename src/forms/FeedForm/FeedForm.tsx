import React, { useEffect, useState } from 'react';
import { Image, Keyboard, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@components/Button';
import { Select } from '@components/Select';
import { TextInput } from '@components/TextInput';
import { useFeedsCategoriesContext } from '@context/FeedsCategoriesContext';
import { Feed } from '@hooks/useFeedsCategories';
import { formatItemCount } from '@utils/formatItemCount';
import { feedSchema } from '@validation/feedSchema';

export interface FeedFormValues {
	name: string;
	url: string;
	category?: string;
}

type FeedFormProps = {
	goBack: () => void;
	mode: 'edit' | 'create';
	data?: Feed & { categoryId?: string };
};

export const FeedForm = ({ goBack, mode, data }: FeedFormProps) => {
	const { createFeed, onlyCategories, editFeed } = useFeedsCategoriesContext();

	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	const feedForm = useForm<FeedFormValues>({
		resolver: zodResolver(feedSchema),
		mode: 'onChange',
	});

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
			const { name, url, categoryId } = data;
			feedForm.reset({ name, url, category: categoryId });
		}
	}, [data]);

	const onSubmit = async (values: FeedFormValues) => {
		if (mode === 'edit' && data?.id) {
			await editFeed(data.id as string, values);
		} else {
			await createFeed(values);
		}

		goBack();
	};

	const handleKeyboardOnFocus = () => {
		setIsKeyboardVisible(true);
	};

	return (
		<>
			<FormProvider {...feedForm}>
				<TextInput label="Feed name" name="name" mb={2} onFocus={handleKeyboardOnFocus} />
				<TextInput
					label="Feed url"
					name="url"
					mb={2}
					onFocus={handleKeyboardOnFocus}
					autoCapitalize="none"
				/>

				<Select.Page
					label="Category"
					data={onlyCategories.map(category => ({
						label: category.name,
						value: category.id,
						extraInfo: formatItemCount(category.feeds.length),
					}))}
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
					mt={isKeyboardVisible ? 2 : 0}
					onPress={feedForm.handleSubmit(onSubmit)}
					disabled={!feedForm.formState.isValid || !feedForm.formState.isDirty}
				>
					Save
				</Button>
			</FormProvider>
		</>
	);
};
