import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

export const SwitchWrap = styled.View<SharedStylesProps>`
	flex-direction: row;
	align-items: center;

	${SharedStyles};
`;

export const SwitchLabel = styled(Text).attrs(() => ({
	fontFamily: 'Montserrat',
}))`
	line-height: 16px;
	margin-right: auto;
`;

export const AnimatedSwitch = styled(Animated.View)`
	width: 42px;
	padding-vertical: 3px;
	padding-horizontal: 3px;
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
`;

export const AnimatedSwitchThumb = styled(Animated.View)`
	width: 14px;
	height: 14px;
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
	background-color: ${({ theme }) => theme.colors.base[0]};
`;
