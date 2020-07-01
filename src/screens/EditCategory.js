import React, { useState, useEffect } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	TextInput,
	TouchableNativeFeedback,
	TouchableOpacity,
	ScrollView,
	SectionList
} from 'react-native';
import FakeInput from '../components/FakeInput';


const EditCategory = (props) => {
	const { navigate } = props.navigation;
	const [toEdit, set_toEdit] = useState([]);
	const [loaded, set_loaded] = useState(false);

	useEffect(() => {
		// list of feeds that user selected to edit 
		// [CAT_NAME / FEED_NAME]
		const editList = props.route.params.editList;
		for(let i=0; i<editList.length; i++) {
			const STRING_SPLIT = editList[i].split(' / ');
			const INDEX = toEdit.findIndex(o => o.catName === STRING_SPLIT[0]);

			// check if category already exists in toEdit state
			// INDEX = index of category or -1 if not found
			if(INDEX >= 0) {
				// add another feed to category if exists already
				toEdit[INDEX].data.push(STRING_SPLIT[1]);
			} else {
				// if not, then send initial object to toEdit state
				const firstSave = {
					catName: STRING_SPLIT[0], // category name
					data: [STRING_SPLIT[1]] // category feed name
				}
				toEdit.push(firstSave);
			}
		}

		set_loaded(true);
	})


	const CategoryHeader = (catName) => {
		return (
			<Text style={styles.CatHeader}>
				{'Category: ' + catName}
			</Text>
		)
	}


	const toEditFeed = (name) => {
		//console.log(name);
		//navigate()
	}

	
	return (
		<View style={{paddingTop: 6}}>
			{
				loaded ?
					<SectionList
						sections={toEdit}
						keyExtractor={(item, i) => i.toString()}
						renderItem = {(item) => {
								return (
									<FakeInput
										placeholderText={'Feed: ' + item.item}
										iconName='edit-3'
										onPress={() => toEditFeed(item.item)}
										width='76%'
									/>
								)	
						}}
						renderSectionHeader={({section: {catName}}) => CategoryHeader(catName)}
					/>
				: null

			}
		</View>
	);
	
}; export default EditCategory;


const styles = StyleSheet.create({
	CatHeader: {
		fontFamily: 'Muli-SemiBold',
		color: '#2F3037',
		fontSize: 21,
		paddingHorizontal: 12,
		paddingVertical: 4,
		marginBottom: 12
	}
});