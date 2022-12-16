import BottomSheet from '@gorhom/bottom-sheet';
import { Text } from 'react-native';
import React, { useCallback } from 'react';
import { DrawerBackdrop } from './DrawerBackdrop';
import { DrawerContainer } from './Drawer.styles';

import { StackNavigationProp } from '@react-navigation/stack';

interface DrawerProps {
	navigation: StackNavigationProp<any>;
	children: React.ReactNode;
	snapPoints: (string | number)[];
	initialSnapPoint?: number;
}

// Todo: add animation when opening and closing
export const Drawer = React.forwardRef(
	(
		{ navigation, children, snapPoints, initialSnapPoint = 0 }: DrawerProps,
		ref: any /* todo: proper type here */,
	) => {
		const handleSheetChanges = useCallback((index: number) => {
			// -1 -> bottom sheet is closed
			if (index === -1) {
				navigation.navigate('TabScreen', { screen: 'Read' });
			}
		}, []);

		return (
			<BottomSheet
				ref={ref}
				index={initialSnapPoint}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				enablePanDownToClose
				enableHandlePanningGesture={false}
				handleStyle={{ display: 'none' }}
				backdropComponent={DrawerBackdrop}
			>
				<DrawerContainer>{children}</DrawerContainer>
			</BottomSheet>
		);
	},
);
