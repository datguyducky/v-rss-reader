import styled from 'styled-components/native';

import { Text } from '../components/Text';

export const EmptyCategoryText = styled(Text)`
	margin-horizontal: ${({ theme }) => theme.spacing.size(1.5)}px;
`;
