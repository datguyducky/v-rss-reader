import styled from 'styled-components/native';

import { Pressable } from '@components/Pressable';

export const PressableAppDetails = styled(Pressable.Opacity)`
	margin-vertical: ${({ theme }) => theme.spacing.size(3)}px;
`;
