import { useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Bars3BottomLeftIcon, Cog6ToothIcon, PlusIcon } from 'react-native-heroicons/outline';
import { Shadow } from 'react-native-shadow-2';
import { useTheme } from 'styled-components/native';

import {
	CutOut,
	CutOutContainer,
	CutOutWrapper,
	LeftIconWrap,
	RightIconWrap,
	WrapWithCutOut,
} from './Navigation.styles';
import { CreateSelection } from '../../drawers/CreateSelection';
import { Feeds } from '../../drawers/Feeds';
import { QuickSettings } from '../../drawers/QuickSettings';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';

export const Navigation = ({
	navigation,
	...otherProps
}: BottomTabBarProps & SharedStylesProps) => {
	const theme = useTheme();
	const { width } = useWindowDimensions();

	const createSelectionRef = useRef<BottomSheetModal>(null);
	const feedsRef = useRef<BottomSheetModal>(null);
	const quickSettingsRef = useRef<BottomSheetModal>(null);

	return (
		<>
			<Shadow
				paintInside
				distance={6}
				offset={[0, 0]}
				sides={{ bottom: false, start: false, end: false, top: true }}
				startColor={theme.colors.navigationShadow}
			>
				<View>
					<WrapWithCutOut {...otherProps}>
						<Pressable.Background
							onPress={() => feedsRef?.current?.present()}
							borderless
						>
							<LeftIconWrap>
								<Icon name={Bars3BottomLeftIcon} size={24} />
							</LeftIconWrap>
						</Pressable.Background>

						<CutOutContainer width={width} pointerEvents="box-none">
							<CutOutWrapper>
								<Shadow
									paintInside
									distance={6}
									offset={[0, 38]}
									startColor={theme.colors.navigationShadow}
								>
									<CutOut>
										<Pressable.Background
											foreground={false}
											borderless
											onPress={() => createSelectionRef?.current?.present()}
											style={{
												width: '100%',
												height: '100%',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<Icon
												name={PlusIcon}
												size={32}
												color={theme.colors.black}
											/>
										</Pressable.Background>
									</CutOut>
								</Shadow>
							</CutOutWrapper>
						</CutOutContainer>

						<Pressable.Background
							borderless
							onPress={() => quickSettingsRef?.current?.present()}
							style={{ marginLeft: 'auto' }}
						>
							<RightIconWrap>
								<Icon name={Cog6ToothIcon} size={24} />
							</RightIconWrap>
						</Pressable.Background>
					</WrapWithCutOut>
				</View>
			</Shadow>

			<CreateSelection navigation={navigation} ref={createSelectionRef} />
			<Feeds navigation={navigation} ref={feedsRef} />
			<QuickSettings ref={quickSettingsRef} navigation={navigation} />
		</>
	);
};
