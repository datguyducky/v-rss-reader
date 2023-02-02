import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Header } from '../components/Header';
import { HeaderBack } from '../components/HeaderBack';
import { Navigation } from '../components/Navigation';
import { Category } from '../views/Category';
import { Feed } from '../views/Feed';
import { Read } from '../views/Read';
import { Settings } from '../views/Settings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
			tabBar={props => <Navigation {...props} />}
		>
			<Stack.Screen name="Read" component={Read} />
		</Tab.Navigator>
	);
};

export const Routes = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShadowVisible: false,
				header: ({ route }) => <Header title={route.params?.name} />,
			}}
		>
			<Stack.Screen name="TabScreen" component={TabScreen} />

			<Stack.Group
				screenOptions={{
					header: props => <HeaderBack {...props} />,
					animation: 'fade_from_bottom',
				}}
			>
				<Stack.Screen name="Category" component={Category} />
				<Stack.Screen name="Feed" component={Feed} />
				<Stack.Screen name="Settings" component={Settings} />
			</Stack.Group>
		</Stack.Navigator>
	);
};
