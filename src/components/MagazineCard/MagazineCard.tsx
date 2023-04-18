import { View } from 'react-native';
import { PhotoIcon } from 'react-native-heroicons/outline';
import { useTheme } from 'styled-components/native';

import {
	MagazineCardWrap,
	MagazineTextWrap,
	TitleWrap,
	StyledImage,
	DetailsWrap,
	TitleText,
} from './MagazineCard.styles';
import { FeedCardProps } from '../../@types';
import { parseHtmlString } from '../../utils/parseHtmlString';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface MagazineCardProps extends SharedStylesProps, FeedCardProps {}

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
	...otherProps
}: MagazineCardProps) => {
	const theme = useTheme();
	const parsedDescription = description ? parseHtmlString(description) : '';

	return (
		<MagazineCardWrap {...otherProps}>
			<Pressable.Background
				style={{ flexDirection: 'row' }}
				onLongPress={actionPress === 'LONG_PRESS' ? () => handleActionPress?.() : undefined}
				onDoublePress={
					actionPress === 'DOUBLE_PRESS' ? () => handleActionPress?.() : undefined
				}
				onPress={handlePress}
				py={1}
				px={1.5}
			>
				<StyledImage
					density={density}
					as={thumbnailUrl ? undefined : View}
					{...(thumbnailUrl ? { source: { uri: thumbnailUrl } } : {})}
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
