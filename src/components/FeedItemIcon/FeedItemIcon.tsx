import { FeedItemIconWrap } from './FeedItemIcon.styles';

type FeedItemIconProps = {
	url: string;
};
export const FeedItemIcon = ({ url }: FeedItemIconProps) => {
	return (
		<FeedItemIconWrap
			source={{
				uri: `https://random-ivory-gamefowl.faviconkit.com/${url.replace(
					/^(https?:\/\/)?/,
					'',
				)}/32`,
			}}
		/>
	);
};
