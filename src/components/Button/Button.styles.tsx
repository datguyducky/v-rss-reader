import styled from 'styled-components/native';

export interface ButtonStylesProps {
	mb?: number;
	disabled?: boolean;
	backgroundColor?: string;
	size?: 'small' | 'regular';
	variant?: 'filled' | 'outline';
}

export const ButtonWrap = styled.View<Required<Pick<ButtonStylesProps, 'mb'>>>`
	margin-bottom: ${({ mb }) => mb}px;
`;
export const ButtonContent = styled.View<
	Pick<ButtonStylesProps, 'disabled' | 'backgroundColor' | 'size' | 'variant'>
>`
	align-items: center;
	background-color: ${({ disabled, backgroundColor, variant }) => {
		if (disabled) {
			return '#e9ecef';
		}

		if (!disabled && variant !== 'outline') {
			return backgroundColor;
		}

		if (variant === 'outline') {
			return 'transparent';
		}
	}};
	padding: ${({ size }) => {
			switch (size) {
				case 'small':
					return 6;

				case 'regular':
					return 12;
			}
		}}px
		16px;
	border-radius: 4px;
	border-width: 1px;
	border-color: ${({ variant }) => {
		switch (variant) {
			case 'filled':
				return 'transparent';

			case 'outline':
				return '#101113';
		}
	}};
`;
