import styled from 'styled-components/native';

import { Pressable } from '../../Pressable';
import { SharedStyles, SharedStylesProps } from '../../Shared.styles';

export const SelectPopupContainer = styled(Pressable)<SharedStylesProps>`
	flex-direction: row;
	align-items: center;

	${SharedStyles};
`;

export const StyledScrollView = styled.ScrollView`
	margin-top: ${({ theme }) => theme.spacing.size(2)}px;
	margin-bottom: ${({ theme }) => theme.spacing.size(3)}px;
`;
