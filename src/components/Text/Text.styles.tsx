import { TextProps as NativeTextProps } from 'react-native';
import styled from 'styled-components/native';

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
				return 'Raleway-Light';

			case 400:
				return 'Raleway-Regular';

			case 500:
				return 'Raleway-Medium';

			case 600:
				return 'Raleway-SemiBold';

			case 700:
				return 'Raleway-Bold';

			default:
				return 'Raleway-Regular';
		}
	}};
`;
