import { View } from 'react-native';

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
						onPress={() => handleCancel?.() || onClose()}
						textWeight={600}
						textColor="#909296"
						style={{ marginRight: 12 }}
					>
						Cancel
					</BasicButton>

					<BasicButton
						onPress={() => handleRemove?.()}
						textColor="#fa5252"
						textWeight={600}
					>
						Yes, Remove
					</BasicButton>
				</View>
			</View>
		</Popup>
	);
};
