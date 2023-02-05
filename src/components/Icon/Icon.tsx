import { cloneElement, ComponentType } from 'react';
import { SvgProps } from 'react-native-svg';

interface IconProps extends SvgProps {
	name: ComponentType;
	size: number;
	color?: string;
}

export const Icon = ({ name: PassedIcon, size, color = '#101113', ...props }: IconProps) =>
	cloneElement(<PassedIcon />, { ...props, size, color });
