import { ReactElement } from 'react';
import { Modal } from 'react-native';

import { Text } from '../Text';
import { HeaderWrap, PopupOverlay, PopupWrapper } from './Popup.styles';

type PopupProps = {
	children: ReactElement;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
};

export const Popup = ({ isOpen, onClose, title, children }: PopupProps) => {
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

					{children}
				</PopupWrapper>
			</PopupOverlay>
		</Modal>
	);
};
