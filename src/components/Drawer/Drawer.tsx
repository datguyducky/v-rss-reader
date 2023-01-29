import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { setStatusBarStyle, setStatusBarBackgroundColor } from 'expo-status-bar';
import { ForwardedRef, forwardRef, useCallback } from 'react';

import { DrawerContainer, DrawerStylesProps } from './Drawer.styles';

interface DrawerProps extends DrawerStylesProps {
	children: React.ReactNode;
	snapPoints: (string | number)[];
	initialSnapPoint?: number;
	detached?: boolean;
	bottomInset?: number;
	name?: string;
}

// TODO: There's a small flash on a statusBar when the `Drawer` is closed, maybe is not that noticeable but it still would be a good idea to fix it.
export const Drawer = forwardRef(
	(
		{
			name,
			children,
			snapPoints,
			initialSnapPoint = 0,
			horizontalContent = false,
			detached = false,
			bottomInset = 0,
		}: DrawerProps,
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
					name={name}
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
					detached={detached}
					bottomInset={bottomInset}
					containerStyle={{ marginHorizontal: detached ? 12 : 0 }}
				>
					{props => {
						console.log(props, 'TODO: Handle data...'); // here I have access to data passed via the "present" method
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
