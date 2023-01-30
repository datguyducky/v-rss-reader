import { CategoryForm } from '../forms/CategoryForm';
import { LayoutWithTitle } from '../layouts/LayoutWithTitle';

export const Category = () => {
	return (
		<LayoutWithTitle title="Create new category">
			<CategoryForm />
		</LayoutWithTitle>
	);
};
