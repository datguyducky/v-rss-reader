import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, View, Keyboard } from 'react-native';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { feedSchema } from '../../validation/feedSchema';

export const FeedForm = () => {
	const feedForm = useForm({ resolver: zodResolver(feedSchema), mode: 'onChange' });
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
		console.log(data);
	};

	const handleKeyboardOnFocus = () => {
		setIsKeyboardVisible(true);
	};

	return (
		<>
			<FormProvider {...feedForm}>
				<TextInput label="Feed name" name="NAME" mb={16} onFocus={handleKeyboardOnFocus} />
				<TextInput label="Feed url" name="URL" mb={16} onFocus={handleKeyboardOnFocus} />

				{/* TODO: Select here... */}

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
								height: 210,
							}}
						/>
					</View>
				)}

				<Button
					style={{ marginTop: isKeyboardVisible ? 'auto' : 0 }}
					onPress={feedForm.handleSubmit(onSubmit)}
					disabled={!feedForm.formState.isValid || !feedForm.formState.isDirty}
				>
					Submit
				</Button>
			</FormProvider>
		</>
	);
};
