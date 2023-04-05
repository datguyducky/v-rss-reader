import { ReactElement } from 'react';
import { Modal, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { Text } from '../Text';
import { HeaderWrap, PopupOverlay, PopupWrapper } from './Popup.styles';

type PopupProps = {
	children: ReactElement;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	style?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
};

export const Popup = ({ isOpen, onClose, title, children, style, titleStyle }: PopupProps) => {
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
				<PopupWrapper style={style}>
					{title && (
						<HeaderWrap>
							<Text
								fontFamily="Montserrat"
								fontSize={16}
								weight={500}
								mb={4}
								style={titleStyle}
							>
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
