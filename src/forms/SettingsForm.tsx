import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { Heading } from '../components/Heading';
import { Select } from '../components/Select';
import { Switch } from '../components/Switch';
import { Text } from '../components/Text';

export const SettingsForm = () => {
	const settingsForm = useForm({
		defaultValues: {
			READ_ON_SCROLL: false,
			SCROLL_BEHAVIOUR: 'SMOOTH',
			AUTO_NEXT_SECTION: true,
			QUICK_ACTION_DRAWER_GESTURE: 'LONG_PRESS',
			INVERT_SWIPE: false,
			DISABLE_PULL_REFRESH: false,
			SORT_ALPHABETICALLY: true,
			HIDE_FEED_UNREAD_COUNT: false,
			HIDE_FEED_ICONS: false,
			TEXT_SIZE: 'NORMAL',
			DISABLE_ARTICLE_IMAGES: false,
			TRACKER_ON_HEADER: true,
			DISABLE_READING_STATISTICS: false,
		},
	});

	const onSubmit = values => console.log(values);

	return (
		<FormProvider {...settingsForm}>
			<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
				App behaviour
			</Heading>
			<Switch
				name="READ_ON_SCROLL"
				label="Mark as read on scroll"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
				mb={16}
			/>
			<Select.Popup
				name="SCROLL_BEHAVIOUR"
				label="Scrolling behaviour"
				options={[
					{ label: 'Smooth', value: 'SMOOTH' },
					{ label: 'Paginated', value: 'PAGINATED' },
				]}
				onValueChange={settingsForm.handleSubmit(onSubmit)}
				mb={16}
			/>
			<Switch
				name="AUTO_NEXT_SECTION"
				label="Advance to next unread section"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
			/>

			<Divider my={16} />

			<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
				Gestures
			</Heading>
			<Select.Popup
				name="QUICK_ACTION_DRAWER_GESTURE"
				label="Quick Actions drawer gesture"
				options={[
					{ label: 'Long press', value: 'LONG_PRESS' },
					{ label: 'Double tap', value: 'DOUBLE_TAP' },
				]}
				onValueChange={settingsForm.handleSubmit(onSubmit)}
				mb={16}
			/>
			<Switch
				name="INVERT_SWIPE"
				label="Invert swipe gestures"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
				mb={16}
			/>
			<Switch
				name="DISABLE_PULL_REFRESH"
				label="Disable pull  to refresh"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
			/>

			<Divider my={16} />

			<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
				Feeds list
			</Heading>
			<Switch
				name="SORT_ALPHABETICALLY"
				label="Sort alphabetically"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
				mb={16}
			/>
			<Switch
				name="HIDE_FEED_UNREAD_COUNT"
				label="Hide unread count"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
				mb={16}
			/>
			<Switch
				name="HIDE_FEED_ICONS"
				label="Hide feed icons"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
			/>

			<Divider my={16} />

			<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
				Interface
			</Heading>
			<Select.Popup
				name="TEXT_SIZE"
				label="Text size"
				options={[
					{ label: 'Tiny', value: 'TINY' },
					{ label: 'Small', value: 'SMALL' },
					{ label: 'Normal', value: 'NORMAL' },
					{ label: 'Big', value: 'BIG' },
					{ label: 'Huge', value: 'HUGE' },
				]}
				onValueChange={settingsForm.handleSubmit(onSubmit)}
				mb={16}
			/>
			<Switch
				name="DISABLE_ARTICLE_IMAGES"
				label="Disable articles images"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
				mb={16}
			/>
			<Switch
				name="TRACKER_ON_HEADER"
				label="Display unread tracker on header"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
			/>

			<Divider my={16} />

			<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
				Data
			</Heading>
			<Switch
				name="DISABLE_READING_STATISTICS"
				label="Stop collecting reading statistics"
				onValueChange={settingsForm.handleSubmit(onSubmit)}
				mb={32}
			/>

			<Button onPress={() => console.log('TODO: handle reset app')} mb={16} size="small">
				RESET APP DATA
			</Button>
			<Button onPress={() => console.log('TODO: handle reset reading stats')} size="small">
				RESET READING STATS
			</Button>
		</FormProvider>
	);
};
