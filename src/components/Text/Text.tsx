import React from 'react';

import { StyledNativeText, StyledNativeTextProps } from './Text.styles';

export const Text = ({
	children,
	weight,
	fontSize,
	color,
	fontFamily = 'Raleway',
	mb,
}: StyledNativeTextProps) => {
	return (
		<StyledNativeText
			weight={weight}
			fontSize={fontSize}
			color={color}
			fontFamily={fontFamily}
			mb={mb}
		>
			{children}
		</StyledNativeText>
	);
};
