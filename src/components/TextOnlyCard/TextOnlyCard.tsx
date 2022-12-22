import { openURL } from 'expo-linking';

import { Text } from '../Text';

import {
	TextOnlyCardStylesProps,
	TextOnlyCardWrap,
	TextOnlyTextWrap,
	TitleWrap,
	StyledPressable,
} from './TextOnlyCard.styles';
import { FeedCardProps } from '../../types';

interface TextOnlyCardProps extends FeedCardProps, TextOnlyCardStylesProps {}

export const TextOnlyCard = ({ title, onLongPress, mb = 0, url }: TextOnlyCardProps) => {
	return (
		<TextOnlyCardWrap mb={mb}>
			<StyledPressable onLongPress={() => onLongPress?.()} onPress={() => openURL(url)}>
				<TextOnlyTextWrap>
					<TitleWrap>
						<Text fontSize={14} numberOfLines={3}>
							{title}
						</Text>
					</TitleWrap>

					<Text fontSize={10} weight={300} color="#5C5F66">
						Website name / 00 days
					</Text>
				</TextOnlyTextWrap>
			</StyledPressable>
		</TextOnlyCardWrap>
	);
};
