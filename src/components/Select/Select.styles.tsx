import styled from 'styled-components/native';
import { Text } from '../Text';

export const ValueWithIconWrap = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const SelectModalHeading = styled.View`
	padding-horizontal: 12px;
	padding-top: 16px;
	padding-bottom: 16px;
	flex-direction: row;
	align-items: center;
`;

export const SelectModalTitle = styled(Text)`
	margin-left: 24px;
	line-height: 16px;
`;

export const SelectModalRow = styled.View`
	padding: 16px 12px;
	flex-direction: row;
	align-items: center;
`;
