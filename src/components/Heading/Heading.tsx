import React from 'react';

import { StyledNativeHeadingText, StyledNativeHeadingTextProps } from './Heading.styles';

export const Heading = ({
	children,
	weight,
	fontSize,
	color,
	tag,
}: StyledNativeHeadingTextProps) => {
	return (
		<StyledNativeHeadingText weight={weight} fontSize={fontSize} color={color} tag={tag}>
			{children}
		</StyledNativeHeadingText>
	);
};
