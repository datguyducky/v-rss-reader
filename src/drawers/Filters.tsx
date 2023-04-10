import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMMKVObject } from 'react-native-mmkv';
import { useTheme } from 'styled-components/native';

import { Radio, SectionDivider, SectionTitle } from './Filters.styles';
import { DEFAULT_FILTERS_VALUES } from '../common/constants';
import { Drawer } from '../components/Drawer';

export type FilterFormValues = {
	SORT_BY: 'LATEST' | 'OLDEST';
	FEED_VIEW: 'TEXT_ONLY' | 'MAGAZINE' | 'THUMBNAIL';
	FEED_DENSITY: 'COMPACT' | 'COMFORTABLE';
};

export const Filters = forwardRef((_, ref: ForwardedRef<BottomSheetModal>) => {
	const theme = useTheme();

	const [feedFilters = DEFAULT_FILTERS_VALUES, setFeedFilters] =
		useMMKVObject<FilterFormValues>('feedFilters');

	const filterForm = useForm<FilterFormValues>({
		defaultValues: feedFilters,
	});

	const onSubmit = (values: FilterFormValues) => setFeedFilters(values);

	return (
		<Drawer ref={ref} snapPoints={[460]} pt={3}>
			<FormProvider {...filterForm}>
				<SectionTitle
					fontFamily="Montserrat"
					color={theme.colors.primary}
					weight={600}
					mb={1}
				>
					Sort by
				</SectionTitle>
				<Radio.Group name="SORT_BY" onValueChange={filterForm.handleSubmit(onSubmit)}>
					<Radio label="Latest" value="LATEST" />
					<Radio label="Oldest" value="OLDEST" />
				</Radio.Group>

				<SectionDivider my={1} />

				<SectionTitle
					fontFamily="Montserrat"
					color={theme.colors.primary}
					weight={600}
					mb={1}
				>
					View
				</SectionTitle>
				<Radio.Group name="FEED_VIEW" onValueChange={filterForm.handleSubmit(onSubmit)}>
					<Radio label="Text-only" value="TEXT_ONLY" />
					<Radio label="Magazine" value="MAGAZINE" />
					<Radio label="Thumbnail" value="THUMBNAIL" />
				</Radio.Group>

				<SectionTitle
					fontFamily="Montserrat"
					color={theme.colors.primary}
					weight={600}
					my={1}
				>
					Density
				</SectionTitle>
				<Radio.Group name="FEED_DENSITY" onValueChange={filterForm.handleSubmit(onSubmit)}>
					<Radio label="Compact" value="COMPACT" />
					<Radio label="Comfortable" value="COMFORTABLE" />
				</Radio.Group>
			</FormProvider>
		</Drawer>
	);
});
