import React from 'react';
import PropTypes from 'prop-types';

import { 
	View, 
	UIManager, 
	findNodeHandle, 
	TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ICON_SIZE = 24;


export default class PopupMenu extends React.Component {
	static propTypes = {
		// array of strings, will be list items of Menu
		actions:  PropTypes.arrayOf(PropTypes.string).isRequired,
		onPress: PropTypes.func.isRequired
	}

	constructor (props) {
		super(props)
		this.state = {
		icon: null
		}
	}

	onError () {
		// popup menu error here
		console.log('Popup Error');
	}

	onPress = () => {
		const { actions, onPress } = this.props;

		UIManager.showPopupMenu(
			findNodeHandle(this.refs.menu),
			actions,
			this.onError,
			onPress
		)
	}

	render () {
		return (
			<View style={{padding: 8, borderRadius: 32, overflow: 'hidden'}}>
				<TouchableNativeFeedback 
					onPress={this.onPress}
					background={TouchableNativeFeedback.Ripple('#555', true)}
				>
					<View>
						<Icon
							name='more-vertical'
							size={ICON_SIZE}
							ref="menu" 
						/>
					</View>
				</TouchableNativeFeedback>
			</View>
		)
	}
}