import styled from 'styled-components/native';

export const NoFeedImageFound = styled.View`
	width: 20px;
	height: 20px;
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
	background-color: ${({ theme }) => theme.colors.base[4]};
`;
