export function formatMinutes(minutes: number) {
	if (minutes < 60) {
		return minutes + ' minute' + (minutes > 1 ? 's' : '');
	} else if (minutes < 1440) {
		const hours = Math.floor(minutes / 60);
		return hours + ' hour' + (hours > 1 ? 's' : '');
	} else {
		const days = Math.floor(minutes / 1440);
		return days + ' day' + (days > 1 ? 's' : '');
	}
}
