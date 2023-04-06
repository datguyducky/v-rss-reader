import styled from 'styled-components/native';

import { Text } from '../Text';

export const ValueWithIconWrap = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const SelectModalHeading = styled.View`
	flex-direction: row;
	align-items: center;
	padding: ${({ theme }) => `${theme.spacing.size(2)}px ${theme.spacing.size(1.5)}px`};
`;

export const SelectModalTitle = styled(Text)`
	margin-left: ${({ theme }) => theme.spacing.size(3)}px;
	line-height: ${({ theme }) => theme.spacing.size(2)}px;
`;

export const SelectModalRow = styled.View`
	flex-direction: row;
	align-items: center;
	padding: ${({ theme }) => `${theme.spacing.size(2)}px ${theme.spacing.size(1.5)}px`};
`;
