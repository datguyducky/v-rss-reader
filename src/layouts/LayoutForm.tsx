import { ReactNode } from 'react';
import styled from 'styled-components/native';

import { Heading } from '../components/Heading';

interface LayoutFormProps {
	children: ReactNode;
	title: string;
}

const StyledLayoutForm = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 24px 12px 16px;
`;

export const LayoutForm = ({ children, title }: LayoutFormProps) => {
	return (
		<StyledLayoutForm>
			<Heading tag="h4" mb={16}>
				{title}
			</Heading>

			{children}
		</StyledLayoutForm>
	);
};
