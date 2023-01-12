import { TextProps as NativeTextProps, TextStyle } from 'react-native';
import styled from 'styled-components/native';

export interface StyledNativeHeadingTextProps extends NativeTextProps {
	weight?: 300 | 400 | 500 | 600 | 700;
	color?: string;
	fontSize?: number;
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	mb?: number;
}
export const StyledNativeHeadingText = styled.Text<StyledNativeHeadingTextProps>`
	font-size: ${({ fontSize, tag }) => {
		if (fontSize) {
			return fontSize;
		}

		switch (tag) {
			case 'h1':
				return 40;

			case 'h2':
				return 32;

			case 'h3':
				return 24;

			case 'h4':
				return 21;

			case 'h5':
				return 16;

			case 'h6':
				return 12;

			default:
				return 64; // default is set to so big size just to showcase that neither the tag and fontSize props were provided and that it requires fixing
		}
	}}px;
	color: ${({ color }) => color || '#101113'};
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
				return 'Montserrat-SemiBold';
		}
	}};
	margin-bottom: ${({ mb }) => mb || 0}px;
`;
