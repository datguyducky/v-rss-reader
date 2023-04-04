import styled from 'styled-components/native';

import { Pressable } from '../Pressable';

export const TextOnlyCardWrap = styled.View`
	background-color: #fff;
`;

export const StyledPressable = styled(Pressable.Background)`
	flex-direction: row;
`;

export const TextOnlyTextWrap = styled.View`
	flex: 1 0 0;
`;

export const TitleWrap = styled.View`
	max-height: 63px;
	margin-bottom: 4px;
`;
