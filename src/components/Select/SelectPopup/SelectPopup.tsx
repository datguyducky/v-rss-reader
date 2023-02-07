import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { BasicButton } from '../../BasicButton';
import { Popup } from '../../Popup';
import { Radio } from '../../Radio';
import { Text } from '../../Text';
import {
	SelectPopupContainer,
	SelectPopupStylesProps,
	StyledScrollView,
} from './SelectPopup.styles';

interface SelectPopupProps extends SelectPopupStylesProps {
	label: string;
	name: string;
	options: { label: string; value: string }[];
	onValueChange?: () => void;
}

export const SelectPopup = ({ label, name, options = [], onValueChange, mb }: SelectPopupProps) => {
	const { getValues } = useFormContext();

	const [popupVisible, setPopupVisible] = useState(false);

	return (
		<>
			<SelectPopupContainer onPress={() => setPopupVisible(true)} mb={mb}>
				<Text fontFamily="Montserrat">{label}</Text>

				<Text
					fontFamily="Montserrat"
					fontSize={12}
					weight={500}
					style={{ marginLeft: 'auto' }}
					color="#868E96"
				>
					{options.find(item => item.value === getValues(name))?.label || ''}
				</Text>
			</SelectPopupContainer>

			<Popup isOpen={popupVisible} onClose={() => setPopupVisible(false)} title={label}>
				<View>
					<StyledScrollView>
						<Radio.Group
							name={name}
							onValueChange={() => {
								setPopupVisible(false);
								onValueChange?.();
							}}
						>
							{options.map(({ label, value }, index) => (
								<Radio
									label={label}
									value={value}
									key={value}
									mb={index === options.length - 1 ? 0 : 16}
								/>
							))}
						</Radio.Group>
					</StyledScrollView>

					<BasicButton
						style={{ marginLeft: 'auto' }}
						onPress={() => setPopupVisible(false)}
						textWeight={600}
						textColor="#228be6"
					>
						Cancel
					</BasicButton>
				</View>
			</Popup>
		</>
	);
};
