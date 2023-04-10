import { ColorValue, ViewStyle } from 'react-native';
import { css } from 'styled-components/native';
export interface SharedStylesProps {
	mt?: number; // margin top
	mr?: number; // margin right
	mb?: number; // margin bottom
	ml?: number; // margin left
	mx?: number; // margin right, margin left
	my?: number; // margin top, margin bottom

	pt?: number; // padding top
	pr?: number; // padding right
	pb?: number; // padding bottom
	pl?: number; // padding left
	px?: number; // padding right, padding left
	py?: number; // padding top, padding bottom

	bg?: ColorValue; // background color

	pos?: ViewStyle['position']; // position
	top?: number; // top
	left?: number; // left
	bottom?: number; // bottom
	right?: number; // right
}

export const SharedStyles = css<SharedStylesProps>`
	${({ theme, mt }) => mt && `margin-top: ${theme.spacing.size(mt)}px;`};
	${({ theme, mr }) => mr && `margin-right: ${theme.spacing.size(mr)}px;`};
	${({ theme, mb }) => mb && `margin-bottom: ${theme.spacing.size(mb)}px;`};
	${({ theme, ml }) => ml && `margin-left: ${theme.spacing.size(ml)}px;`};
	${({ theme, mx, mr, ml }) =>
		mx &&
		`margin-left: ${theme.spacing.size(ml || mx)}px; margin-right: ${theme.spacing.size(
			mr || mx,
		)}px;`};
	${({ theme, my, mt, mb }) =>
		my &&
		`margin-top: ${theme.spacing.size(mt || my)}px; margin-bottom: ${theme.spacing.size(
			mb || my,
		)}px;`};

	${({ theme, pt }) => pt && `padding-top: ${theme.spacing.size(pt)}px;`};
	${({ theme, pr }) => pr && `padding-right: ${theme.spacing.size(pr)}px;`};
	${({ theme, pb }) => pb && `padding-bottom: ${theme.spacing.size(pb)}px;`};
	${({ theme, pl }) => pl && `padding-left: ${theme.spacing.size(pl)}px;`};
	${({ theme, px, pr, pl }) =>
		px &&
		`padding-left: ${theme.spacing.size(pl || px)}px; padding-right: ${theme.spacing.size(
			pr || px,
		)}px;`};
	${({ theme, py, pt, pb }) =>
		py &&
		`padding-top: ${theme.spacing.size(pt || py)}px; padding-bottom: ${theme.spacing.size(
			pb || py,
		)}px;`};

	${({ bg }) => bg && `background-color: ${String(bg)};`};

	${({ pos }) => pos && `position: ${pos};`};
	${({ top }) => top && `top: ${top}px;`};
	${({ left }) => left && `left: ${left}px;`};
	${({ bottom }) => bottom && `bottom: ${bottom}px;`};
	${({ right }) => right && `right: ${right}px;`};
`;
