import styled from 'styled-components/native';

import { SharedStyles, SharedStylesProps } from '../Shared.styles';

export interface ButtonStylesProps {
	disabled?: boolean;
	backgroundColor?: string;
	size?: 'small' | 'regular';
	variant?: 'filled' | 'outline';
}

export const ButtonWrap = styled.View<SharedStylesProps>`
	${SharedStyles};
`;

export const ButtonContent = styled.View<
	Pick<ButtonStylesProps, 'disabled' | 'backgroundColor' | 'size' | 'variant'>
>`
	align-items: center;
	border-width: 1px;
	background-color: ${({ theme, disabled, backgroundColor, variant }) => {
		if (disabled) {
			return theme.colors.base[2];
		}

		if (!disabled && variant !== 'outline') {
			return backgroundColor || theme.colors.primary;
		}

		if (variant === 'outline') {
			return 'transparent';
		}
	}};
	padding: ${({ theme, size }) => {
			switch (size) {
				case 'small':
					return theme.spacing.size(1) - 2;

				case 'regular':
					return theme.spacing.size(1.5);
			}
		}}px
		${({ theme }) => theme.spacing.size(2)}px;
	border-radius: ${({ theme }) => theme.borderRadius.small}px;
	border-color: ${({ theme, variant }) => {
		switch (variant) {
			case 'filled':
				return 'transparent';

			case 'outline':
				return theme.colors.base[9];
		}
	}};
`;
