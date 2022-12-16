import React from 'react';
import { StatusBar } from 'expo-status-bar';

type StatusBarLayoutProps = {
	children: React.ReactNode;
	statusBarBackgroundColor?: string;
	statusBarStyle?: 'light' | 'dark';
};

export const StatusBarLayout = ({
	children,
	statusBarBackgroundColor = '#fff',
	statusBarStyle = 'dark',
}: StatusBarLayoutProps) => {
	return (
		<>
			<StatusBar style={statusBarStyle} backgroundColor={statusBarBackgroundColor} />

			{children}
		</>
	);
};
