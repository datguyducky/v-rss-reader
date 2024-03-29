import { useRef } from 'react';
import { Animated } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { EyeIcon } from 'react-native-heroicons/outline';

import { useFeedsCategoriesContext } from '@context/FeedsCategoriesContext';

import { HeaderTextWrap, HeaderWrap } from './Header.styles';
import { Filters } from '../../drawers/Filters';
import { HeadingAnimated } from '../HeadingAnimated';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';

interface HeaderProps extends SharedStylesProps {
	title: string;
	scrollY: Animated.Value;
}

export const Header = ({ title, scrollY, ...otherProps }: HeaderProps) => {
	const { activeItem } = useFeedsCategoriesContext();

	const filtersDrawerRef = useRef<BottomSheetModal>(null);

	return (
		<>
			<HeaderWrap {...otherProps}>
				<HeaderTextWrap>
					<HeadingAnimated
						scrollY={scrollY}
						title={activeItem?.name || title}
						action="unhide"
						tag="h5"
					/>
				</HeaderTextWrap>

				<Pressable.Background
					onPress={() => filtersDrawerRef?.current?.present()}
					style={{ marginLeft: 'auto' }}
					borderless
				>
					<Icon name={EyeIcon} size={24} />
				</Pressable.Background>
			</HeaderWrap>

			<Filters ref={filtersDrawerRef} />
		</>
	);
};
