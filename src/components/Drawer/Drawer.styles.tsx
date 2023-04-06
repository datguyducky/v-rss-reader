import styled from 'styled-components/native';

export interface DrawerStylesProps {
	horizontalContent?: boolean;
}

export const DrawerContainer = styled.View<Required<Pick<DrawerStylesProps, 'horizontalContent'>>>`
	flex: 1;
	padding: ${({ theme }) => `${theme.spacing.size(2)}px 0 ${theme.spacing.size(4)}px`};
	flex-direction: ${({ horizontalContent }) => (horizontalContent ? 'row' : 'column')};
	justify-content: ${({ horizontalContent }) =>
		horizontalContent ? 'space-around' : 'flex-start'};
`;
