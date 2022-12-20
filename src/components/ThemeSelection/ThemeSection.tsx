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
import { Pressable } from 'react-native';

interface ThemeSectionProps extends ThemeSectionStylesProps {}
export const ThemeSection = ({}: ThemeSectionProps) => {
	const currentlyActive = 'LIGHT';

	return (
		<ThemeSectionWrap>
			<Pressable onPress={() => console.log('todo: set app theme to light')}>
				<LightThemeWrap>
					<ThemePreview color="light" isActive={currentlyActive === 'LIGHT'} />

					<Text weight={300} fontSize={12}>
						Light
					</Text>
				</LightThemeWrap>
			</Pressable>

			<Pressable onPress={() => console.log('todo: set app theme to dark')}>
				<DarkThemeWrap>
					<ThemePreview color="dark" isActive={currentlyActive === 'DARK'} />

					<Text weight={300} fontSize={12}>
						Dark
					</Text>
				</DarkThemeWrap>
			</Pressable>

			<Pressable
				onPress={() => console.log('todo: set app theme to follow users system settings')}
			>
				<DarkThemeWrap>
					<AutoThemePreviewWrap isActive={currentlyActive === 'AUTO'}>
						<AutoLightSection />
						<AutoDarkSection />
					</AutoThemePreviewWrap>

					<Text weight={300} fontSize={12}>
						Auto
					</Text>
				</DarkThemeWrap>
			</Pressable>
		</ThemeSectionWrap>
	);
};
