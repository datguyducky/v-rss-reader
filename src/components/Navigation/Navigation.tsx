import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useRef } from 'react';
import { useWindowDimensions, Pressable } from 'react-native';
import { Bars3BottomLeftIcon, Cog6ToothIcon, PlusIcon } from 'react-native-heroicons/outline';

import { CreateSelection } from '../../drawers/CreateSelection';
import { Feeds } from '../../drawers/Feeds';
import { QuickSettings } from '../../drawers/QuickSettings';
import { Icon } from '../Icon';
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
			<NavigationContainer>
				<WrapWithCutOut>
					<LeftIconWrap>
						<Pressable onPress={() => feedsRef?.current?.present()}>
							<Icon name={Bars3BottomLeftIcon} size={24} />
						</Pressable>
					</LeftIconWrap>

					<CutOutContainer width={width} pointerEvents="box-none">
						<Pressable onPress={() => createSelectionRef?.current?.present()}>
							<CutOutWrapper>
								<CutOut>
									<Icon name={PlusIcon} size={32} />
								</CutOut>
							</CutOutWrapper>
						</Pressable>
					</CutOutContainer>

					<RightIconWrap>
						<Pressable onPress={() => quickSettingsRef?.current?.present()}>
							<Icon name={Cog6ToothIcon} size={24} />
						</Pressable>
					</RightIconWrap>
				</WrapWithCutOut>
			</NavigationContainer>

			<CreateSelection navigation={navigation} ref={createSelectionRef} />
			<Feeds navigation={navigation} ref={feedsRef} />
			<QuickSettings ref={quickSettingsRef} navigation={navigation} />
		</>
	);
};
