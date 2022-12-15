import Constants from 'expo-constants';
import { EyeIcon } from 'react-native-heroicons/outline';

import { Heading } from '../Heading';
import { HeaderTextWrap, HeaderWrap, IconWrap } from './Header.styles';

export const Header = () => {
	return (
		<HeaderWrap marginTop={Constants?.statusBarHeight}>
			<HeaderTextWrap>
				<Heading tag="h4">Feed Name</Heading>
				<Heading weight={300} color="#5C5F66" tag="h6">
					00 unread
				</Heading>
			</HeaderTextWrap>

			<IconWrap>
				<EyeIcon size={24} color="black" />
			</IconWrap>
		</HeaderWrap>
	);
};
