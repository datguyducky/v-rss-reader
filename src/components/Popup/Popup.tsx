import { ReactElement } from 'react';
import { Modal, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { HeaderWrap, PopupOverlay, PopupWrapper } from './Popup.styles';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface PopupProps extends SharedStylesProps {
	children: ReactElement;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	style?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
}

export const Popup = ({
	isOpen,
	onClose,
	title,
	children,
	style,
	titleStyle,
	...otherProps
}: PopupProps) => {
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
				<PopupWrapper {...otherProps} style={style}>
					{title && (
						<HeaderWrap>
							<Text
								fontFamily="Montserrat"
								fontSize={16}
								weight={500}
								mb={0.5}
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
