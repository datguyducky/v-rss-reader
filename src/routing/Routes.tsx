import { useContext, useEffect } from 'react';
import { Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import { useTheme } from 'styled-components/native';

import { Header } from '@components/Header';
import { HeaderBack } from '@components/HeaderBack';
import { Navigation } from '@components/Navigation';
import { ThemeContext, THEMES } from '@context/ThemeContext';

import { Category } from '../views/Category';
import { Feed } from '../views/Feed';
import { Read } from '../views/Read';
import { Settings } from '../views/Settings';

export type StackParamList = {
	Category: { categoryId?: string; mode: 'edit' | 'create' };
	Feed: { feedId?: string; mode: 'edit' | 'create' };
	Settings: { name: string };
	TabScreen: NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
	Read: { name: string };
};

type TabScreenProps = {
	scrollY: Animated.Value;
	title: string;
};

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabScreen = ({ scrollY, title }: TabScreenProps) => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
			tabBar={props => <Navigation {...props} />}
		>
			<Tab.Screen name="Read">
				{props => {
					return <Read {...props} title={title} scrollY={scrollY} />;
				}}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

export const Routes = () => {
	const theme = useTheme();
	const { getTheme } = useContext(ThemeContext);
	const scrollYRead = new Animated.Value(0);
	const scrollYSettings = new Animated.Value(0);

	// Set status bar background to correct color on app launch
	useEffect(() => {
		const statusAndAnimationBars = async () => {
			// Setting background color of bottom "gesture/navigation" android bar to match with the app background color
			await setBackgroundColorAsync(theme.colors.base[0]);

			// Same for status bar
			setStatusBarBackgroundColor(theme.colors.base[0], false);
			setStatusBarStyle(getTheme() === THEMES.light ? 'dark' : 'light');
		};

		statusAndAnimationBars();
	}, []);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShadowVisible: false,
				header: ({ route }) => (
					<Header title={route.params?.name || 'All articles'} scrollY={scrollYRead} />
				),
				contentStyle: { backgroundColor: theme.colors.base[0] },
			}}
		>
			<Stack.Screen name="TabScreen">
				{props => {
					return (
						<TabScreen
							{...props}
							scrollY={scrollYRead}
							title={props.route.params?.params?.name || 'All articles'}
						/>
					);
				}}
			</Stack.Screen>

			<Stack.Group
				screenOptions={{
					header: props => (
						<HeaderBack
							{...props}
							scrollY={scrollYSettings}
							title={props.route.params?.name}
						/>
					),
					animation: 'fade_from_bottom',
				}}
			>
				<Stack.Screen name="Category" component={Category} />
				<Stack.Screen name="Feed" component={Feed} />
				<Stack.Screen name="Settings">
					{props => <Settings {...props} scrollY={scrollYSettings} />}
				</Stack.Screen>
			</Stack.Group>
		</Stack.Navigator>
	);
};
