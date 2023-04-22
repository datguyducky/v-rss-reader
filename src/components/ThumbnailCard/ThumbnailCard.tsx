import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PhotoIcon } from 'react-native-heroicons/outline';
import { useTheme } from 'styled-components/native';

import { parseHtmlString } from '@utils/parseHtmlString';

import {
	StyledImageBackground,
	ThumbnailCardWrap,
	ThumbnailTextWrap,
	TitleWrap,
} from './ThumbnailCard.styles';
import { FeedCardProps } from '../../@types';
import { Icon } from '../Icon';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface ThumbnailCardProps
	extends SharedStylesProps,
		Omit<FeedCardProps, 'handlePress' | 'actionPress'> {}

export const ThumbnailCard = ({
	title,
	thumbnailUrl,
	domainName,
	publishedAt,
	density,
	description,
	...otherProps
}: ThumbnailCardProps) => {
	const theme = useTheme();
	const parsedDescription = description ? parseHtmlString(description) : '';

	return (
		<View>
			<ThumbnailCardWrap {...otherProps}>
				<StyledImageBackground
					density={density}
					as={thumbnailUrl ? undefined : View}
					{...(thumbnailUrl ? { source: { uri: thumbnailUrl } } : {})}
				>
					<LinearGradient
						colors={['#00000000', '#000000']} // TODO: Figure out if this needs to be inside the theme colors object.
						start={{ x: 0.5, y: density === 'COMFORTABLE' ? 0.4 : 0.45 }}
						style={{
							height: '100%',
							width: '100%',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{!thumbnailUrl && (
							<Icon name={PhotoIcon} size={64} color={theme.colors.base[6]} />
						)}
					</LinearGradient>
				</StyledImageBackground>

				<ThumbnailTextWrap>
					<TitleWrap>
						<Text
							fontSize={14}
							numberOfLines={3}
							color={theme.colors.white}
							weight={500}
						>
							{title}
						</Text>
					</TitleWrap>

					{density === 'COMFORTABLE' && parsedDescription.length > 0 && (
						<View>
							<Text
								fontSize={12}
								numberOfLines={3}
								weight={300}
								color={theme.colors.white}
							>
								{parsedDescription}
							</Text>
						</View>
					)}

					<Text fontSize={10} weight={300} color={theme.colors.white}>
						{`${domainName} / ${publishedAt}`}
					</Text>
				</ThumbnailTextWrap>
			</ThumbnailCardWrap>
		</View>
	);
};
