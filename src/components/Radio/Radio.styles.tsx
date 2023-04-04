import styled from 'styled-components/native';

import { Pressable } from '../Pressable';

export interface RadioStylesProps {
	mb?: number;
}

export const RadioWrap = styled.View<Required<Pick<RadioStylesProps, 'mb'>>>`
	margin-bottom: ${({ mb }) => mb}px;
`;

export const StyledPressable = styled(Pressable.Background)`
	flex-direction: row;
	align-items: center;
`;

export const RadioCircle = styled.View<{ isChecked: boolean }>`
	height: 20px;
	width: 20px;
	background-color: #fff;
	border-radius: 20px;
	margin-right: 12px;
	border-style: solid;
	border-color: ${({ isChecked }) => (isChecked ? '#228BE6' : '#101113')};
	border-width: ${({ isChecked }) => (isChecked ? 5 : 1)}px;
`;
