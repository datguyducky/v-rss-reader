export const colors = {
	overlay: 'rgba(0, 0, 0, 0.5)',
	primary: '#228be6',
	error: '#fa5252',
	success: '#40c057',
	white: '#ffffff',
	black: '#101113',
};

/**
 * Array of "base" colors which are different between light and dark themes
 * [0] - main background
 * [1] - used for inputs and back buttons
 * [2] - disabled
 * [3] - border color and dividers
 * [4] - images on feed cards
 * [5] - labels on inputs
 * [6] - missing feed image, cancel button on Popup, label/value of SelectPopup component
 * [7] - feed card description and domain/date info, text headers color on app Settings view
 * [8] - !! nothing right now !!
 * [9] - text color
 */
export const lightTheme = {
	...colors,
	base: [
		'#ffffff',
		'#f1f3f5',
		'#e9ecef',
		'#ced4da',
		'#d9d9d9', // this one
		'#adb5bd',
		'#909296',
		'#5c5f66',
		'#ff0d86',
		'#141517',
	],
	statusBar: '#808080',
	text: '#101113',
	pressableBackground: '#0000001f',
	navigationShadow: '#00000015',
};

export const darkTheme = {
	...colors,
	base: [
		'#141517',
		'#25262b',
		'#424547',
		'#5c5f66',
		'#4c4f51',
		'#adb5bd',
		'#909296',
		'#dee2e6',
		'#ff0d86',
		'#ffffff',
	],
	statusBar: '#0a0a0b',
	text: '#ffffff',
	pressableBackground: '#ffffff1f',
	navigationShadow: 'rgba(0, 0, 0, 0.45)',
};
