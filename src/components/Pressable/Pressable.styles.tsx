import styled from 'styled-components/native';

export interface StyledNativePressableStyles {
	px?: number;
	py?: number;
}

export const StyledNativePressable = styled.Pressable<
	Required<Pick<StyledNativePressableStyles, 'px' | 'py'>>
>`
	padding-vertical: ${({ py }) => py}px;
	padding-horizontal: ${({ px }) => px}px;
`;
