import { openURL } from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';

import { Text } from '../Text';

import {
	ThumbnailCardStylesProps,
	ThumbnailCardWrap,
	ThumbnailTextWrap,
	TitleWrap,
	StyledImageBackground,
} from './ThumbnailCard.styles';

import { FeedCardProps } from '../../types';

interface ThumbnailCardProps extends FeedCardProps, ThumbnailCardStylesProps {}

export const ThumbnailCard = ({
	title,
	onLongPress,
	mb = 0,
	thumbnailUrl,
	url,
}: ThumbnailCardProps) => {
	return (
		<ThumbnailCardWrap mb={mb}>
			<Pressable onLongPress={() => onLongPress?.()} onPress={() => openURL(url)}>
				<StyledImageBackground
					source={{
						uri: thumbnailUrl,
					}}
				>
					<LinearGradient
						colors={['#00000000', '#000000']}
						start={{ x: 0.5, y: 0.45 }}
						style={{ height: '100%', width: '100%' }}
					></LinearGradient>
				</StyledImageBackground>

				<ThumbnailTextWrap>
					<TitleWrap>
						<Text fontSize={14} numberOfLines={3} color="#fff" weight={500}>
							{title}
						</Text>
					</TitleWrap>

					<Text fontSize={10} weight={300} color="#fff">
						Website name / 00 days
					</Text>
				</ThumbnailTextWrap>
			</Pressable>
		</ThumbnailCardWrap>
	);
};
