import React from 'react';

import { StyledNativeText, StyledNativeTextProps } from './Text.styles';

export const Text = ({ children, weight, fontSize, color }: StyledNativeTextProps) => {
	return (
		<StyledNativeText weight={weight} fontSize={fontSize} color={color}>
			{children}
		</StyledNativeText>
	);
};
