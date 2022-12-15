import { TextProps as NativeTextProps, TextStyle } from 'react-native';
import styled from 'styled-components/native';

/**
 * todo: font-weight is not really supported, so we need to use different font-family for different weights
 * because of this we need to add some switch or whatever to switch font-family based on provided "weight" prop.
 * Maybe something like `${fontFamily || defaultOne}-SemiBold`?
 *
 * todo: also it would be a really good idea to add support for other props here as well like color, size and etc.
 */
// todo: Maybe have this as normal text component and a second one - Heading which would support fontSizes based on which h1,h2,... tag was provided

export interface StyledNativeTextProps extends NativeTextProps {
	weight?: 300 | 400 | 500 | 600 | 700;
	color?: string;
	fontSize?: number;
}
export const StyledNativeText = styled.Text<StyledNativeTextProps>`
	font-size: ${({ fontSize }) => fontSize || 16}px;
	color: ${({ color }) => color || '#101113'}};
	font-family: ${({ weight }) => {
		switch (weight) {
			case 300:
				return 'Montserrat-Light';

			case 400:
				return 'Montserrat-Regular';

			case 500:
				return 'Montserrat-Medium';

			case 600:
				return 'Montserrat-SemiBold';

			case 700:
				return 'Montserrat-Bold';

			default:
				return 'Montserrat-Regular';
		}
	}};
`;
