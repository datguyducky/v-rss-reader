import { TextProps as NativeTextProps } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../theme';

export interface StyledNativeHeadingTextProps extends NativeTextProps {
	weight?: 300 | 400 | 500 | 600 | 700;
	color?: string;
	fontSize?: number;
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	mb?: number;
}
export const StyledNativeHeadingText = styled.Text<StyledNativeHeadingTextProps>`
	font-size: ${({ fontSize, tag }) => fontSize || (tag ? theme.headings?.[tag] : 64)}px;
	color: ${({ theme, color }) => color || theme.colors.base[9]};
	font-family: ${({ weight }) => theme.font.retrieve('Montserrat', weight || 600)};
	margin-bottom: ${({ mb }) => mb || 0}px;
`;
