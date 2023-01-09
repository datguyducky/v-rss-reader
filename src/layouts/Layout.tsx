import styled from 'styled-components/native';

interface LayoutProps {
	viewType: 'MAGAZINE' | 'TEXT_ONLY' | 'THUMBNAIL';
}

export const Layout = styled.View<LayoutProps>`
	flex: 1;
	background-color: #fff;
	padding: 24px ${({ viewType }) => (viewType === 'TEXT_ONLY' ? 0 : 12)}px 0;
`;
