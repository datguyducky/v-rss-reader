import styled from 'styled-components/native';

export const FeedItemIconWrap = styled.ImageBackground`
	width: 20px;
	height: 20px;
	overflow: hidden;
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
	background-color: ${({ theme }) => theme.colors.base[4]};
`;
