import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMMKVObject } from 'react-native-mmkv';

import { DEFAULT_SETTINGS_VALUES } from '../../common/constants';
import { Button } from '../../components/Button';
import { ConfirmPopup } from '../../components/ConfirmPopup';
import { Divider } from '../../components/Divider';
import { Heading } from '../../components/Heading';
import { Select } from '../../components/Select';
import { Switch } from '../../components/Switch';
import { useReadingStats } from '../../hooks/useReadingStats';

export type SettingsFormValues = {
	readOnScroll: boolean;
	scrollBehaviour: 'SMOOTH' | 'PAGED';
	autoNextSection: boolean;
	quickActionDrawerGesture: 'LONG_PRESS' | 'DOUBLE_TAP';
	invertSwipe: boolean;
	disablePullRefresh: boolean;
	sortAlphabetically: boolean;
	hideFeedUnreadCount: boolean;
	hideFeedIcons: boolean;
	textSize: 'TINY' | 'SMALL' | 'NORMAL' | 'BIG' | 'HUGE';
	disableArticleImages: boolean;
	trackOnHeader: boolean;
	disableReadingStatistics: boolean;
	startWithCategoriesOpen: boolean;
};

export const SettingsForm = () => {
	const [appSettings = DEFAULT_SETTINGS_VALUES, setAppSettings] =
		useMMKVObject<SettingsFormValues>('appSettings');
	const { reset } = useReadingStats();

	const [resetAppPopup, setResetAppPopup] = useState(false);
	const [resetReadingStatsPopup, setResetReadingStatsPopup] = useState(false);

	const settingsForm = useForm<SettingsFormValues>({
		defaultValues: appSettings,
	});

	const onSubmit = (values: SettingsFormValues) => setAppSettings(values);

	/**
	 * This probably should clear everything from the app, so feeds, categories, settings, reading stats and etc.
	 */
	const handleResetApp = () => {
		setAppSettings(undefined);
		// TODO: Also reset this form to default values.

		setResetAppPopup(false);
	};

	const handleResetReadingStats = () => {
		reset();

		setResetReadingStatsPopup(false);
	};

	return (
		<>
			<FormProvider {...settingsForm}>
				<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
					App behaviour
				</Heading>
				{/*<Switch*/}
				{/*	name="readOnScroll"*/}
				{/*	label="Mark as read on scroll"*/}
				{/*	onValueChange={settingsForm.handleSubmit(onSubmit)}*/}
				{/*	mb={16}*/}
				{/*/>*/}
				<Select.Popup
					name="scrollBehaviour"
					label="Scrolling behaviour"
					options={[
						{ label: 'Smooth', value: 'SMOOTH' },
						{ label: 'Paged', value: 'PAGED' },
					]}
					onValueChange={settingsForm.handleSubmit(onSubmit)}
				/>
				{/*<Switch*/}
				{/*	name="autoNextSection"*/}
				{/*	label="Advance to next unread section"*/}
				{/*	onValueChange={settingsForm.handleSubmit(onSubmit)}*/}
				{/*/>*/}

				<Divider my={16} />

				<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
					Gestures
				</Heading>
				<Select.Popup
					name="quickActionDrawerGesture"
					label="Quick Actions drawer gesture"
					options={[
						{ label: 'Long press', value: 'LONG_PRESS' },
						{ label: 'Double tap', value: 'DOUBLE_TAP' },
					]}
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={16}
				/>
				<Switch
					name="invertSwipe"
					label="Invert swipe gestures"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={16}
				/>
				<Switch
					name="disablePullRefresh"
					label="Disable pull  to refresh"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
				/>

				<Divider my={16} />

				<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
					Feeds list
				</Heading>
				<Switch
					name="sortAlphabetically"
					label="Sort alphabetically"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={16}
				/>
				{/*<Switch*/}
				{/*	name="hideFeedUnreadCount"*/}
				{/*	label="Hide unread count"*/}
				{/*	onValueChange={settingsForm.handleSubmit(onSubmit)}*/}
				{/*	mb={16}*/}
				{/*/>*/}
				<Switch
					name="hideFeedIcons"
					label="Hide feed icons"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={16}
				/>
				<Switch
					name="startWithCategoriesOpen"
					label="Start with categories open"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={16}
				/>

				<Divider my={16} />

				<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
					Interface
				</Heading>
				<Select.Popup
					name="textSize"
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
					name="disableArticleImages"
					label="Disable articles images"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
				/>
				{/*<Switch*/}
				{/*	name="trackOnHeader"*/}
				{/*	label="Display unread tracker on header"*/}
				{/*	onValueChange={settingsForm.handleSubmit(onSubmit)}*/}
				{/*/>*/}

				<Divider my={16} />

				<Heading tag="h6" color="#5C5F66" weight={300} mb={0}>
					Data
				</Heading>
				<Switch
					name="disableReadingStatistics"
					label="Stop collecting reading statistics"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={32}
				/>

				<Button onPress={() => setResetAppPopup(true)} mb={16} size="small">
					RESET APP DATA
				</Button>
				<Button onPress={() => setResetReadingStatsPopup(true)} size="small">
					RESET READING STATS
				</Button>
			</FormProvider>

			<ConfirmPopup
				isOpen={resetAppPopup}
				onClose={() => setResetAppPopup(false)}
				title="Are you sure you want to reset the V - RSS Reader app?"
				subTitle="Remember! All data will be lost for ever: your reading stats, settings, feeds and categories."
				handleConfirm={handleResetApp}
				confirmText="Yes, Reset"
			/>

			<ConfirmPopup
				isOpen={resetReadingStatsPopup}
				onClose={() => setResetReadingStatsPopup(false)}
				title="Are you sure you want to reset your reading stats?"
				subTitle="Remember, this action cannot be undone! Your reading statistics will be completely lost for ever."
				handleConfirm={handleResetReadingStats}
				confirmText="Yes, Reset"
			/>
		</>
	);
};
