import { useContext } from 'react';

import { ThemeContext, THEMES } from '@context/ThemeContext';

import {
	AutoDarkSection,
	AutoLightSection,
	AutoThemePreviewWrap,
	DarkThemeWrap,
	LightThemeWrap,
	ThemePreview,
	ThemeSectionWrap,
} from './ThemeSection.styles';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface ThemeSectionProps extends SharedStylesProps {
	onClose: () => void;
}
export const ThemeSection = ({ onClose, ...otherProps }: ThemeSectionProps) => {
	const { theme, setTheme } = useContext(ThemeContext);

	const handleThemeChange = (theme: THEMES) => {
		setTheme(theme);

		// This timeout here is needed as without it the drawer closes and then just reopens itself again
		setTimeout(function () {
			onClose?.();
		}, 300);
	};

	return (
		<ThemeSectionWrap {...otherProps}>
			<LightThemeWrap>
				<ThemePreview color="light" isActive={theme === THEMES.light}>
					<Pressable.Background
						borderless
						style={{ flex: 1 }}
						foreground={false}
						underlayColor="#228be633"
						onPress={() => handleThemeChange(THEMES.light)}
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
						underlayColor="#228be633"
						onPress={() => handleThemeChange(THEMES.dark)}
					/>
				</ThemePreview>

				<Text weight={300} fontSize={12}>
					Dark
				</Text>
			</DarkThemeWrap>

			<DarkThemeWrap>
				<AutoThemePreviewWrap isActive={theme === THEMES.auto}>
					<Pressable.Background
						onPress={() => handleThemeChange(THEMES.auto)}
						underlayColor="#228be633"
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
