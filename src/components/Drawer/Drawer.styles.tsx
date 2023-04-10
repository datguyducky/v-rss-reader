import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export interface DrawerStylesProps {
	horizontalContent?: boolean;
}

export const DrawerContainer = styled.View<
	Required<Pick<DrawerStylesProps, 'horizontalContent'>> & SharedStylesProps
>`
	flex: 1;
	padding: ${({ theme }) => `${theme.spacing.size(2)}px 0 ${theme.spacing.size(4)}px`};
	flex-direction: ${({ horizontalContent }) => (horizontalContent ? 'row' : 'column')};
	justify-content: ${({ horizontalContent }) =>
		horizontalContent ? 'space-around' : 'flex-start'};

	${SharedStyles};
`;
