import { FeedItemIconWrap } from './FeedItemIcon.styles';
import { SharedStylesProps } from '../Shared.styles';

interface FeedItemIconProps extends SharedStylesProps {
	url: string;
}
export const FeedItemIcon = ({ url, ...otherProps }: FeedItemIconProps) => {
	return (
		<FeedItemIconWrap
			{...otherProps}
			source={{
				uri: `https://random-ivory-gamefowl.faviconkit.com/${url.replace(
					/^(https?:\/\/)?/,
					'',
				)}/32`,
			}}
		/>
	);
};
