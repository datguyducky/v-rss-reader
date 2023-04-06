import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { Bars3BottomLeftIcon, Cog6ToothIcon, PlusIcon } from 'react-native-heroicons/outline';
import { Shadow } from 'react-native-shadow-2';

import { CreateSelection } from '../../drawers/CreateSelection';
import { Feeds } from '../../drawers/Feeds';
import { QuickSettings } from '../../drawers/QuickSettings';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import {
	LeftIconWrap,
	RightIconWrap,
	NavigationContainer,
	WrapWithCutOut,
	CutOutContainer,
	CutOutWrapper,
	CutOut,
} from './Navigation.styles';

export const Navigation = ({ navigation }: BottomTabBarProps) => {
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
				startColor="#00000015" // TODO: Figure out if this needs to be inside the theme colors object.
			>
				<NavigationContainer>
					<WrapWithCutOut>
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
										<Icon name={PlusIcon} size={32} />
									</Pressable.Background>
								</CutOut>
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
				</NavigationContainer>
			</Shadow>

			<CreateSelection navigation={navigation} ref={createSelectionRef} />
			<Feeds navigation={navigation} ref={feedsRef} />
			<QuickSettings ref={quickSettingsRef} navigation={navigation} />
		</>
	);
};
