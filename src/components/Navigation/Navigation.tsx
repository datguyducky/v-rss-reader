import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useRef } from 'react';
import { useWindowDimensions, Pressable } from 'react-native';
import { Bars3BottomLeftIcon, Cog6ToothIcon, PlusIcon } from 'react-native-heroicons/outline';

import { CreateSelection } from '../../drawers/CreateSelection';
import { Feeds } from '../../drawers/Feeds';
import { QuickSettings } from '../../drawers/QuickSettings';
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
							<Bars3BottomLeftIcon size={24} color="#101113" />
						</Pressable>
					</LeftIconWrap>

					<CutOutContainer width={width} pointerEvents="box-none">
						<CutOutWrapper>
							<CutOut>
								<Pressable onPress={() => createSelectionRef?.current?.present()}>
									<PlusIcon size={32} color="#101113" />
								</Pressable>
							</CutOut>
						</CutOutWrapper>
					</CutOutContainer>

					<RightIconWrap>
						<Pressable onPress={() => quickSettingsRef?.current?.present()}>
							<Cog6ToothIcon size={24} color="#101113" />
						</Pressable>
					</RightIconWrap>
				</WrapWithCutOut>
			</NavigationContainer>

			<CreateSelection navigation={navigation} ref={createSelectionRef} />
			<Feeds ref={feedsRef} />
			<QuickSettings ref={quickSettingsRef} />
		</>
	);
};
