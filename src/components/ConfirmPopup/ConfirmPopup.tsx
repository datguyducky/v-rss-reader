import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';

import { BasicButton } from '../BasicButton';
import { Popup } from '../Popup';
import { Pressable } from '../Pressable';
import { Text } from '../Text';

type ConfirmPopupProps = {
	isOpen: boolean;
	onClose: () => void;
	confirmText: string;
	title?: string;
	subTitle?: string;
	cancelText?: string;
	handleConfirm?: () => void;
	handleCancel?: () => void;
};

export const ConfirmPopup = ({
	isOpen,
	onClose,
	title,
	subTitle,
	cancelText = 'Cancel',
	handleCancel,
	confirmText = '',
	handleConfirm,
}: ConfirmPopupProps) => {
	const theme = useTheme();

	return (
		<Popup isOpen={isOpen} onClose={onClose} title={title}>
			<View>
				<Text mb={subTitle ? 24 : 0}>{subTitle}</Text>

				<GestureHandlerRootView style={{ flexDirection: 'row', marginLeft: 'auto' }}>
					<BasicButton
						onPress={() => handleCancel?.() || onClose()}
						textWeight={600}
						textColor={theme.colors.base[6]}
						style={{ marginRight: 12 }}
						pressableComponent={<Pressable.Opacity />}
					>
						{cancelText}
					</BasicButton>

					<BasicButton
						onPress={() => handleConfirm?.()}
						textColor={theme.colors.error}
						textWeight={600}
						pressableComponent={<Pressable.Opacity />}
					>
						{confirmText}
					</BasicButton>
				</GestureHandlerRootView>
			</View>
		</Popup>
	);
};
