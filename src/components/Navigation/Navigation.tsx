import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Bars3BottomLeftIcon, Cog6ToothIcon, PlusIcon } from 'react-native-heroicons/outline';

import { useWindowDimensions, Pressable } from 'react-native';

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

	return (
		<NavigationContainer>
			<WrapWithCutOut>
				<LeftIconWrap>
					<Pressable onPress={() => navigation.navigate('Feeds')}>
						<Bars3BottomLeftIcon size={24} color="#101113" />
					</Pressable>
				</LeftIconWrap>

				<CutOutContainer width={width} pointerEvents="box-none">
					<CutOutWrapper>
						<CutOut style={{ backgroundColor: 'red' }}>
							<Pressable onPress={() => navigation.navigate('CreateSelection')}>
								<PlusIcon size={32} color="#101113" />
							</Pressable>
						</CutOut>
					</CutOutWrapper>
				</CutOutContainer>

				<RightIconWrap>
					<Pressable onPress={() => navigation.navigate('QuickSettings')}>
						<Cog6ToothIcon size={24} color="#101113" />
					</Pressable>
				</RightIconWrap>
			</WrapWithCutOut>
		</NavigationContainer>
	);
};
