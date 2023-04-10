import styled from 'styled-components/native';

import { Pressable } from '../Pressable';
import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export const RadioWrap = styled.View<SharedStylesProps>`
	${SharedStyles};
`;

export const StyledPressable = styled(Pressable.Background)`
	flex-direction: row;
	align-items: center;
`;

export const RadioCircle = styled.View<{ isChecked: boolean }>`
	height: 20px;
	width: 20px;
	border-style: solid;
	background-color: ${({ theme }) => theme.colors.base[0]};
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
	margin-right: ${({ theme }) => theme.spacing.size(1.5)}px;
	border-color: ${({ theme, isChecked }) =>
		isChecked ? theme.colors.primary : theme.colors.base[9]};
	border-width: ${({ isChecked }) => (isChecked ? 5 : 1)}px;
`;
