import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import Constants from 'expo-constants';
import { Pressable } from 'react-native';
import { ArrowLeftIcon as ArrowLeftIconMini } from 'react-native-heroicons/mini';

import { Icon } from '../Icon';
import { BackIconWrap, HeaderBackWrap } from './HeaderBack.styles';

export const HeaderBack = ({ navigation }: NativeStackHeaderProps) => {
	return (
		<HeaderBackWrap marginTop={Constants?.statusBarHeight}>
			<Pressable onPress={navigation.goBack}>
				<BackIconWrap>
					<Icon name={ArrowLeftIconMini} size={24} />
				</BackIconWrap>
			</Pressable>
		</HeaderBackWrap>
	);
};
