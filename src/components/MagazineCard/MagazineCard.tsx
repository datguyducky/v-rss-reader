import { openURL } from 'expo-linking';

import { FeedCardProps } from '../../types';

import { Text } from '../Text';

import {
	MagazineCardWrap,
	MagazineTextWrap,
	TitleWrap,
	StyledImage,
	StyledPressable,
	DetailsWrap,
} from './MagazineCard.styles';

interface MagazineCardProps extends FeedCardProps {}

export const MagazineCard = ({ title, onLongPress, thumbnailUrl, url }: MagazineCardProps) => {
	return (
		<MagazineCardWrap>
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
