import { useContext } from 'react';

import { ThemeContext, THEMES } from '../../context/ThemeContext';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import {
	AutoDarkSection,
	AutoLightSection,
	AutoThemePreviewWrap,
	DarkThemeWrap,
	LightThemeWrap,
	ThemePreview,
	ThemeSectionStylesProps,
	ThemeSectionWrap,
} from './ThemeSection.styles';

interface ThemeSectionProps extends ThemeSectionStylesProps {}
export const ThemeSection = ({}: ThemeSectionProps) => {
	const { theme, setTheme } = useContext(ThemeContext);

	return (
		<ThemeSectionWrap>
			<LightThemeWrap>
				<ThemePreview color="light" isActive={theme === THEMES.light}>
					<Pressable.Background
						borderless
						style={{ flex: 1 }}
						foreground={false}
						onPress={() => setTheme(THEMES.light)}
					/>
				</ThemePreview>

				<Text weight={300} fontSize={12}>
					Light
				</Text>
			</LightThemeWrap>

			<DarkThemeWrap>
				<ThemePreview color="dark" isActive={theme === THEMES.dark}>
					<Pressable.Background
						borderless
						style={{ flex: 1 }}
						foreground={false}
						underlayColor="rgba(255, 255, 255, 12)"
						onPress={() => setTheme(THEMES.dark)}
					/>
				</ThemePreview>

				<Text weight={300} fontSize={12}>
					Dark
				</Text>
			</DarkThemeWrap>

			<DarkThemeWrap>
				<AutoThemePreviewWrap isActive={theme === THEMES.auto}>
					<Pressable.Background
						onPress={() => setTheme(THEMES.auto)}
						style={{ flex: 1, flexDirection: 'row' }}
					>
						<AutoLightSection />
						<AutoDarkSection />
					</Pressable.Background>
				</AutoThemePreviewWrap>

				<Text weight={300} fontSize={12}>
					Auto
				</Text>
			</DarkThemeWrap>
		</ThemeSectionWrap>
	);
};
