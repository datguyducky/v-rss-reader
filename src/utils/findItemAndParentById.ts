interface SearchResult {
	item?: Record<string, unknown>;
	parent?: Record<string, unknown>;
}

export function findItemAndParentById(
	id: string,
	array: Record<string, unknown>[],
	parent?: Record<string, unknown>,
): SearchResult | undefined {
	for (const item of array) {
		if (item.id === id) {
			return { item, parent };
		} else if (item?.feeds?.length > 0) {
			const nestedItem = findItemAndParentById(id, item.feeds, item);
			if (nestedItem?.item) {
				return nestedItem;
			}
		}
	}
	if (typeof parent === 'undefined') {
		return undefined;
	}
	return { item: undefined, parent };
}
