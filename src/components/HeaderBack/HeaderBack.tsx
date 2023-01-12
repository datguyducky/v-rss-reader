import Constants from 'expo-constants';
import { ArrowLeftIcon as ArrowLeftIconMini } from 'react-native-heroicons/mini';

import { Pressable } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { BackIconWrap, HeaderBackWrap } from './HeaderBack.styles';

export const HeaderBack = ({ navigation }: NativeStackHeaderProps) => {
	return (
		<HeaderBackWrap marginTop={Constants?.statusBarHeight}>
			<BackIconWrap>
				<Pressable onPress={navigation.goBack}>
					<ArrowLeftIconMini size={24} color="#101113" />
				</Pressable>
			</BackIconWrap>
		</HeaderBackWrap>
	);
};
