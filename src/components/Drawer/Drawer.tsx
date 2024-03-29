import { ForwardedRef, forwardRef, ReactNode, useCallback, useContext } from 'react';
import { FlatListProps, StyleProp, ViewStyle } from 'react-native';
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import { useTheme } from 'styled-components/native';

import { ThemeContext, THEMES } from '@context/ThemeContext';

import { DrawerContainer, DrawerStylesProps } from './Drawer.styles';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface DrawerProps extends SharedStylesProps, DrawerStylesProps {
	children: ReactNode;
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
	onChange?: (index: number) => void;
	containerStyle?: StyleProp<ViewStyle>;
}

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
			onChange,
			containerStyle,
			...otherProps
		}: DrawerProps,
		ref: ForwardedRef<BottomSheetModal>,
	) => {
		const theme = useTheme();
		const { getTheme } = useContext(ThemeContext);

		/**
		 * `handleOnAnimate` makes sure that the status bar background and style are synced to the  rest of the app.
		 */
		const handleOnAnimate = useCallback(
			(from: number, to: number) => {
				const currentTheme = getTheme();

				// Closed drawer
				if (to === -1) {
					setStatusBarBackgroundColor(theme.colors.base[0], false);
					setStatusBarStyle(currentTheme === THEMES.light ? 'dark' : 'light');
				}

				// Opened drawer
				if (to === 0) {
					setStatusBarBackgroundColor(theme.colors.statusBar, false);
					setStatusBarStyle('light');
				}
			},
			[theme],
		);

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
					onChange={onChange}
					onAnimate={handleOnAnimate}
					detached={detached}
					bottomInset={bottomInset}
					containerStyle={{
						marginHorizontal: theme.spacing.size(detached ? 1.5 : 0),
					}}
					// This needs to be set here as having this on DrawerContainer styled component makes the border radius not visible
					backgroundStyle={{ backgroundColor: theme.colors.base[0] }}
				>
					{() => {
						if (useFlatList) {
							return (
								<DrawerContainer
									{...otherProps}
									horizontalContent={horizontalContent}
									style={containerStyle}
								>
									{children}

									<BottomSheetFlatList
										data={data}
										renderItem={renderItem}
										keyExtractor={keyExtractor}
										ItemSeparatorComponent={ItemSeparatorComponent}
										ListEmptyComponent={() => (
											<Text
												weight={300}
												fontSize={12}
												textAlign="center"
												ml={1.5}
												mr={1.5}
											>
												{emptyListText}
											</Text>
										)}
									/>
								</DrawerContainer>
							);
						}

						return (
							<DrawerContainer
								{...otherProps}
								horizontalContent={horizontalContent}
								style={containerStyle}
							>
								{children}
							</DrawerContainer>
						);
					}}
				</BottomSheetModal>
			</>
		);
	},
);
