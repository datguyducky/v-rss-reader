import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Pressable } from 'react-native';
import { EyeIcon } from 'react-native-heroicons/outline';

import { Filters } from '../../drawers/Filters';
import { useFeedsCategories } from '../../hooks/useFeedsCategories';
import { HeadingAnimated } from '../HeadingAnimated';
import { Icon } from '../Icon';
import { HeaderTextWrap, HeaderWrap } from './Header.styles';

type HeaderProps = {
	title?: string;
	scrollY: any;
};

export const Header = ({ title, scrollY }: HeaderProps) => {
	const { activeItemDetails } = useFeedsCategories();

	const filtersDrawerRef = useRef<BottomSheetModal>(null);

	return (
		<>
			<HeaderWrap>
				<HeaderTextWrap>
					<HeadingAnimated
						scrollY={scrollY}
						title={activeItemDetails?.name || title}
						action="unhide"
						tag="h5"
					/>
				</HeaderTextWrap>

				<Pressable
					onPress={() => filtersDrawerRef?.current?.present()}
					style={{ marginLeft: 'auto' }}
				>
					<Icon name={EyeIcon} size={24} />
				</Pressable>
			</HeaderWrap>

			<Filters ref={filtersDrawerRef} />
		</>
	);
};
