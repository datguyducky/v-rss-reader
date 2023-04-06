import { cloneElement, ComponentType } from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

interface IconProps extends SvgProps {
	name: ComponentType;
	size: number;
	color?: string;
}

export const Icon = ({ name: PassedIcon, size, color, ...props }: IconProps) => {
	const theme = useTheme();

	return cloneElement(<PassedIcon />, { ...props, size, color: color || theme.colors.base[9] });
};
