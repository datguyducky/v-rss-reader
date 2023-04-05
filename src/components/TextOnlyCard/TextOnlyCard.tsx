import { View } from 'react-native';

import { FeedCardProps } from '../../types';
import { parseHtmlString } from '../../utils/parseHtmlString';
import { Text } from '../Text';
import {
	TextOnlyCardWrap,
	TextOnlyTextWrap,
	TitleWrap,
	StyledPressable,
} from './TextOnlyCard.styles';

interface TextOnlyCardProps extends FeedCardProps {}

export const TextOnlyCard = ({
	title,
	handleActionPress,
	domainName,
	publishedAt,
	density,
	description,
	actionPress,
	handlePress,
}: TextOnlyCardProps) => {
	const parsedDescription = description ? parseHtmlString(description) : '';

	return (
		<TextOnlyCardWrap>
			<StyledPressable
				onLongPress={actionPress === 'LONG_PRESS' ? () => handleActionPress?.() : undefined}
				onPress={handlePress}
				onDoublePress={
					actionPress === 'DOUBLE_PRESS' ? () => handleActionPress?.() : undefined
				}
				py={8}
				px={12}
			>
				<TextOnlyTextWrap>
					<TitleWrap>
						<Text fontSize={14} numberOfLines={3} weight={500}>
							{title}
						</Text>
					</TitleWrap>

					{density === 'COMFORTABLE' && parsedDescription.length > 0 && (
						<View>
							<Text fontSize={12} numberOfLines={4} mb={8} color="#5C5F66">
								{parsedDescription}
							</Text>
						</View>
					)}

					<Text fontSize={10} weight={300} color="#5C5F66">
						{`${domainName} / ${publishedAt}`}
					</Text>
				</TextOnlyTextWrap>
			</StyledPressable>
		</TextOnlyCardWrap>
	);
};
