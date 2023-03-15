import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Pressable } from 'react-native';
import { ArrowLeftIcon as ArrowLeftIconMini } from 'react-native-heroicons/mini';

import { HeadingAnimated } from '../HeadingAnimated';
import { Icon } from '../Icon';
import { BackIconWrap, HeaderBackWrap, HeaderTextWrap } from './HeaderBack.styles';

interface HeaderBackProps extends NativeStackHeaderProps {
	scrollY: any; //TODO: correct type here
	title: string;
}

export const HeaderBack = ({ navigation, scrollY, title }: HeaderBackProps) => {
	return (
		<HeaderBackWrap>
			<Pressable onPress={navigation.goBack}>
				<BackIconWrap>
					<Icon name={ArrowLeftIconMini} size={24} />
				</BackIconWrap>
			</Pressable>

			<HeaderTextWrap>
				<HeadingAnimated scrollY={scrollY} title={title} action="unhide" tag="h5" />
			</HeaderTextWrap>
		</HeaderBackWrap>
	);
};
