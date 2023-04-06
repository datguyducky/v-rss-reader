import styled from 'styled-components/native';

import { Pressable } from '../Pressable';
import { Text } from '../Text';

export const FeedCategoryWrap = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const PressableOpenIcon = styled(Pressable)`
	position: absolute;
	z-index: 10;
	left: ${({ theme }) => theme.spacing.size(2)}px;
`;

export const PressableSelectCategory = styled(Pressable.Background)`
	padding-left: ${({ theme }) => theme.spacing.size(6)}px;
	padding-right: ${({ theme }) => theme.spacing.size(2)}px;
`;

export const EmptyCategoryText = styled(Text)`
	margin-left: ${({ theme }) => theme.spacing.size(6)}px;
	margin-right: ${({ theme }) => theme.spacing.size(2)}px;
	margin-top: ${({ theme }) => theme.spacing.size(1)}px;
	margin-bottom: ${({ theme }) => theme.spacing.size(1)}px;
`;
