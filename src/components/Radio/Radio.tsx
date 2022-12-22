import { RadioCircle, RadioStylesProps, RadioWrap, StyledPressable } from './Radio.styles';
import { Text } from '../Text';

interface RadioProps extends RadioStylesProps {
	label: string;
	isChecked: boolean;
	onChange: (newValue: boolean) => void;
}

export const Radio = ({ label, isChecked, onChange, mb }: RadioProps) => {
	return (
		<RadioWrap mb={mb || 0}>
			<StyledPressable onPress={() => onChange(!isChecked)}>
				<RadioCircle isChecked={isChecked} />
				<Text>{label}</Text>
			</StyledPressable>
		</RadioWrap>
	);
};
