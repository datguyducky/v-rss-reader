export function parseHtmlString(str: string) {
	// Replace HTML entities with their corresponding characters
	str = str.replace(/&#([0-9]+);/g, (match, dec) => {
		if (dec === '160') {
			return '';
		}

		return String.fromCharCode(dec);
	});

	// Remove CSS and JavaScript
	str = str.replace(/<style([\s\S]*?)<\/style>|<script([\s\S]*?)<\/script>/gi, '');

	// Remove HTML tags
	str = str.replace(/(<([^>]+)>)/gi, '');

	// Remove extra whitespace and special characters
	str = str
		.replace(/\s+/g, ' ')
		.replace(/[\n\r]+/g, ' ')
		.replace(/(&nbsp;)/gi, '')
		.trim();

	// Replace special characters
	str = str.replace(/&quot;/g, '"');
	str = str.replace(/&amp;/g, '&');

	// Remove '[link]' and '[comments]' from description
	const linkRegex = /\[link]/g;
	const commentsRegex = /\[comments]/g;
	const emptyCommentsRegex = /Comments/g;
	str = str.replace(linkRegex, '').replace(commentsRegex, '').replace(emptyCommentsRegex, '');

	// Remove leading and trailing whitespace
	str = str.trim();

	return str;
}
