import { LinearGradient } from 'expo-linear-gradient';
import { openURL } from 'expo-linking';
import { View } from 'react-native';
import { PhotoIcon } from 'react-native-heroicons/outline';

import { useReadingStats } from '../../hooks/useReadingStats';
import { FeedCardProps } from '../../types';
import { parseHtmlString } from '../../utils/parseHtmlString';
import { Icon } from '../Icon';
import { Text } from '../Text';
import {
	ThumbnailCardWrap,
	ThumbnailTextWrap,
	TitleWrap,
	StyledImageBackground,
} from './ThumbnailCard.styles';
import { Pressable } from '../Pressable';

interface ThumbnailCardProps extends FeedCardProps {}

export const ThumbnailCard = ({
	title,
	onLongPress,
	thumbnailUrl,
	url,
	domainName,
	publishedAt,
	density,
	description,
}: ThumbnailCardProps) => {
	const { handleFeedPressStats } = useReadingStats();

	const parsedDescription = description ? parseHtmlString(description) : '';

	const handlePress = () => {
		handleFeedPressStats();
		openURL(url);
	};

	return (
		<ThumbnailCardWrap>
			<Pressable.Background onLongPress={() => onLongPress?.()} onPress={handlePress}>
				<StyledImageBackground
					density={density}
					source={{
						uri: thumbnailUrl,
					}}
				>
					<LinearGradient
						colors={['#00000000', '#000000']}
						start={{ x: 0.5, y: density === 'COMFORTABLE' ? 0.4 : 0.45 }}
						style={{
							height: '100%',
							width: '100%',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{!thumbnailUrl && <Icon name={PhotoIcon} size={64} color="#909296" />}
					</LinearGradient>
				</StyledImageBackground>

				<ThumbnailTextWrap>
					<TitleWrap>
						<Text fontSize={14} numberOfLines={3} color="#fff" weight={500}>
							{title}
						</Text>
					</TitleWrap>

					{density === 'COMFORTABLE' && parsedDescription.length > 0 && (
						<View>
							<Text fontSize={12} numberOfLines={3} weight={300} color="#fff">
								{parsedDescription}
							</Text>
						</View>
					)}

					<Text fontSize={10} weight={300} color="#fff">
						{`${domainName} / ${publishedAt}`}
					</Text>
				</ThumbnailTextWrap>
			</Pressable.Background>
		</ThumbnailCardWrap>
	);
};
