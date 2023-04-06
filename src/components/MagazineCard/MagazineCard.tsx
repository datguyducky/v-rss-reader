import { View } from 'react-native';
import { PhotoIcon } from 'react-native-heroicons/outline';
import { useTheme } from 'styled-components/native';

import { FeedCardProps } from '../../@types';
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
	handleActionPress,
	handlePress,
	thumbnailUrl,
	domainName,
	publishedAt,
	density,
	description,
	actionPress,
}: MagazineCardProps) => {
	const theme = useTheme();
	const parsedDescription = description ? parseHtmlString(description) : '';

	return (
		<MagazineCardWrap>
			<Pressable.Background
				style={{ flexDirection: 'row' }}
				onLongPress={actionPress === 'LONG_PRESS' ? () => handleActionPress?.() : undefined}
				onDoublePress={
					actionPress === 'DOUBLE_PRESS' ? () => handleActionPress?.() : undefined
				}
				onPress={handlePress}
				py={8}
				px={12}
			>
				<StyledImage
					source={{
						uri: thumbnailUrl,
					}}
					density={density}
				>
					{!thumbnailUrl && (
						<Icon name={PhotoIcon} size={27} color={theme.colors.base[6]} />
					)}
				</StyledImage>

				<MagazineTextWrap>
					<TitleWrap density={density}>
						<TitleText fontSize={14} numberOfLines={2} weight={500} density={density}>
							{title}
						</TitleText>
					</TitleWrap>

					<DetailsWrap density={density}>
						<Text fontSize={10} weight={300} color={theme.colors.base[7]}>
							{`${domainName} / ${publishedAt}`}
						</Text>
					</DetailsWrap>

					{density === 'COMFORTABLE' && parsedDescription.length > 0 && (
						<View>
							<Text fontSize={12} numberOfLines={3} color={theme.colors.base[7]}>
								{parsedDescription}
							</Text>
						</View>
					)}
				</MagazineTextWrap>
			</Pressable.Background>
		</MagazineCardWrap>
	);
};
