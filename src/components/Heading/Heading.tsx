import React from 'react';

import { StyledNativeHeadingText, StyledNativeHeadingTextProps } from './Heading.styles';
import { SharedStylesProps } from '../Shared.styles';

export const Heading = ({
	children,
	weight,
	fontSize,
	color,
	tag,
	style,
	...otherProps
}: SharedStylesProps & StyledNativeHeadingTextProps) => {
	return (
		<StyledNativeHeadingText
			{...otherProps}
			weight={weight}
			fontSize={fontSize}
			color={color}
			tag={tag}
			style={style}
		>
			{children}
		</StyledNativeHeadingText>
	);
};
