import type {
	TreeItemWithUiState,
	TreeItemId,
	TreeWithUiState,
} from '../types';

export const deepCopyTreeNode = (
	id: TreeItemId,
	tree: TreeWithUiState,
): TreeItemWithUiState => {
	const item = tree.items[id];
	const { data, children } = item;
	return { ...item, children: [...children], data: { ...data } };
};

export const getDirectParentId = (item: TreeItemWithUiState) => {
	const { parentsIds } = item.data;
	const directParentId = parentsIds[parentsIds.length - 1];
	return directParentId;
};
