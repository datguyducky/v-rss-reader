import { CategoryForm } from '../forms/CategoryForm';
import { LayoutWithTitle } from '../layouts/LayoutWithTitle';

export const Category = ({ navigation }) => {
	return (
		<LayoutWithTitle title="Create new category">
			<CategoryForm onClose={() => navigation.navigate('Read')} />
		</LayoutWithTitle>
	);
};
