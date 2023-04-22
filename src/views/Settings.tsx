import { Animated, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SettingsForm } from '@forms/SettingsForm';
import { Layout } from '@layouts/Layout';

import { StackParamList } from '../routing/Routes';

export const Settings = ({
	scrollY,
}: { scrollY: Animated.Value } & NativeStackScreenProps<StackParamList, 'Settings'>) => {
	return (
		<Layout animatedTitle="Settings" scrollY={scrollY} pt={3}>
			<ScrollView>
				<SettingsForm />
			</ScrollView>
		</Layout>
	);
};
