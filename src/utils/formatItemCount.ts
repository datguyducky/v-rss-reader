export function formatItemCount(itemCount: number) {
	const itemNumber = itemCount < 10 ? '0' + itemCount : itemCount;
	const itemLabel = itemCount === 1 ? 'item' : 'items';
	return `${itemNumber} ${itemLabel}`;
}
