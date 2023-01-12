import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ForwardedRef, forwardRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Divider } from '../components/Divider';
import { Drawer } from '../components/Drawer';
import { Radio } from '../components/Radio';
import { Text } from '../components/Text';

type FilterFormValues = {
	SORT_BY: 'LATEST' | 'OLDEST';
	FEED_VIEW: 'TEXT_ONLY' | 'MAGAZINE' | 'THUMBNAIL';
	FEED_DENSITY: 'COMPACT' | 'COMFORTABLE';
};

export const Filters = forwardRef((_, ref: ForwardedRef<BottomSheetModal>) => {
	// TODO: Store and retrieve values from a storage via a custom hook.
	const filterForm = useForm<FilterFormValues>({
		defaultValues: {
			SORT_BY: 'LATEST',
			FEED_VIEW: 'MAGAZINE',
			FEED_DENSITY: 'COMFORTABLE',
		},
	});
	const onSubmit = (values: FilterFormValues) => console.log(values);

	return (
		<Drawer ref={ref} snapPoints={[460]}>
			<FormProvider {...filterForm}>
				<Text fontFamily="Montserrat" color="#228BE6" weight={600} mb={16}>
					Sort by
				</Text>
				<Radio.Group name="SORT_BY" onValueChange={filterForm.handleSubmit(onSubmit)}>
					<Radio label="Latest" mb={16} value="LATEST" />
					<Radio label="Oldest" value="OLDEST" />
				</Radio.Group>

				<Divider my={16} />

				<Text fontFamily="Montserrat" color="#228BE6" weight={600} mb={16}>
					View
				</Text>
				<Radio.Group name="FEED_VIEW" onValueChange={filterForm.handleSubmit(onSubmit)}>
					<Radio label="Text-only" mb={16} value="TEXT_ONLY" />
					<Radio label="Magazine" mb={16} value="MAGAZINE" />
					<Radio label="Thumbnail" mb={16} value="THUMBNAIL" />
				</Radio.Group>

				<Text fontFamily="Montserrat" color="#228BE6" weight={600} mb={16}>
					Density
				</Text>
				<Radio.Group name="FEED_DENSITY" onValueChange={filterForm.handleSubmit(onSubmit)}>
					<Radio label="Compact" mb={16} value="COMPACT" />
					<Radio label="Comfortable" value="COMFORTABLE" />
				</Radio.Group>
			</FormProvider>
		</Drawer>
	);
});
