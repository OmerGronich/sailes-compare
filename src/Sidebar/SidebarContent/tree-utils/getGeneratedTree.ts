import type {
	MappedNodes,
	TreeItemId,
	TreeItemWithUiState,
	TreeItem,
	Tree,
} from '../types';

export const getTreeWithUiState = (
	primaryTree: Tree,
	expandedFoldersIds: TreeItemId[],
): MappedNodes => {
	const nodes: MappedNodes = {};
	const { rootId } = primaryTree;
	const rootNode = primaryTree.items[rootId];
	nodes[rootId] = createRootNode(rootNode);
	rootNode.children.forEach((nodeId) =>
		generateTree(primaryTree, nodes, nodeId, expandedFoldersIds, [rootId]),
	);

	return nodes;
};

const generateTree = (
	primaryTree: Tree,
	newTree: MappedNodes,
	id: TreeItemId,
	expandedFoldersIds: TreeItemId[],
	parentsIds: TreeItemId[],
) => {
	const item = deepCopyPrimaryNode(id, primaryTree);
	newTree[id] = createTreeNode(item, parentsIds, expandedFoldersIds);
	parentsIds = [...parentsIds, id];
	item.children.forEach((child) =>
		generateTree(primaryTree, newTree, child, expandedFoldersIds, parentsIds),
	);
};

export const deepCopyPrimaryNode = (id: TreeItemId, tree: Tree): TreeItem => {
	const item = tree.items[id];
	const { data, children } = item;
	return { ...item, children: [...children], data: { ...data } };
};

const createTreeNode = (
	item: TreeItem,
	parentsIds: TreeItemId[],
	expandedFoldersIds: TreeItemId[],
): TreeItemWithUiState => {
	const { data } = item;
	return {
		...item,
		isExpanded: expandedFoldersIds.includes(item.id),
		data: { ...data, parentsIds },
	};
};

const createRootNode = (item: TreeItem): TreeItemWithUiState => {
	return {
		...item,
		isExpanded: true,
		data: { title: '', parentsIds: [] },
	};
};
