import styled from 'styled-components/native';

export interface DrawerStylesProps {
	horizontalContent?: boolean;
}

export const DrawerContainer = styled.View<Required<Pick<DrawerStylesProps, 'horizontalContent'>>>`
	flex: 1;
	padding: 16px 0 32px;
	flex-direction: ${({ horizontalContent }) => (horizontalContent ? 'row' : 'column')};
	justify-content: ${({ horizontalContent }) =>
		horizontalContent ? 'space-around' : 'flex-start'};
`;
