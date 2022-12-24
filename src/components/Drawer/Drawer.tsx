import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { StatusBar, setStatusBarStyle, setStatusBarBackgroundColor } from 'expo-status-bar';

import { DrawerContainer, DrawerStylesProps } from './Drawer.styles';

interface DrawerProps extends DrawerStylesProps {
	onClose: () => void;
	children: React.ReactNode;
	autoOpen?: boolean;
	snapPoints: (string | number)[];
	initialSnapPoint?: number;
}

// TODO: There's a small flash on a statusBar when the `Drawer` is closed, maybe is not that noticeable but it still would be a good idea to fix it.
export const Drawer = React.forwardRef(
	(
		{
			onClose,
			children,
			snapPoints,
			initialSnapPoint = 0,
			autoOpen = true,
			horizontalContent = false,
		}: DrawerProps,
		ref,
	) => {
		const drawerInnerRef = useRef<BottomSheetModal>(null);

		useImperativeHandle(
			ref,
			() => ({
				present: () => {
					(drawerInnerRef?.current as BottomSheetModal).present(); // TODO: Double check if this brakes something. :)
				},
			}),
			[drawerInnerRef?.current],
		);

		/**
		 * `autoOpen` enables to open the bottomSheetModal automatically when it mounts in a view.
		 */
		useEffect(() => {
			if (drawerInnerRef?.current && autoOpen) {
				drawerInnerRef.current.present();
			}
		}, [drawerInnerRef?.current, autoOpen]);

		/**
		 * `handleOnAnimate` makes sure that the status bar background and style are synces to the  rest of the app.
		 * TODO: Probably color and style should be provided by a theme or something as right now this would only work for "light" themed app.
		 */
		const handleOnAnimate = useCallback((from: number, to: number) => {
			if (to === -1) {
				setStatusBarBackgroundColor('#fff', false);
				setStatusBarStyle('dark');
			}
		}, []);

		return (
			<>
				<StatusBar style="light" backgroundColor="rgba(0, 0, 0, 0)" />

				<BottomSheetModal
					ref={drawerInnerRef}
					index={initialSnapPoint}
					snapPoints={snapPoints}
					enablePanDownToClose
					enableHandlePanningGesture={false}
					handleStyle={{ display: 'none' }}
					backdropComponent={props => (
						<BottomSheetBackdrop
							{...props}
							appearsOnIndex={0}
							disappearsOnIndex={-1}
							pressBehavior="close"
							onPress={onClose}
						/>
					)}
					onDismiss={onClose}
					onAnimate={handleOnAnimate}
				>
					<DrawerContainer horizontalContent={horizontalContent}>
						{children}
					</DrawerContainer>
				</BottomSheetModal>
			</>
		);
	},
);
