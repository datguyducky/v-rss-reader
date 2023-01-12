import React from 'react';

import { StyledNativeHeadingText, StyledNativeHeadingTextProps } from './Heading.styles';

export const Heading = ({
	children,
	weight,
	fontSize,
	color,
	tag,
	mb,
}: StyledNativeHeadingTextProps) => {
	return (
		<StyledNativeHeadingText
			weight={weight}
			fontSize={fontSize}
			color={color}
			tag={tag}
			mb={mb}
		>
			{children}
		</StyledNativeHeadingText>
	);
};
