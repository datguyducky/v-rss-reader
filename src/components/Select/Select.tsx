import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FlatList, Modal, View, Pressable } from 'react-native';
import { ArrowLeftIcon as ArrowLeftIconMini } from 'react-native-heroicons/mini';
import { ChevronDownIcon } from 'react-native-heroicons/outline';

import { Divider } from '../Divider';
import { Icon } from '../Icon';
import { InputWrapper } from '../InputWrapper';
import { RadioCircle } from '../Radio/Radio.styles';
import { Text } from '../Text';
import {
	SelectModalHeading,
	SelectModalRow,
	SelectModalTitle,
	ValueWithIconWrap,
} from './Select.styles';
import { SelectPopup } from './SelectPopup/SelectPopup';

interface SelectPageProps {
	label: string;
	name: string;
	data: { label: string; value: string; extraInfo?: string }[];
	modalTitle: string;
}

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

								<SelectModalTitle weight={600}>{modalTitle}</SelectModalTitle>
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
										<SelectModalRow>
											<View>
												<Text
													style={{ lineHeight: 16 }}
													fontFamily="Montserrat"
												>
													{item.label}
												</Text>
												{item?.extraInfo && (
													<Text
														fontSize={12}
														fontFamily="Montserrat"
														weight={300}
													>
														{item.extraInfo}
													</Text>
												)}
											</View>

											<RadioCircle
												isChecked={fieldValue === item.value}
												style={{ marginLeft: 'auto' }}
											/>
										</SelectModalRow>
									</Pressable>
								)}
								ItemSeparatorComponent={() => <Divider />}
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
