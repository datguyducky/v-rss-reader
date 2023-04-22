import { Animated } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ArrowLeftIcon as ArrowLeftIconMini } from 'react-native-heroicons/mini';

import { BackIconWrap, HeaderBackWrap, HeaderTextWrap } from './HeaderBack.styles';
import { HeadingAnimated } from '../HeadingAnimated';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';

interface HeaderBackProps extends SharedStylesProps, NativeStackHeaderProps {
	scrollY: Animated.Value;
	title: string;
}

export const HeaderBack = ({ navigation, scrollY, title, ...otherProps }: HeaderBackProps) => {
	return (
		<HeaderBackWrap {...otherProps}>
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
