import styled from 'styled-components/native';

import { Pressable } from '../Pressable';
import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export const TextOnlyCardWrap = styled.View<SharedStylesProps>`
	background-color: ${({ theme }) => theme.colors.base[0]};

	${SharedStyles};
`;

export const StyledPressable = styled(Pressable.Background)`
	flex-direction: row;
`;

export const TextOnlyTextWrap = styled.View`
	flex: 1 0 0;
`;

export const TitleWrap = styled.View`
	max-height: 63px;
	margin-bottom: ${({ theme }) => theme.spacing.size(0.5)}px;
`;
