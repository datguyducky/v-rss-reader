import { Category, Feed } from '@hooks/useFeedsCategories';

export interface SearchResult {
	item?: Feed | Category;
	parent?: Category;
}

export function findItemAndParentById(
	id: string,
	array: (Feed | Category)[],
	parent?: Category,
): SearchResult | undefined {
	for (const item of array) {
		if (item.id === id) {
			return { item, parent };
		} else if ('feeds' in item && item?.feeds?.length > 0) {
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
