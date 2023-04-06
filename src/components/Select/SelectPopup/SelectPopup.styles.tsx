import styled from 'styled-components/native';

import { Pressable } from '../../Pressable';

export interface SelectPopupStylesProps {
	mb?: number;
}

export const SelectPopupContainer = styled(Pressable)<Pick<SelectPopupStylesProps, 'mb'>>`
	flex-direction: row;
	align-items: center;
	margin-bottom: ${({ mb }) => mb || 0}px;
`;

export const StyledScrollView = styled.ScrollView`
	margin-top: ${({ theme }) => theme.spacing.size(2)}px;
	margin-bottom: ${({ theme }) => theme.spacing.size(3)}px;
`;
