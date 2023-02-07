import { View } from 'react-native';

import { Button } from '../Button';
import { Popup } from '../Popup';
import { Text } from '../Text';
import { BasicButton } from '../BasicButton';
import React from 'react';

type DeletePopupProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	subTitle?: string;
	handleRemove?: () => void;
	handleCancel?: () => void;
};

export const DeletePopup = ({
	isOpen,
	onClose,
	title,
	subTitle,
	handleCancel,
	handleRemove,
}: DeletePopupProps) => {
	return (
		<Popup isOpen={isOpen} onClose={onClose} title={title}>
			<View>
				<Text mb={subTitle ? 24 : 0}>{subTitle}</Text>

				<View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
					<BasicButton
						//style={{ marginLeft: 'auto' }}
						onPress={() => handleCancel?.() || onClose()}
						textWeight={600}
						textColor="#909296"
						style={{ marginRight: 12 }}
					>
						Cancel
					</BasicButton>

					<BasicButton
						onPress={() => handleRemove?.()}
						mb={12}
						//size="small"
						textColor="#fa5252"
						textWeight={600}
						//backgroundColor="#fa5252"
					>
						Yes, Remove
					</BasicButton>
				</View>
			</View>
		</Popup>
	);
};
