import React from 'react';

import { Text } from '../components/Text';
import { Layout } from '../layouts/Layout';
import { StatusBarLayout } from '../layouts/StatusBarLayout';

export const Read = () => {
	return (
		<StatusBarLayout>
			<Layout>
				<Text>Feeds here...</Text>
			</Layout>
		</StatusBarLayout>
	);
};
