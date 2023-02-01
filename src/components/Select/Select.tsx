import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FlatList, Modal, View, Pressable } from 'react-native';
import { ArrowLeftIcon as ArrowLeftIconMini } from 'react-native-heroicons/mini';
import { ChevronDownIcon } from 'react-native-heroicons/outline';

import { InputWrapper } from '../InputWrapper';
import { Text } from '../Text';
import { BasicSelect } from './BasicSelect/BasicSelect';
import { SelectModalHeading, ValueWithIconWrap } from './Select.styles';

interface SelectProps {
	label: string;
	name: string;
	data: { label: string; value: string }[];
	modalTitle: string;
}

// TODO: Maybe I could move the Modal component to a separate one, but I'm not 100% certain about that, as this wouldn't change much and it would require to have some props passed down
export const Select = ({ label, data, name, modalTitle }: SelectProps) => {
	const { control } = useFormContext();

	const [isSelectModalVisible, setSelectModalVisibility] = useState(false);

	const toggleDropdown = (): void => {
		if (isSelectModalVisible) {
			setSelectModalVisibility(false);
		} else {
			setSelectModalVisibility(true);
		}
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value: fieldValue }, fieldState: { error } }) => (
				<>
					<InputWrapper
						label={label}
						name={name}
						onBlur={toggleDropdown}
						onFocus={toggleDropdown}
						onPress={toggleDropdown}
						forceUnfocus={isSelectModalVisible}
					>
						<ValueWithIconWrap style={{ flexDirection: 'row', alignItems: 'center' }}>
							{fieldValue !== null &&
							fieldValue !== undefined &&
							fieldValue !== '' ? (
								<Text style={{ paddingLeft: 12 }}>
									{data.find(item => item.value === fieldValue)?.label}
								</Text>
							) : (
								<></>
							)}

							<ChevronDownIcon
								size={16}
								color="#101113"
								style={{ marginLeft: 'auto', marginRight: 12 }}
							/>
						</ValueWithIconWrap>
					</InputWrapper>

					<Modal
						animationType="slide"
						transparent={false}
						visible={isSelectModalVisible}
						onRequestClose={() => setSelectModalVisibility(false)}
					>
						<View>
							<SelectModalHeading>
								<Pressable onPress={() => setSelectModalVisibility(false)}>
									<ArrowLeftIconMini size={24} color="#101113" />
								</Pressable>

								<Text
									style={{
										marginLeft: 24,
										lineHeight: 16,
									}}
									weight={600}
								>
									{modalTitle}
								</Text>
							</SelectModalHeading>

							<FlatList
								style={{ marginTop: 8, marginBottom: 24 }}
								data={data}
								renderItem={({ item }) => (
									<Pressable
										onPress={() => {
											if (item.value === fieldValue) {
												onChange(null);
											} else {
												onChange(item.value);
											}
											setSelectModalVisibility(false);
										}}
									>
										<View
											style={{
												paddingHorizontal: 12,
												paddingVertical: 8,
											}}
										>
											<Text style={{ lineHeight: 16 }}>{item.label}</Text>
										</View>
									</Pressable>
								)}
								ItemSeparatorComponent={() => (
									<View
										style={{
											marginBottom: 16,
										}}
									/>
								)}
								keyExtractor={(item, index) => index.toString()}
							/>
						</View>
					</Modal>
				</>
			)}
		/>
	);
};

Select.Basic = BasicSelect;
