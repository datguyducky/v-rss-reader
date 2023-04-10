import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export const FeedItemIconWrap = styled.ImageBackground<SharedStylesProps>`
	width: 20px;
	height: 20px;
	overflow: hidden;
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
	background-color: ${({ theme }) => theme.colors.base[4]};

	${SharedStyles};
`;
