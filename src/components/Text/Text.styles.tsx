import { TextProps as NativeTextProps } from 'react-native';
import styled from 'styled-components/native';

export interface StyledNativeTextProps extends NativeTextProps {
	weight?: 300 | 400 | 500 | 600 | 700;
	color?: string;
	fontSize?: number;
	fontFamily?: 'Raleway' | 'Montserrat';
	mb?: number;
	textAlign?: 'left' | 'center' | 'right' | 'auto';
}

export const StyledNativeText = styled.Text<StyledNativeTextProps>`
	font-size: ${({ fontSize }) => fontSize || 16}px;
	color: ${({ color }) => color || '#101113'};
	margin-bottom: ${({ mb }) => mb || 0}px;
	font-family: ${({ weight, fontFamily }) => {
		switch (weight) {
			case 300:
				return `${fontFamily}-Light`;

			case 400:
				return `${fontFamily}-Regular`;

			case 500:
				return `${fontFamily}-Medium`;

			case 600:
				return `${fontFamily}-SemiBold`;

			case 700:
				return `${fontFamily}-Bold`;

			default:
				return `${fontFamily}-Regular`;
		}
	}};
	text-align: ${({ textAlign }) => textAlign};
`;
