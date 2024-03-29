import React, { ReactElement, useState } from 'react';
import { FlatList, Modal, View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { ArrowLeftIcon as ArrowLeftIconMini } from 'react-native-heroicons/mini';
import { ChevronDownIcon } from 'react-native-heroicons/outline';

import {
	SelectModalHeading,
	SelectModalRow,
	SelectModalTitle,
	StyledGestureHandlerRootView,
	ValueWithIconWrap,
} from './Select.styles';
import { SelectPopup } from './SelectPopup/SelectPopup';
import { Divider } from '../Divider';
import { Icon } from '../Icon';
import { InputWrapper } from '../InputWrapper';
import { Pressable } from '../Pressable';
import { RadioCircle } from '../Radio/Radio.styles';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface SelectPageProps extends SharedStylesProps {
	label: string;
	name: string;
	data: { label: string; value: string; extraInfo?: string }[];
	modalTitle: string;
	ListEmptyComponent?: ReactElement;
}

export const Select = () => {};
const SelectPage = ({
	label,
	data,
	name,
	modalTitle,
	ListEmptyComponent,
	...otherProps
}: SelectPageProps) => {
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
			render={({ field: { onChange, value: fieldValue } }) => (
				<>
					<InputWrapper
						label={label}
						name={name}
						onBlur={toggleDropdown}
						onPress={toggleDropdown}
						forceUnfocus={isSelectModalVisible}
					>
						<ValueWithIconWrap style={{ flexDirection: 'row', alignItems: 'center' }}>
							{fieldValue !== null &&
							fieldValue !== undefined &&
							fieldValue !== '' ? (
								<Text pl={1.5}>
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
						<StyledGestureHandlerRootView {...otherProps}>
							<SelectModalHeading>
								<Pressable.Background
									borderless
									onPress={() => {
										setSelectModalVisibility(false);
									}}
								>
									<Icon name={ArrowLeftIconMini} size={24} />
								</Pressable.Background>

								<SelectModalTitle weight={600}>{modalTitle}</SelectModalTitle>
							</SelectModalHeading>

							<FlatList
								contentContainerStyle={{
									paddingBottom: 24,
								}}
								data={data}
								ListEmptyComponent={ListEmptyComponent}
								renderItem={({ item }) => (
									<Pressable.Background
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
									</Pressable.Background>
								)}
								ItemSeparatorComponent={() => <Divider />}
								keyExtractor={(item, index) => index.toString()}
							/>
						</StyledGestureHandlerRootView>
					</Modal>
				</>
			)}
		/>
	);
};

Select.Page = SelectPage;
Select.Popup = SelectPopup;
