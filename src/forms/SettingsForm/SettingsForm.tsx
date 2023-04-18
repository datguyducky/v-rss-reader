import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMMKVObject } from 'react-native-mmkv';
import { useTheme } from 'styled-components/native';

import { DEFAULT_SETTINGS_VALUES } from '../../common/constants';
import { Button } from '../../components/Button';
import { ConfirmPopup } from '../../components/ConfirmPopup';
import { Divider } from '../../components/Divider';
import { Heading } from '../../components/Heading';
import { Select } from '../../components/Select';
import { Switch } from '../../components/Switch';
import { useFeedsCategoriesContext } from '../../context/FeedsCategoriesContext';
import { useReadLaterContext } from '../../context/ReadLaterContext';
import { useReadingStatsContext } from '../../context/ReadingStatsContext';
import { useAppUsageTime } from '../../hooks/useAppUsageTime';

export type SettingsFormValues = {
	readOnScroll: boolean;
	scrollBehaviour: 'SMOOTH' | 'PAGED';
	autoNextSection: boolean;
	quickActionDrawerGesture: 'LONG_PRESS' | 'DOUBLE_PRESS';
	invertSwipe: boolean;
	disablePullRefresh: boolean;
	sortAlphabetically: boolean;
	hideFeedUnreadCount: boolean;
	hideFeedIcons: boolean;
	disableArticleImages: boolean;
	trackOnHeader: boolean;
	disableReadingStatistics: boolean;
	startWithCategoriesOpen: boolean;
};

export const SettingsForm = () => {
	const theme = useTheme();
	const { resetReadingStats } = useReadingStatsContext();
	const { resetFeedsCategories, resetActiveItem } = useFeedsCategoriesContext();
	const { resetReadLater } = useReadLaterContext();
	const navigation = useNavigation();

	const [appSettings = DEFAULT_SETTINGS_VALUES, setAppSettings] =
		useMMKVObject<SettingsFormValues>('appSettings');
	const { resetAppUsageTime } = useAppUsageTime();

	const [resetAppPopup, setResetAppPopup] = useState(false);
	const [resetReadingStatsPopup, setResetReadingStatsPopup] = useState(false);

	const settingsForm = useForm<SettingsFormValues>({
		defaultValues: appSettings,
	});

	const onSubmit = (values: SettingsFormValues) => setAppSettings(values);

	const handleResetApp = async () => {
		setAppSettings(undefined); // set app settings to default values
		resetAppUsageTime(); // resetting app usage stats

		await resetReadingStats(); // resetting app reading stats
		await resetFeedsCategories(); // fully clearing all saved feeds and categories by a user
		await resetActiveItem(); // just to make sure the active item is also fully cleared
		await resetReadLater(); // removing all "read later" feeds from storage

		setResetAppPopup(false);
		navigation.goBack(); // Going back to "Read" view as resetting form values to default ones doesn't work here
	};

	const handleResetReadingStats = async () => {
		resetAppUsageTime(); // resetting app usage stats
		await resetReadingStats(); // resetting app reading stats

		setResetReadingStatsPopup(false);
	};

	return (
		<>
			<FormProvider {...settingsForm}>
				<Heading tag="h6" color={theme.colors.base[7]} weight={300} mb={0}>
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
					px={0}
				/>
				{/*<Switch*/}
				{/*	name="autoNextSection"*/}
				{/*	label="Advance to next unread section"*/}
				{/*	onValueChange={settingsForm.handleSubmit(onSubmit)}*/}
				{/*/>*/}

				<Divider my={2} />

				<Heading tag="h6" color={theme.colors.base[7]} weight={300} mb={0}>
					Gestures
				</Heading>
				<Select.Popup
					name="quickActionDrawerGesture"
					label="Quick Actions drawer gesture"
					options={[
						{ label: 'Long press', value: 'LONG_PRESS' },
						{ label: 'Double tap', value: 'DOUBLE_PRESS' },
					]}
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={2}
				/>
				<Switch
					name="invertSwipe"
					label="Invert swipe gestures"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={2}
				/>
				<Switch
					name="disablePullRefresh"
					label="Disable pull  to refresh"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
				/>

				<Divider my={2} />

				<Heading tag="h6" color={theme.colors.base[7]} weight={300} mb={0}>
					Feeds list
				</Heading>
				<Switch
					name="sortAlphabetically"
					label="Sort alphabetically"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={2}
				/>
				{/*<Switch*/}
				{/*	name="hideFeedUnreadCount"*/}
				{/*	label="Hide unread count"*/}
				{/*	onValueChange={settingsForm.handleSubmit(onSubmit)}*/}
				{/*	mb={2}*/}
				{/*/>*/}
				<Switch
					name="hideFeedIcons"
					label="Hide feed icons"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={2}
				/>
				<Switch
					name="startWithCategoriesOpen"
					label="Start with categories open"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={2}
				/>

				<Divider my={2} />

				<Heading tag="h6" color={theme.colors.base[7]} weight={300} mb={0}>
					Interface
				</Heading>
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

				<Divider my={2} />

				<Heading tag="h6" color={theme.colors.base[7]} weight={300} mb={0}>
					Data
				</Heading>
				<Switch
					name="disableReadingStatistics"
					label="Stop collecting reading statistics"
					onValueChange={settingsForm.handleSubmit(onSubmit)}
					mb={4}
				/>

				<Button onPress={() => setResetAppPopup(true)} mb={2} size="small">
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
