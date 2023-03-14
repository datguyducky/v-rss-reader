import { LinearGradient } from 'expo-linear-gradient';
import { openURL } from 'expo-linking';
import { Pressable } from 'react-native';
import { PhotoIcon } from 'react-native-heroicons/outline';

import { FeedCardProps } from '../../types';
import { Icon } from '../Icon';
import { Text } from '../Text';
import {
	ThumbnailCardWrap,
	ThumbnailTextWrap,
	TitleWrap,
	StyledImageBackground,
} from './ThumbnailCard.styles';

interface ThumbnailCardProps extends FeedCardProps {}

export const ThumbnailCard = ({
	title,
	onLongPress,
	thumbnailUrl,
	url,
	domainName,
	publishedAt,
}: ThumbnailCardProps) => {
	return (
		<ThumbnailCardWrap>
			<Pressable onLongPress={() => onLongPress?.()} onPress={() => openURL(url)}>
				<StyledImageBackground
					source={{
						uri: thumbnailUrl,
					}}
				>
					<LinearGradient
						colors={['#00000000', '#000000']}
						start={{ x: 0.5, y: 0.45 }}
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

					<Text fontSize={10} weight={300} color="#fff">
						{`${domainName} / ${publishedAt}`}
					</Text>
				</ThumbnailTextWrap>
			</Pressable>
		</ThumbnailCardWrap>
	);
};
