export const font = {
	retrieve: (fontFamily: string, weight?: number) => {
		switch (weight) {
			case 300:
				return `${fontFamily}-Light`;

			case 400:
				return `${fontFamily}-Regular`;

			case 500:
				return `${fontFamily}-Medium`;

			case 600:
				return `${fontFamily}-SemiBold`;

			case 700:
				return `${fontFamily}-Bold`;

			default:
				return `${fontFamily}-Regular`;
		}
	},
};
