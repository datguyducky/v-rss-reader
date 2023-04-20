import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

// We are using Pressable from react-native, and not our custom component, here to make sure that the onPress is correctly called and that the popup is correctly rendered, because
// when using our custom component it would require to use GestureHandlerRootView which then breaks the whole popup
export const PopupOverlay = styled.Pressable`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.overlay};
`;

// We use Pressable component here to make sure that onPress from overlay is not called here
export const PopupWrapper = styled.Pressable<SharedStylesProps>`
	width: 80%;
	min-width: 320px;
	border-radius: 12px;
	background-color: ${({ theme }) => theme.colors.base[0]};
	padding-horizontal: ${({ theme }) => theme.spacing.size(2)}px;
	padding-vertical: ${({ theme }) => theme.spacing.size(3)}px;
	padding-bottom: ${({ theme }) => theme.spacing.size(4)}px;

	${SharedStyles};
`;

export const HeaderWrap = styled.View`
	flex-direction: row;
	align-items: center;
`;
