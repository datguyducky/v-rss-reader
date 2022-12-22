import { openURL } from 'expo-linking';

import { Text } from '../Text';

import {
	MagazineCardStylesProps,
	MagazineCardWrap,
	MagazineTextWrap,
	TitleWrap,
	StyledImage,
	StyledPressable,
	DetailsWrap,
} from './MagazineCard.styles';
import { FeedCardProps } from '../../types';

interface MagazineCardProps extends FeedCardProps, MagazineCardStylesProps {}

export const MagazineCard = ({
	title,
	onLongPress,
	mb = 0,
	thumbnailUrl,
	url,
}: MagazineCardProps) => {
	return (
		<MagazineCardWrap mb={mb}>
			<StyledPressable onLongPress={() => onLongPress?.()} onPress={() => openURL(url)}>
				<StyledImage
					source={{
						uri: thumbnailUrl,
					}}
				/>

				<MagazineTextWrap>
					<TitleWrap>
						<Text fontSize={14} numberOfLines={2}>
							{title}
						</Text>
					</TitleWrap>

					<DetailsWrap>
						<Text fontSize={10} weight={300} color="#5C5F66">
							Website name / 00 days
						</Text>
					</DetailsWrap>
				</MagazineTextWrap>
			</StyledPressable>
		</MagazineCardWrap>
	);
};
