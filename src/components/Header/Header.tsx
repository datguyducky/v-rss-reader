import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Pressable } from 'react-native';
import { EyeIcon } from 'react-native-heroicons/outline';

import { Filters } from '../../drawers/Filters';
import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { HeaderTextWrap, HeaderWrap } from './Header.styles';
import { useFeedsCategories } from '../../hooks/useFeedsCategories';

type HeaderProps = {
	title?: string;
};

export const Header = ({ title }: HeaderProps) => {
	const { activeItemDetails } = useFeedsCategories();

	const filtersDrawerRef = useRef<BottomSheetModal>(null);

	return (
		<>
			<HeaderWrap>
				<HeaderTextWrap>
					<Heading tag="h4">{activeItemDetails?.name || title}</Heading>
					<Heading weight={300} color="#5C5F66" tag="h6">
						00 unread
					</Heading>
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
