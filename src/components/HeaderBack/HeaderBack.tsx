import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ArrowLeftIcon as ArrowLeftIconMini } from 'react-native-heroicons/mini';

import { HeadingAnimated } from '../HeadingAnimated';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { BackIconWrap, HeaderBackWrap, HeaderTextWrap } from './HeaderBack.styles';

interface HeaderBackProps extends NativeStackHeaderProps {
	scrollY: any; //TODO: correct type here
	title: string;
}

export const HeaderBack = ({ navigation, scrollY, title }: HeaderBackProps) => {
	return (
		<HeaderBackWrap>
			<BackIconWrap>
				<Pressable.Background onPress={navigation.goBack} borderless>
					<Icon name={ArrowLeftIconMini} size={24} />
				</Pressable.Background>
			</BackIconWrap>

			<HeaderTextWrap>
				<HeadingAnimated scrollY={scrollY} title={title} action="unhide" tag="h5" />
			</HeaderTextWrap>
		</HeaderBackWrap>
	);
};
