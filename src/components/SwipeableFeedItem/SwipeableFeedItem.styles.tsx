import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { Pressable } from '../Pressable';

interface SwipeableFeedItemStylesProps {
	viewType?: 'MAGAZINE' | 'TEXT_ONLY' | 'THUMBNAIL'; // TODO: This type should be defined in one place rather than re-typing it everywhere where it's needed
	isInverted?: boolean;
}

// By default used on the right
export const ReadLaterActionWrap = styled(Animated.View)<
	Required<Pick<SwipeableFeedItemStylesProps, 'viewType' | 'isInverted'>>
>`
	justify-content: center;
	flex: 1;
	background-color: ${({ theme }) => theme.colors.success};
	align-items: ${({ isInverted }) => (isInverted ? 'flex-end' : 'stretch')};
	padding: ${({ theme }) => theme.spacing.size(1.5)}px;
	border-radius: ${({ theme, viewType }) =>
		viewType === 'THUMBNAIL' ? theme.borderRadius.regular : 0}px;
`;

// By default used on the right
export const ReadStatusActionWrap = styled(Animated.View)<
	Required<Pick<SwipeableFeedItemStylesProps, 'viewType' | 'isInverted'>>
>`
	justify-content: center;
	flex: 1;
	padding: ${({ theme }) => theme.spacing.size(1.5)}px;
	background-color: ${({ theme }) => theme.colors.primary};
	align-items: ${({ isInverted }) => (isInverted ? 'stretch' : 'flex-end')};
	border-radius: ${({ theme, viewType }) =>
		viewType === 'THUMBNAIL' ? theme.borderRadius.regular : 0}px;
`;

export const PressableThumbnail = styled(Pressable.Background)`
	overflow: hidden;
	border-radius: ${({ theme }) => theme.borderRadius.regular}px;
	margin: ${({ theme }) => `${theme.spacing.size(1)}px ${theme.spacing.size(1.5)}px`}};
`;
