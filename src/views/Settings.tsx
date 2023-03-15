import { ScrollView } from 'react-native';

import { SettingsForm } from '../forms/SettingsForm';
import { Layout } from '../layouts/Layout';

export const Settings = ({ scrollY }) => {
	return (
		<Layout animatedTitle="Settings" scrollY={scrollY} style={{ paddingTop: 24 }}>
			<ScrollView>
				<SettingsForm />
			</ScrollView>
		</Layout>
	);
};
