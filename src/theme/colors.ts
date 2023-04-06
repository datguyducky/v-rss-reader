export const colors = {
	overlay: 'rgba(0, 0, 0, 0.5)',
	primary: '#228be6',
	error: '#fa5252',
};

/**
 * Array of "base" colors which are different between light and dark themes
 * [0] - main background
 * [1] - used for inputs and back buttons
 * [2] - disabled
 * [3] - border color and dividers
 * [4] - images on feed cards
 * [5] - labels on inputs
 * [6] - missing feed image, cancel button on Popup,label/value of SelectPopup component
 * [7] - feed card description and domain/date info, text headers color on app Settings view
 * [8] - !! nothing right now !!
 * [9] - text color
 */
export const lightTheme = [
	'#ffffff',
	'#f1f3f5',
	'#e9ecef',
	'#ced4da',
	'#d9d9d9',
	'#adb5bd',
	'#909296',
	'#5c5f66',
	'#ff0d86',
	'#101113',
];

// TODO: Add working dark mode/theme
export const darkTheme = [
	'#101113',
	'#101113',
	'#101113',
	'#101113',
	'#101113',
	'#101113',
	'#101113',
	'#101113',
	'#ff0d86',
	'#101113',
];
