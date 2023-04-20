import React from 'react';

type RadioGroupProps = { children: React.ReactNode; name: string; onValueChange?: () => void };

export const RadioGroup = ({ children, name, onValueChange }: RadioGroupProps) => {
	return (
		<>
			{(Array.isArray(children) ? [...children] : [children]).map(child => {
				return !child.props?.name
					? React.createElement(child.type, {
							...{
								onValueChange,
								...child.props,
								name,
								key: child.props.value,
							},
					  })
					: child;
			})}
		</>
	);
};
