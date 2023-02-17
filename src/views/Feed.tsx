import { FeedForm } from '../forms/FeedForm';
import { LayoutWithTitle } from '../layouts/LayoutWithTitle';

export const Feed = ({ navigation }) => {
	return (
		<LayoutWithTitle title="Add new feed">
			<FeedForm goBack={navigation.goBack} />
		</LayoutWithTitle>
	);
};
