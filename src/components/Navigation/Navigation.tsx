import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Bars3BottomLeftIcon, Cog6ToothIcon } from 'react-native-heroicons/outline';
import { Shadow } from 'react-native-shadow-2';

import {
	NavigationWrap,
	LeftIconWrap,
	RightIconWrap,
	NavigationContent,
} from './Navigation.styles';
import { Pressable } from 'react-native';

export const Navigation = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	return (
		<NavigationWrap>
			<Shadow stretch distance={6}>
				<NavigationContent>
					<Pressable onPress={() => navigation.navigate('Feeds')}>
						<LeftIconWrap>
							<Bars3BottomLeftIcon size={24} color="#101113" />
						</LeftIconWrap>
					</Pressable>

					<RightIconWrap>
						<Cog6ToothIcon size={24} color="#101113" />
					</RightIconWrap>
				</NavigationContent>
			</Shadow>
		</NavigationWrap>
	);
};
