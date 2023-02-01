import { ScrollView } from 'react-native';

import { SettingsForm } from '../forms/SettingsForm';
import { LayoutWithTitle } from '../layouts/LayoutWithTitle';

export const Settings = () => {
	return (
		<ScrollView>
			<LayoutWithTitle title="Settings">
				<SettingsForm />
			</LayoutWithTitle>
		</ScrollView>
	);
};
