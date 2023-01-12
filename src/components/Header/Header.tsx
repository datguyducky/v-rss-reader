import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { useRef } from 'react';
import { Pressable } from 'react-native';
import { EyeIcon } from 'react-native-heroicons/outline';

import { Filters } from '../../drawers/Filters';
import { Heading } from '../Heading';
import { HeaderTextWrap, HeaderWrap, IconWrap } from './Header.styles';

export const Header = () => {
	const filtersDrawerRef = useRef<BottomSheetModal>(null);

	return (
		<>
			<HeaderWrap marginTop={Constants?.statusBarHeight}>
				<HeaderTextWrap>
					<Heading tag="h4">Feed Name</Heading>
					<Heading weight={300} color="#5C5F66" tag="h6">
						00 unread
					</Heading>
				</HeaderTextWrap>

				<IconWrap>
					<Pressable
						onPress={() => filtersDrawerRef?.current?.present({ sdasda: 'sadasd' })}
					>
						<EyeIcon size={24} color="black" />
					</Pressable>
				</IconWrap>
			</HeaderWrap>

			<Filters ref={filtersDrawerRef} />
		</>
	);
};
