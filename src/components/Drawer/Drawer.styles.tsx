import styled from 'styled-components/native';

export interface DrawerStylesProps {
	horizontalContent?: boolean;
}

export const DrawerContainer = styled.View<Required<Pick<DrawerStylesProps, 'horizontalContent'>>>`
	flex: 1;
	padding: 24px 16px 32px;
	flex-direction: ${({ horizontalContent }) => (horizontalContent ? 'row' : 'column')};
	justify-content: ${({ horizontalContent }) =>
		horizontalContent ? 'space-around' : 'flex-start'};
`;
