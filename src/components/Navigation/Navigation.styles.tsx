import styled from 'styled-components/native';

// TODO: Not sure if this one is required
export const NavigationContainer = styled.View``;

export const WrapWithCutOut = styled.View`
	elevation: 40;
	height: 64px;
	width: 100%;
	padding: 16px 12px;
	flex-direction: row;
	align-items: center;
	background-color: #fff;
`;

export const LeftIconWrap = styled.View`
	z-index: 20;
`;

export const CutOutContainer = styled.View<{ width: number }>`
	flex-direction: row;
	elevation: 40;
	position: absolute;
	bottom: 0;
	height: 175px;
	width: ${({ width }) => width}px;
	justify-content: space-around;
	z-index: 10;
`;

export const CutOutWrapper = styled.View`
	width: 68px;
	height: 68px;
	border-radius: 40px;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	margin-top: 72px;
`;

export const CutOut = styled.View`
	width: 56px;
	height: 56px;
	border-radius: 30px;
	elevation: 12;
	background-color: #fff;
	justify-content: center;
	align-items: center;
`;

export const RightIconWrap = styled.View`
	z-index: 20;
`;
