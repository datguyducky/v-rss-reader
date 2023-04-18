import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

import {
	TextOnlyCardWrap,
	TextOnlyTextWrap,
	TitleWrap,
	StyledPressable,
} from './TextOnlyCard.styles';
import { FeedCardProps } from '../../@types';
import { parseHtmlString } from '../../utils/parseHtmlString';
import { SharedStylesProps } from '../Shared.styles';
import { Text } from '../Text';

interface TextOnlyCardProps extends SharedStylesProps, FeedCardProps {}

export const TextOnlyCard = ({
	title,
	handleActionPress,
	domainName,
	publishedAt,
	density,
	description,
	actionPress,
	handlePress,
	...otherProps
}: TextOnlyCardProps) => {
	const theme = useTheme();
	const parsedDescription = description ? parseHtmlString(description) : '';

	return (
		<TextOnlyCardWrap {...otherProps}>
			<StyledPressable
				onLongPress={actionPress === 'LONG_PRESS' ? () => handleActionPress?.() : undefined}
				onPress={handlePress}
				onDoublePress={
					actionPress === 'DOUBLE_PRESS' ? () => handleActionPress?.() : undefined
				}
				py={1}
				px={1.5}
			>
				<TextOnlyTextWrap>
					<TitleWrap>
						<Text fontSize={14} numberOfLines={3} weight={500}>
							{title}
						</Text>
					</TitleWrap>

					{density === 'COMFORTABLE' && parsedDescription.length > 0 && (
						<View>
							<Text
								fontSize={12}
								numberOfLines={4}
								mb={1}
								color={theme.colors.base[7]}
							>
								{parsedDescription}
							</Text>
						</View>
					)}

					<Text fontSize={10} weight={300} color={theme.colors.base[7]}>
						{`${domainName} / ${publishedAt}`}
					</Text>
				</TextOnlyTextWrap>
			</StyledPressable>
		</TextOnlyCardWrap>
	);
};
