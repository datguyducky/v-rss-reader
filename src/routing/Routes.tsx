import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import { useContext, useEffect } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Header } from '../components/Header';
import { HeaderBack } from '../components/HeaderBack';
import { Navigation } from '../components/Navigation';
import { ThemeContext, THEMES } from '../context/ThemeContext';
import { Category } from '../views/Category';
import { Feed } from '../views/Feed';
import { Read } from '../views/Read';
import { Settings } from '../views/Settings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = ({ scrollY, title }) => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
			tabBar={props => <Navigation {...props} />}
		>
			<Stack.Screen name="Read">
				{props => <Read {...props} title={title} scrollY={scrollY} />}
			</Stack.Screen>
		</Tab.Navigator>
	);
};

export const Routes = () => {
	const theme = useTheme();
	const { getTheme } = useContext(ThemeContext);
	const scrollY = new Animated.Value(0);

	// Set status bar background to correct color on app launch
	useEffect(() => {
		setStatusBarBackgroundColor(theme.colors.base[0], false);
		setStatusBarStyle(getTheme() === THEMES.light ? 'dark' : 'light');
	}, []);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShadowVisible: false,
				header: ({ route }) => <Header title={route.params?.name} scrollY={scrollY} />,
				contentStyle: { backgroundColor: theme.colors.base[0] },
			}}
		>
			<Stack.Screen name="TabScreen">
				{props => (
					<TabScreen {...props} scrollY={scrollY} title={props.route.params?.name} />
				)}
			</Stack.Screen>

			<Stack.Group
				screenOptions={{
					header: props => (
						<HeaderBack {...props} scrollY={scrollY} title={props.route.params?.name} />
					),
					animation: 'fade_from_bottom',
				}}
			>
				<Stack.Screen name="Category" component={Category} />
				<Stack.Screen name="Feed" component={Feed} />
				<Stack.Screen name="Settings">
					{props => <Settings {...props} scrollY={scrollY} />}
				</Stack.Screen>
			</Stack.Group>
		</Stack.Navigator>
	);
};
