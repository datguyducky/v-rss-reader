import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FlatList, Modal, View, Pressable } from 'react-native';
import { ArrowLeftIcon as ArrowLeftIconMini } from 'react-native-heroicons/mini';
import { ChevronDownIcon } from 'react-native-heroicons/outline';

import { Icon } from '../Icon';
import { InputWrapper } from '../InputWrapper';
import { Text } from '../Text';
import { SelectPopup } from './SelectPopup/SelectPopup';
import { SelectModalHeading, ValueWithIconWrap } from './Select.styles';
import { RadioCircle } from '../Radio/Radio.styles';

interface SelectPageProps {
	label: string;
	name: string;
	data: { label: string; value: string }[];
	modalTitle: string;
}

// TODO: Maybe I could move the Modal component to a separate one, but I'm not 100% certain about that, as this wouldn't change much and it would require to have some props passed down
export const Select = () => {};
const SelectPage = ({ label, data, name, modalTitle }: SelectPageProps) => {
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

							<Icon
								name={ChevronDownIcon}
								size={16}
								style={{ marginLeft: 'auto', marginRight: 12 }}
							/>
						</ValueWithIconWrap>
					</InputWrapper>

					<Modal
						animationType="fade"
						transparent={false}
						visible={isSelectModalVisible}
						onRequestClose={() => setSelectModalVisibility(false)}
					>
						<View style={{ flex: 1 }}>
							<SelectModalHeading>
								<Pressable onPress={() => setSelectModalVisibility(false)}>
									<Icon name={ArrowLeftIconMini} size={24} />
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
								contentContainerStyle={{
									paddingBottom: 24,
								}}
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
												paddingVertical: 16,
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<View>
												<Text
													style={{ lineHeight: 16 }}
													fontFamily="Montserrat"
												>
													{item.label}
												</Text>
												<Text
													fontSize={12}
													fontFamily="Montserrat"
													weight={300}
												>
													00 feeds
												</Text>
												{/* TODO: handle displaying correct amount of feeds per category, also maybe move this part outside the Select component and pass it as a 'children' prop? */}
											</View>

											<RadioCircle
												isChecked={fieldValue === item.value}
												style={{ marginLeft: 'auto' }}
											/>
										</View>
									</Pressable>
								)}
								ItemSeparatorComponent={() => (
									<View
										style={{
											borderBottomWidth: 1,
											borderColor: '#CED4DA',
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

Select.Page = SelectPage;
Select.Popup = SelectPopup;
