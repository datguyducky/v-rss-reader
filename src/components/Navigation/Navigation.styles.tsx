import styled from 'styled-components/native';

// TODO: Not sure if this one is required
export const NavigationContainer = styled.View``;

export const WrapWithCutOut = styled.View`
	height: 64px;
	width: 100%;
	flex-direction: row;
	align-items: center;
	padding: ${({ theme }) => `${theme.spacing.size(2)}px ${theme.spacing.size(1.5)}px`};
	background-color: ${({ theme }) => theme.colors.base[0]};
`;

export const LeftIconWrap = styled.View`
	z-index: 20;
`;

export const CutOutContainer = styled.View<{ width: number }>`
	flex-direction: row;
	position: absolute;
	justify-content: space-around;
	bottom: 0;
	height: 175px;
	z-index: 10;
	background-color: transparent;
	width: ${({ width }) => width}px;
`;

export const CutOutWrapper = styled.View`
	width: 68px;
	height: 68px;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	background-color: transparent;
	margin-top: ${({ theme }) => theme.spacing.size(9)}px;
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
`;

export const CutOut = styled.View`
	width: 56px;
	height: 56px;
	elevation: 12; // This only visible when light theme is used
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: ${({ theme }) => theme.borderRadius.full}px;
`;

export const RightIconWrap = styled.View`
	z-index: 20;
`;
