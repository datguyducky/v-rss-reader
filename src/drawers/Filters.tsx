import React, { useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';

import { Drawer } from '../components/Drawer';
import { Text } from '../components/Text';
import { Divider } from '../components/Divider';
import { Radio } from '../components/Radio';
import { View } from 'react-native';

export const Filters = ({ navigation }: StackScreenProps<any>) => {
	const filtersDrawersRef = useRef<BottomSheetModal>(null);

	// TODO: Radio Group component?
	// TODO: Handle how values are stored and changed.
	const [selectedSort, setSelectedSort] = useState(false);

	return (
		<Drawer
			onClose={() => navigation.navigate('TabScreen', { screen: 'Read' })}
			ref={filtersDrawersRef}
			snapPoints={[460]}
		>
			<Text fontFamily="Montserrat" color="#228BE6" weight={600} mb={16}>
				Sort by
			</Text>

			<Radio
				isChecked={selectedSort}
				onChange={newValue => setSelectedSort(newValue)}
				label="Latest"
				mb={16}
			/>

			<Radio
				isChecked={selectedSort}
				onChange={newValue => setSelectedSort(newValue)}
				label="Oldest"
			/>

			<Divider my={16} />

			<Text fontFamily="Montserrat" color="#228BE6" weight={600} mb={16}>
				View
			</Text>

			<Radio
				isChecked={selectedSort}
				onChange={newValue => setSelectedSort(newValue)}
				label="Compact"
				mb={16}
			/>

			<Radio
				isChecked={selectedSort}
				onChange={newValue => setSelectedSort(newValue)}
				label="Comfortable"
				mb={16}
			/>

			<Text fontFamily="Montserrat" color="#228BE6" weight={600} mb={16}>
				Density
			</Text>

			<Radio
				isChecked={selectedSort}
				onChange={newValue => setSelectedSort(newValue)}
				label="Text-only"
				mb={16}
			/>

			<Radio
				isChecked={selectedSort}
				onChange={newValue => setSelectedSort(newValue)}
				label="Magazine"
				mb={16}
			/>

			<Radio
				isChecked={selectedSort}
				onChange={newValue => setSelectedSort(newValue)}
				label="Thumbnail"
			/>
		</Drawer>
	);
};
