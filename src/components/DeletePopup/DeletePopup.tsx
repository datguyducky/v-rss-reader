import { View } from 'react-native';

import { Button } from '../Button';
import { Popup } from '../Popup';
import { Text } from '../Text';

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

				<Button
					onPress={() => handleRemove?.()}
					mb={12}
					size="small"
					textSize={12}
					backgroundColor="#fa5252"
				>
					YES, REMOVE
				</Button>

				<Button
					onPress={() => handleCancel?.() || onClose()}
					size="small"
					textSize={12}
					variant="outline"
				>
					CANCEL
				</Button>
			</View>
		</Popup>
	);
};
