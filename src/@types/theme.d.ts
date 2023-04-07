import { theme } from '../theme';

type ThemeInterface = typeof theme;

declare module 'styled-components/native' {
	interface DefaultTheme extends ThemeInterface {
		colors: ThemeInterface['colors'] & {
			base: string[];
			text: string;
			pressableBackground: string;
			statusBar: string;
			navigationShadow: string;
		};
	}
}
