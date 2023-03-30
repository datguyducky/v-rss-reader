import { Animated } from 'react-native';
import styled from 'styled-components/native';

interface SwipeableFeedItemStylesProps {
	viewType?: 'MAGAZINE' | 'TEXT_ONLY' | 'THUMBNAIL'; // TODO: This type should be defined in one place rather than re-typing it everywhere where it's needed
	isInverted?: boolean;
}

// By default used on the right
export const ReadLaterActionWrap = styled(Animated.View)<
	Required<Pick<SwipeableFeedItemStylesProps, 'viewType' | 'isInverted'>>
>`
	background-color: #101113;
	justify-content: center;
	align-items: ${({ isInverted }) => (isInverted ? 'flex-end' : 'stretch')};
	flex: 1;
	padding: 12px;
	border-radius: ${({ viewType }) => (viewType === 'TEXT_ONLY' ? 0 : 6)}px;
`;

// By default used on the right
export const ReadStatusActionWrap = styled(Animated.View)<
	Required<Pick<SwipeableFeedItemStylesProps, 'viewType' | 'isInverted'>>
>`
	background-color: #228be6;
	justify-content: center;
	align-items: ${({ isInverted }) => (isInverted ? 'stretch' : 'flex-end')};
	flex: 1;
	padding: 12px;
	border-radius: ${({ viewType }) => (viewType === 'TEXT_ONLY' ? 0 : 6)}px;
`;
