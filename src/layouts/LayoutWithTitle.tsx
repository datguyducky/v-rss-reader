import { ReactNode } from 'react';
import styled from 'styled-components/native';

import { Heading } from '../components/Heading';

interface LayoutWithTitleProps {
	children: ReactNode;
	title: string;
}

const StyledLayoutWithTitle = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 24px 12px 16px;
`;

export const LayoutWithTitle = ({ children, title }: LayoutWithTitleProps) => {
	return (
		<StyledLayoutWithTitle>
			<Heading tag="h4" mb={16}>
				{title}
			</Heading>

			{children}
		</StyledLayoutWithTitle>
	);
};
