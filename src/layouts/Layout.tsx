import styled from 'styled-components/native';

interface LayoutProps {
	noPadding?: boolean;
}

export const Layout = styled.View<LayoutProps>`
	flex: 1;
	background-color: #fff;
	padding: 0 ${({ noPadding }) => (noPadding ? 0 : 12)}px;
`;
