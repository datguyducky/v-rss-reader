import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Bars3BottomLeftIcon, Cog6ToothIcon } from 'react-native-heroicons/outline';

import { NavigationWrap, LeftIconWrap, RightIconWrap } from './Navigation.styles';

export const Navigation = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	return (
		<NavigationWrap>
			<LeftIconWrap>
				<Bars3BottomLeftIcon size={24} color="#101113" />
			</LeftIconWrap>

			<RightIconWrap>
				<Cog6ToothIcon size={24} color="#101113" />
			</RightIconWrap>
		</NavigationWrap>
	);
};
