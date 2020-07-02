export const scrollHandler = (event, props, editActive) => {
	const SCROLL_Y = event.nativeEvent.contentOffset.y;
	editActive = editActive || false;
	props.navigation.setOptions({
		// hide elevation (shadow) when we're at the top of this screen
		// and show it, when we're not
		headerStyle: {
			elevation: SCROLL_Y <= 8 ? 0 : 4,
			// fix to set header backgroundColor to proper one, when edit mode is active
			// IMPORTANT, without this header background color is set to '#fff' when scrolling with edit mode enabled
			backgroundColor: editActive ? '#0080B0' : '#fff' 
		}	
	})
}