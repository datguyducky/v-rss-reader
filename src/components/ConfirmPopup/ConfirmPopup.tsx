import { useTheme } from 'styled-components/native';

import { ConfirmPopupWrapper, StyledGestureHandlerRootView } from './ConfirmPopup.styles';
import { BasicButton } from '../BasicButton';
import { Popup } from '../Popup';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface ConfirmPopupProps extends SharedStylesProps {
	isOpen: boolean;
	onClose: () => void;
	confirmText: string;
	title?: string;
	subTitle?: string;
	cancelText?: string;
	handleConfirm?: () => void;
	handleCancel?: () => void;
}

export const ConfirmPopup = ({
	isOpen,
	onClose,
	title,
	subTitle,
	cancelText = 'Cancel',
	handleCancel,
	confirmText = '',
	handleConfirm,
	...otherProps
}: ConfirmPopupProps) => {
	const theme = useTheme();

	return (
		<Popup isOpen={isOpen} onClose={onClose} title={title}>
			<ConfirmPopupWrapper {...otherProps}>
				<Text mb={subTitle ? 3 : 0}>{subTitle}</Text>

				<StyledGestureHandlerRootView>
					<BasicButton
						onPress={() => handleCancel?.() || onClose()}
						textWeight={600}
						textColor={theme.colors.base[6]}
						mr={1.5}
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
				</StyledGestureHandlerRootView>
			</ConfirmPopupWrapper>
		</Popup>
	);
};
