import { openURL } from 'expo-linking';
import { PhotoIcon } from 'react-native-heroicons/outline';

import { FeedCardProps } from '../../types';
import { Icon } from '../Icon';
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

export const MagazineCard = ({
	title,
	onLongPress,
	thumbnailUrl,
	url,
	domainName,
	publishedAt,
}: MagazineCardProps) => {
	return (
		<MagazineCardWrap>
			<StyledPressable onLongPress={() => onLongPress?.()} onPress={() => openURL(url)}>
				<StyledImage
					source={{
						uri: thumbnailUrl,
					}}
				>
					{!thumbnailUrl && <Icon name={PhotoIcon} size={27} color="#909296" />}
				</StyledImage>

				<MagazineTextWrap>
					<TitleWrap>
						<Text fontSize={14} numberOfLines={2}>
							{title}
						</Text>
					</TitleWrap>

					<DetailsWrap>
						<Text fontSize={10} weight={300} color="#5C5F66">
							{`${domainName} / ${publishedAt}`}
						</Text>
					</DetailsWrap>
				</MagazineTextWrap>
			</StyledPressable>
		</MagazineCardWrap>
	);
};
