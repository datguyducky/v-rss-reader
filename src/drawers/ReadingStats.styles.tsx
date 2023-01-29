import styled from 'styled-components/native';

import { Text } from '../components/Text';

export const SectionWrap = styled.View<{ mb?: number }>`
	align-items: center;
	flex-direction: row;
	margin-bottom: ${({ mb }) => mb || 0}px;
`;

export const SectionTitle = styled(Text).attrs({ fontFamily: 'Montserrat' })`
	width: 80%;
`;

export const SectionCount = styled(Text).attrs({ fontFamily: 'Montserrat', weight: 600 })`
	margin-left: auto;
`;
