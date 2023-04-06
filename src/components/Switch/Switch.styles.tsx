import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { Text } from '../Text';

export interface SwitchStylesProps {
	mb?: number;
}

export const SwitchWrap = styled.View<Pick<SwitchStylesProps, 'mb'>>`
	flex-direction: row;
	align-items: center;
	margin-bottom: ${({ mb }) => mb || 0}px;
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
