import styled from 'styled-components/native';

import { Divider } from '../components/Divider';
import { Radio as RadioComponent } from '../components/Radio';
import { Text } from '../components/Text';

export const SectionTitle = styled(Text)`
	padding-left: ${({ theme }) => theme.spacing.size(2)}px;
`;

export const Radio = styled(RadioComponent).attrs(({ theme }) => ({
	pressableStyle: {
		paddingVertical: theme.spacing.size(1),
		paddingHorizontal: theme.spacing.size(2),
	},
}))``;

export const SectionDivider = styled(Divider)`
	width: auto;
	margin: ${({ theme }) => `${theme.spacing.size(2)}px 0 ${theme.spacing.size(2)}px`};
`;
