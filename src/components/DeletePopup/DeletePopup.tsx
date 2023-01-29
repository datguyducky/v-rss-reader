import { Modal, View } from 'react-native';

import { Button } from '../Button';
import { Text } from '../Text';
import { HeaderWrap, PopupOverlay, PopupWrapper } from './DeletePopup.styles';

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
		<Modal
			animationType="fade"
			transparent
			visible={isOpen}
			onDismiss={onClose}
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<PopupOverlay onPress={onClose}>
				<PopupWrapper>
					{title && (
						<HeaderWrap>
							<Text fontFamily="Montserrat" fontSize={16} weight={500} mb={4}>
								{title}
							</Text>
						</HeaderWrap>
					)}

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
				</PopupWrapper>
			</PopupOverlay>
		</Modal>
	);
};
