import styled from 'styled-components/native';

import { darkTheme, lightTheme } from '../../theme/colors';

export interface ThemeSectionStylesProps {}

export const ThemeSectionWrap = styled.View`
	flex-direction: row;
`;

export const LightThemeWrap = styled.View`
	align-items: center;
	margin-right: ${({ theme }) => theme.spacing.size(6)}px;
`;

export const DarkThemeWrap = styled.View`
	align-items: center;
	margin-right: ${({ theme }) => theme.spacing.size(6)}px;
`;

export const ThemePreview = styled.View<{
	color: 'light' | 'dark';
	isActive: boolean;
}>`
	width: 42px;
	height: 42px;
	border-width: 1px;
	border-style: solid;
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
	background-color: ${({ theme, color }) => {
		switch (color) {
			case 'light':
				return lightTheme.base[0];

			case 'dark':
				return darkTheme.base[0];
		}
	}};
	border-color: ${({ theme, isActive }) =>
		isActive ? theme.colors.primary : theme.colors.base[3]};
	margin-bottom: ${({ theme }) => theme.spacing.size(1) - 2}px;
`;

export const AutoThemePreviewWrap = styled.View<{
	isActive: boolean;
}>`
	width: 42px;
	height: 42px;
	border-width: 1px;
	border-style: solid;
	overflow: hidden;
	flex-direction: row;
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
	margin-bottom: ${({ theme }) => theme.spacing.size(1) - 2}px;
	border-color: ${({ theme, isActive }) =>
		isActive ? theme.colors.primary : theme.colors.base[3]};
`;

export const AutoLightSection = styled.View`
	flex: 1;
	background-color: ${lightTheme.base[0]};
`;

export const AutoDarkSection = styled.View`
	flex: 1;
	background-color: ${darkTheme.base[0]};
`;
