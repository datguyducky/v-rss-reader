import { CategoryForm } from '../forms/CategoryForm';
import { LayoutForm } from '../layouts/LayoutForm';

export const Category = () => {
	return (
		<LayoutForm title="Create new category">
			<CategoryForm />
		</LayoutForm>
	);
};
