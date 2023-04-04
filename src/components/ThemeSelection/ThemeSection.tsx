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
import { Pressable } from '../Pressable';
import { View } from 'react-native';

interface ThemeSectionProps extends ThemeSectionStylesProps {}
export const ThemeSection = ({}: ThemeSectionProps) => {
	const currentlyActive = 'LIGHT';

	return (
		<ThemeSectionWrap>
			<LightThemeWrap>
				<ThemePreview color="light" isActive={currentlyActive === 'LIGHT'}>
					<Pressable.Background
						borderless
						style={{ flex: 1 }}
						foreground={false}
						onPress={() => console.log('todo: set app theme to light')}
					/>
				</ThemePreview>

				<Text weight={300} fontSize={12}>
					Light
				</Text>
			</LightThemeWrap>

			<DarkThemeWrap>
				<ThemePreview color="dark" isActive={currentlyActive === 'DARK'}>
					<Pressable.Background
						borderless
						style={{ flex: 1 }}
						foreground={false}
						underlayColor="rgba(255, 255, 255, 12)"
						onPress={() => console.log('todo: set app theme to dark')}
					/>
				</ThemePreview>

				<Text weight={300} fontSize={12}>
					Dark
				</Text>
			</DarkThemeWrap>

			<DarkThemeWrap>
				<AutoThemePreviewWrap isActive={currentlyActive === 'AUTO'}>
					<Pressable.Background
						onPress={() =>
							console.log('todo: set app theme to follow users system settings')
						}
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
