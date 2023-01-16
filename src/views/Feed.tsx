import { FeedForm } from '../forms/FeedForm';
import { LayoutForm } from '../layouts/LayoutForm';

export const Feed = () => {
	return (
		<LayoutForm title="Add new feed">
			<FeedForm />
		</LayoutForm>
	);
};
