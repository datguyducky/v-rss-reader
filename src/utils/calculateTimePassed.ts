import dayjs from 'dayjs';

export function calculateTimePassed(dateString: string): string {
	const date = dayjs(dateString);
	const now = dayjs();

	const minutes = now.diff(date, 'minute');
	const hours = now.diff(date, 'hour');
	const days = now.diff(date, 'day');
	const months = now.diff(date, 'month');
	const years = now.diff(date, 'year');

	if (minutes < 60) {
		return formatTime(minutes, 'minute');
	} else if (hours < 24) {
		return formatTime(hours, 'hour');
	} else if (days < 31) {
		return formatTime(days, 'day');
	} else if (months < 12) {
		return formatTime(months, 'month');
	} else {
		return formatTime(years, 'year');
	}
}

function formatTime(time: number, unit: string): string {
	if (time === 1) {
		return `${time} ${unit}`;
	} else {
		return `${time} ${unit}s`;
	}
}
