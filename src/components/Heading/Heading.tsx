import React from 'react';

import { StyledNativeHeadingText, StyledNativeHeadingTextProps } from './Heading.styles';

export const Heading = ({
	children,
	weight,
	fontSize,
	color,
	tag,
	mb,
	style,
}: StyledNativeHeadingTextProps) => {
	return (
		<StyledNativeHeadingText
			weight={weight}
			fontSize={fontSize}
			color={color}
			tag={tag}
			mb={mb}
			style={style}
		>
			{children}
		</StyledNativeHeadingText>
	);
};
