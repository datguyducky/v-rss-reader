import { Animated } from 'react-native';
import styled from 'styled-components/native';

interface SwipeableFeedItemStylesProps {
	viewType?: 'MAGAZINE' | 'TEXT_ONLY' | 'THUMBNAIL'; // TODO: This type should be defined in one place rather than re-typing it everywhere where it's needed
}

export const LeftSwipeWrap = styled(Animated.View)<
	Required<Pick<SwipeableFeedItemStylesProps, 'viewType'>>
>`
	background-color: #101113;
	justify-content: center;
	flex: 1;
	padding: 12px;
	border-radius: ${({ viewType }) => (viewType === 'TEXT_ONLY' ? 0 : 6)}px;
`;

export const RightSwipeWrap = styled(Animated.View)<
	Required<Pick<SwipeableFeedItemStylesProps, 'viewType'>>
>`
	background-color: #40c057;
	justify-content: center;
	align-items: flex-end;
	flex: 1;
	padding: 12px;
	border-radius: ${({ viewType }) => (viewType === 'TEXT_ONLY' ? 0 : 6)}px;
`;
