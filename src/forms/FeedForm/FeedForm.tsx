import { TextInput } from '../../components/TextInput';

export const FeedForm = () => {
	return (
		<>
			<TextInput label="Feed name" value="NAME" mb={16} />
			<TextInput label="Feed url" value="URL" />
		</>
	);
};
