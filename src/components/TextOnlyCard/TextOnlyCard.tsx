import { openURL } from 'expo-linking';

import { FeedCardProps } from '../../types';

import { Text } from '../Text';

import {
	TextOnlyCardWrap,
	TextOnlyTextWrap,
	TitleWrap,
	StyledPressable,
} from './TextOnlyCard.styles';

interface TextOnlyCardProps extends FeedCardProps {}

export const TextOnlyCard = ({ title, onLongPress, url }: TextOnlyCardProps) => {
	return (
		<TextOnlyCardWrap>
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
