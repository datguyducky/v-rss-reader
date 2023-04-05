import styled from 'styled-components/native';

import { Divider } from '../components/Divider';
import { Radio as RadioComponent } from '../components/Radio';
import { Text } from '../components/Text';

export const SectionTitle = styled(Text)`
	padding-left: 16px;
`;

export const Radio = styled(RadioComponent).attrs(() => ({
	pressableStyle: { paddingVertical: 8, paddingHorizontal: 16 },
}))``;

export const SectionDivider = styled(Divider)`
	margin-bottom: 16px;
	margin-left: 16px;
	margin-right: 16px;
	width: auto;
`;
