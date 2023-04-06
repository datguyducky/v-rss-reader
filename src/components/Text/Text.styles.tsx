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
	color: ${({ theme, color }) => color || theme.colors.base[9]};
	margin-bottom: ${({ mb }) => mb || 0}px;
	font-family: ${({ theme, weight, fontFamily }) =>
		theme.font.retrieve(fontFamily as string, weight)};
	text-align: ${({ textAlign }) => textAlign};
`;
