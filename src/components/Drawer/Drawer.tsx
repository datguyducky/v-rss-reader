import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { setStatusBarStyle, setStatusBarBackgroundColor } from 'expo-status-bar';
import { ForwardedRef, forwardRef, useCallback } from 'react';

import { DrawerContainer, DrawerStylesProps } from './Drawer.styles';

interface DrawerProps extends DrawerStylesProps {
	children: React.ReactNode;
	snapPoints: (string | number)[];
	initialSnapPoint?: number;
}

// TODO: There's a small flash on a statusBar when the `Drawer` is closed, maybe is not that noticeable but it still would be a good idea to fix it.
export const Drawer = forwardRef(
	(
		{ children, snapPoints, initialSnapPoint = 0, horizontalContent = false }: DrawerProps,
		ref: ForwardedRef<BottomSheetModal>,
	) => {
		/**
		 * `handleOnAnimate` makes sure that the status bar background and style are synces to the  rest of the app.
		 * TODO: Probably color and style should be provided by a theme or something as right now this would only work for "light" themed app.
		 */
		const handleOnAnimate = useCallback((from: number, to: number) => {
			if (to === -1) {
				setStatusBarBackgroundColor('#fff', false);
				setStatusBarStyle('dark');
			}

			if (to === 0) {
				setStatusBarBackgroundColor('rgba(0, 0, 0, 0)', false);
				setStatusBarStyle('light');
			}
		}, []);

		return (
			<>
				<BottomSheetModal
					ref={ref}
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
						/>
					)}
					onAnimate={handleOnAnimate}
				>
					{props => {
						console.log(props); // here I have access to data passed via the "present" method
						return (
							<DrawerContainer horizontalContent={horizontalContent}>
								{children}
							</DrawerContainer>
						);
					}}
				</BottomSheetModal>
			</>
		);
	},
);
