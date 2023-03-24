import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { setStatusBarStyle, setStatusBarBackgroundColor } from 'expo-status-bar';
import { ForwardedRef, forwardRef, useCallback } from 'react';
import { FlatListProps } from 'react-native';

import { Text } from '../Text';

import { DrawerContainer, DrawerStylesProps } from './Drawer.styles';

interface DrawerProps extends DrawerStylesProps {
	children: React.ReactNode;
	snapPoints: (string | number)[];
	initialSnapPoint?: number;
	detached?: boolean;
	bottomInset?: number;
	name?: string;
	useFlatList?: boolean;
	data?: FlatListProps<any>['data'];
	keyExtractor?: FlatListProps<any>['keyExtractor'];
	renderItem?: FlatListProps<any>['renderItem'];
	ItemSeparatorComponent?: FlatListProps<any>['ItemSeparatorComponent'];
	emptyListText?: string;
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
			useFlatList = false,
			data,
			keyExtractor,
			renderItem,
			ItemSeparatorComponent,
			emptyListText,
		}: DrawerProps,
		ref: ForwardedRef<BottomSheetModal>,
	) => {
		/**
		 * `handleOnAnimate` makes sure that the status bar background and style are synced to the  rest of the app.
		 * TODO: Probably color and style should be provided by a theme or something as right now this would only work for "light" themed app.
		 */
		const handleOnAnimate = useCallback((from: number, to: number) => {
			if (to === -1) {
				setStatusBarBackgroundColor('#fff', false);
				setStatusBarStyle('dark');
			}

			if (to === 0) {
				setStatusBarBackgroundColor('rgba(0, 0, 0, 0.5)', false);
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
					{() => {
						if (useFlatList) {
							return (
								<DrawerContainer horizontalContent={horizontalContent}>
									{children}

									<BottomSheetFlatList
										data={data}
										renderItem={renderItem}
										keyExtractor={keyExtractor}
										ItemSeparatorComponent={ItemSeparatorComponent}
										ListEmptyComponent={() => (
											<Text weight={300} fontSize={12} textAlign="center">
												{emptyListText}
											</Text>
										)}
									/>
								</DrawerContainer>
							);
						}

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
