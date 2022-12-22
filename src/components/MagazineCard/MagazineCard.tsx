import { MagazineCardStylesProps, MagazineCardWrap, StyledPressable } from './MagazineCard.styles';
import { Text } from '../Text';

interface MagazineCardProps extends MagazineCardStylesProps {
	title: string;
	onLongPress?: () => void;
}

export const MagazineCard = ({ title, onLongPress }: MagazineCardProps) => {
	return (
		<MagazineCardWrap>
			<StyledPressable onLongPress={() => onLongPress?.()}>
				<Text>{title}</Text>
			</StyledPressable>
		</MagazineCardWrap>
	);
};
