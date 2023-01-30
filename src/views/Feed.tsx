import { FeedForm } from '../forms/FeedForm';
import { LayoutWithTitle } from '../layouts/LayoutWithTitle';

export const Feed = () => {
	return (
		<LayoutWithTitle title="Add new feed">
			<FeedForm />
		</LayoutWithTitle>
	);
};
