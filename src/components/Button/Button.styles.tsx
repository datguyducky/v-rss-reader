import styled from 'styled-components/native';

export interface ButtonStylesProps {
	mb?: number;
	disabled?: boolean;
}

export const ButtonWrap = styled.View<Required<Pick<ButtonStylesProps, 'mb'>>>`
	margin-bottom: ${({ mb }) => mb}px;
`;
export const ButtonContent = styled.View<Pick<ButtonStylesProps, 'disabled'>>`
	align-items: center;
	background-color: ${({ disabled }) => (disabled ? '#e9ecef' : '#228be6')};
	padding: 12px 16px;
	border-radius: 4px;
`;
