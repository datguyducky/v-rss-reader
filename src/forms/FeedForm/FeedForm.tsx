import { TextInput } from '../../components/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'react-native';

export const FeedForm = () => {
	const feedForm = useForm({});

	const onSubmit = data => {
		console.log(data);
	};

	return (
		<>
			<FormProvider {...feedForm}>
				<TextInput label="Feed name" name="NAME" mb={16} />
				<TextInput label="Feed url" name="URL" />

				<Button title="Submit" onPress={feedForm.handleSubmit(onSubmit)} />
			</FormProvider>
		</>
	);
};
