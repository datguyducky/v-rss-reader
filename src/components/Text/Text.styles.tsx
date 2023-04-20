import { TextProps as NativeTextProps } from 'react-native';
import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export interface StyledNativeTextProps extends NativeTextProps {
	weight?: 300 | 400 | 500 | 600 | 700;
	color?: string;
	fontSize?: number;
	fontFamily?: 'Raleway' | 'Montserrat';
	textAlign?: 'left' | 'center' | 'right' | 'auto';
}

export const StyledNativeText = styled.Text<StyledNativeTextProps & SharedStylesProps>`
	font-size: ${({ fontSize }) => fontSize || 16}px;
	color: ${({ theme, color }) => color || theme.colors.text};
	font-family: ${({ theme, weight, fontFamily }) =>
		theme.font.retrieve(fontFamily as string, weight)};
	text-align: ${({ textAlign }) => textAlign};

	${SharedStyles};
`;
