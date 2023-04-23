import { Animated, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { openURL } from 'expo-linking';

import { Text } from '@components/Text';
import { SettingsForm } from '@forms/SettingsForm';
import { Layout } from '@layouts/Layout';

import { PressableAppDetails } from './Settings.styles';
import { StackParamList } from '../routing/Routes';

export const Settings = ({
	scrollY,
}: { scrollY: Animated.Value } & NativeStackScreenProps<StackParamList, 'Settings'>) => {
	return (
		<Layout animatedTitle="Settings" scrollY={scrollY} pt={3}>
			<ScrollView>
				<SettingsForm />

				<PressableAppDetails
					style={{ marginTop: 24, marginBottom: 24 }}
					onPress={() =>
						openURL(
							'https://github.com/datguysheepy/v-rss-reader/blob/master/README.md',
						)
					}
				>
					<Text fontSize={12} weight={300} fontFamily="Montserrat" textAlign="center">
						V - RSS Reader, version 3.0
					</Text>

					<Text fontSize={12} weight={300} fontFamily="Montserrat" textAlign="center">
						Click here to learn more about this app
					</Text>
				</PressableAppDetails>
			</ScrollView>
		</Layout>
	);
};
