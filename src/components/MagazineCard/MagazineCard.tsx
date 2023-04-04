import { openURL } from 'expo-linking';
import { View } from 'react-native';
import { PhotoIcon } from 'react-native-heroicons/outline';

import { useReadingStats } from '../../hooks/useReadingStats';
import { FeedCardProps } from '../../types';
import { parseHtmlString } from '../../utils/parseHtmlString';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import {
	MagazineCardWrap,
	MagazineTextWrap,
	TitleWrap,
	StyledImage,
	DetailsWrap,
	TitleText,
} from './MagazineCard.styles';

interface MagazineCardProps extends FeedCardProps {}

export const MagazineCard = ({
	title,
	onLongPress,
	thumbnailUrl,
	url,
	domainName,
	publishedAt,
	density,
	description,
}: MagazineCardProps) => {
	const { handleFeedPressStats } = useReadingStats();

	const parsedDescription = description ? parseHtmlString(description) : '';

	const handlePress = () => {
		handleFeedPressStats();
		openURL(url);
	};

	return (
		<MagazineCardWrap>
			<Pressable.Background
				style={{ flexDirection: 'row' }}
				onLongPress={() => onLongPress?.()}
				onPress={handlePress}
			>
				<StyledImage
					source={{
						uri: thumbnailUrl,
					}}
					density={density}
				>
					{!thumbnailUrl && <Icon name={PhotoIcon} size={27} color="#909296" />}
				</StyledImage>

				<MagazineTextWrap>
					<TitleWrap density={density}>
						<TitleText fontSize={14} numberOfLines={2} weight={500} density={density}>
							{title}
						</TitleText>
					</TitleWrap>

					<DetailsWrap density={density}>
						<Text fontSize={10} weight={300} color="#5C5F66">
							{`${domainName} / ${publishedAt}`}
						</Text>
					</DetailsWrap>

					{density === 'COMFORTABLE' && parsedDescription.length > 0 && (
						<View>
							<Text fontSize={12} numberOfLines={3} color="#5C5F66">
								{parsedDescription}
							</Text>
						</View>
					)}
				</MagazineTextWrap>
			</Pressable.Background>
		</MagazineCardWrap>
	);
};
