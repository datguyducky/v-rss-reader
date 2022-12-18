import React from 'react';

import { Text } from '../components/Text';
import { Layout } from '../layouts/Layout';
import { StatusBar } from 'expo-status-bar';

export const Read = () => {
	return (
		<>
			<StatusBar backgroundColor="#fff" style="dark" />

			<Layout>
				<Text>Feeds here...</Text>
			</Layout>
		</>
	);
};
