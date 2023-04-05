import styled from 'styled-components/native';

// We are using Pressable from react-native, and not our custom component, here to make sure that the onPress is correctly called and that the popup is correctly rendered, because
// when using our custom component it would be require to use GestureHandlerRootView which then breaks the whole popup
export const PopupOverlay = styled.Pressable`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

// We use Pressable component here to make sure that onPress from overlay is not called here
export const PopupWrapper = styled.Pressable`
	background-color: white;
	padding-horizontal: 16px;
	padding-vertical: 24px;
	padding-bottom: 32px;
	border-radius: 12px;
	width: 80%;
	min-width: 320px;
`;

export const HeaderWrap = styled.View`
	flex-direction: row;
	align-items: center;
`;
