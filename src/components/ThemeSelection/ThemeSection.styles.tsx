import styled from 'styled-components/native';

export interface ThemeSectionStylesProps {}

export const ThemeSectionWrap = styled.View`
	flex-direction: row;
`;

export const LightThemeWrap = styled.View`
	margin-right: 48px;
	align-items: center;
`;

export const DarkThemeWrap = styled.View`
	align-items: center;
	margin-right: 48px;
`;

export const ThemePreview = styled.View<{
	color: 'light' | 'dark';
	isActive: boolean;
}>`
	width: 42px;
	height: 42px;
	border-radius: 42px;
	background-color: ${({ color }) => {
		switch (color) {
			case 'light':
				return '#fff';

			case 'dark':
				return '#101113';
		}
	}};
	border-width: 1px;
	border-style: solid;
	border-color: ${({ isActive }) => (isActive ? '#228BE6' : '#CED4DA')};
	margin-bottom: 6px;
`;

export const AutoThemePreviewWrap = styled.View<{
	isActive: boolean;
}>`
	width: 42px;
	height: 42px;
	border-radius: 42px;
	border-width: 1px;
	border-style: solid;
	border-color: ${({ isActive }) => (isActive ? '#228BE6' : '#CED4DA')};
	overflow: hidden;
	flex-direction: row;
	margin-bottom: 6px;
`;

export const AutoLightSection = styled.View`
	background-color: #fff;
	flex: 1;
`;

export const AutoDarkSection = styled.View`
	background-color: #101113;
	flex: 1;
`;
