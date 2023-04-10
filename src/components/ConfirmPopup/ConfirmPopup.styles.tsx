import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export const ConfirmPopupWrapper = styled.View<SharedStylesProps>`
	${SharedStyles};
`;

export const StyledGestureHandlerRootView = styled(GestureHandlerRootView)`
	flex-direction: row;
	margin-left: auto;
`;
