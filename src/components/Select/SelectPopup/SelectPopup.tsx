import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BasicButton } from '../../BasicButton';
import { Popup } from '../../Popup';
import { Pressable } from '../../Pressable';
import { Radio } from '../../Radio';
import { Text } from '../../Text';
import {
	SelectPopupContainer,
	SelectPopupStylesProps,
	StyledScrollView,
} from './SelectPopup.styles';
import { StyleProp, ViewStyle } from 'react-native';

interface SelectPopupProps extends SelectPopupStylesProps {
	label: string;
	name: string;
	options: { label: string; value: string }[];
	onValueChange?: () => void;
	style?: StyleProp<ViewStyle>;
}

export const SelectPopup = ({
	label,
	name,
	options = [],
	onValueChange,
	mb,
	style,
}: SelectPopupProps) => {
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

			<Popup
				isOpen={popupVisible}
				onClose={() => setPopupVisible(false)}
				title={label}
				titleStyle={{ paddingLeft: 16, marginBottom: 0 }}
				style={style}
			>
				<GestureHandlerRootView>
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
									pressableStyle={{ paddingLeft: 16, paddingVertical: 8 }}
								/>
							))}
						</Radio.Group>
					</StyledScrollView>

					<BasicButton
						style={{ marginLeft: 'auto', paddingRight: 16 }}
						onPress={() => setPopupVisible(false)}
						textWeight={600}
						textColor="#228be6"
						pressableComponent={<Pressable.Opacity />}
					>
						Cancel
					</BasicButton>
				</GestureHandlerRootView>
			</Popup>
		</>
	);
};
