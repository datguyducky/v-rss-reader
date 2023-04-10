import React from 'react';

import { StyledNativeText, StyledNativeTextProps } from './Text.styles';
import { SharedStylesProps } from '../Shared.styles';

export const Text = ({
	children,
	weight,
	fontSize,
	color,
	fontFamily = 'Raleway',
	numberOfLines,
	style,
	textAlign = 'auto',
	...otherProps
}: StyledNativeTextProps & SharedStylesProps) => {
	return (
		<StyledNativeText
			{...otherProps}
			weight={weight}
			fontSize={fontSize}
			color={color}
			fontFamily={fontFamily}
			numberOfLines={numberOfLines}
			style={style}
			textAlign={textAlign}
		>
			{children}
		</StyledNativeText>
	);
};
