import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';

import { SelectPopupContainer, StyledScrollView } from './SelectPopup.styles';
import { BasicButton } from '../../BasicButton';
import { Popup } from '../../Popup';
import { Pressable } from '../../Pressable';
import { Radio } from '../../Radio';
import { SharedStylesProps } from '../../Shared.styles';
import { Text } from '../../Text';

interface SelectPopupProps extends SharedStylesProps {
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
	style,
	...otherProps
}: SelectPopupProps) => {
	const theme = useTheme();
	const { getValues } = useFormContext();

	const [popupVisible, setPopupVisible] = useState(false);

	return (
		<>
			<SelectPopupContainer onPress={() => setPopupVisible(true)} {...otherProps}>
				<Text fontFamily="Montserrat">{label}</Text>

				<Text
					fontFamily="Montserrat"
					fontSize={12}
					weight={500}
					style={{ marginLeft: 'auto' }}
					color={theme.colors.base[6]}
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
							{options.map(({ label, value }) => (
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
						style={{ marginLeft: 'auto' }}
						pr={2}
						onPress={() => setPopupVisible(false)}
						textWeight={600}
						textColor={theme.colors.primary}
						pressableComponent={<Pressable.Opacity />}
					>
						Cancel
					</BasicButton>
				</GestureHandlerRootView>
			</Popup>
		</>
	);
};
