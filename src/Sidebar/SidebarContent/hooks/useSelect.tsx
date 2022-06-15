import React, { useEffect } from 'react';

import {
	TreeWithUiState,
	TreeItemId,
	TreeItemWithUiState,
	SelectStatus,
	MappedNodes,
} from '../types';

export const useSelect = (
	tree: TreeWithUiState,
	onTreeSelectionChange: (TreeWithUiState: TreeWithUiState) => void,
	isSelectMode: boolean,
	onSelectItem: (id: TreeItemId) => void,
	onUnSelectItem: (id: TreeItemId) => void,
) => {
	const { YES, NO, PARTIAL } = SelectStatus;
	const { rootId, items } = tree;

	useEffect(() => {
		if (!isSelectMode) {
			const updatedNodes: MappedNodes = {};
			unSelectAllChildren(rootId, updatedNodes);
			onTreeSelectionChange({ rootId, items: { ...items, ...updatedNodes } });
		}
	}, [isSelectMode]);

	const onItemSelect = (itemId: TreeItemId): void => {
		const updatedNodes: MappedNodes = {};
		const item = deepCopyItemFromTree(itemId);
		updateChildrenSelectStatus(item, updatedNodes);
		updateParentsSelectStatus(item, updatedNodes);
		onTreeSelectionChange({ rootId, items: { ...items, ...updatedNodes } });
	};

	const deepCopyItemFromTree = (itemId: TreeItemId): TreeItemWithUiState => {
		const item = tree.items[itemId];
		const { data } = item;

		return { ...item, data: { ...data } };
	};

	const updateChildrenSelectStatus = (
		item: TreeItemWithUiState,
		updatedNodes: MappedNodes,
	): void =>
		item.data.selectStatus === YES
			? unSelectAllChildren(item.id, updatedNodes)
			: selectAllChildren(item.id, updatedNodes);

	const selectAllChildren = (
		itemId: TreeItemId,
		updatedNodes: MappedNodes,
	): void => {
		const item = deepCopyItemFromTree(itemId);
		updatedNodes[itemId] = item;
		item.data.selectStatus = YES;
		onSelectItem(itemId);
		item.hasChildren && !item.isExpanded && expandFolder(item);
		item.children.forEach((child) => selectAllChildren(child, updatedNodes));
	};

	const expandFolder = (item: TreeItemWithUiState) => {
		item.isExpanded = true;
	};

	const unSelectAllChildren = (
		itemId: TreeItemId,
		updatedNodes: MappedNodes,
	): void => {
		const item = deepCopyItemFromTree(itemId);
		item.data.selectStatus = NO;
		updatedNodes[itemId] = item;
		onUnSelectItem(itemId);
		item.children.forEach((child) => unSelectAllChildren(child, updatedNodes));
	};

	const updateParentsSelectStatus = (
		item: TreeItemWithUiState,
		updatedNodes: MappedNodes,
	): void => {
		const parentsIds = [...item.data.parentsIds];
		parentsIds
			.reverse()
			.forEach((child) => updateSelectStatus(child, updatedNodes));
	};

	const updateSelectStatus = (
		itemId: TreeItemId,
		updatedNodes: MappedNodes,
	): void => {
		if (itemId === rootId) {
			return;
		}

		const item = deepCopyItemFromTree(itemId);
		const reducedChildrenStatus = getReducedChildrenStatus(updatedNodes, item);
		item.data.selectStatus = reducedChildrenStatus;
		updatedNodes[itemId] = item;
	};

	const getReducedChildrenStatus = (
		updatedNodes: MappedNodes,
		item: TreeItemWithUiState,
	): SelectStatus => {
		const initialChildId = item.children[0];
		const initialStatus = getItemStatus(updatedNodes, initialChildId);
		const childrenStatus = item.children.reduce(
			(previousStatus: SelectStatus, childId: TreeItemId) => {
				const currentStatus = getItemStatus(updatedNodes, childId);
				if (currentStatus === previousStatus) {
					return currentStatus;
				}
				return PARTIAL;
			},
			initialStatus,
		);

		return childrenStatus;
	};

	const getItemStatus = (
		updatedNodes: MappedNodes,
		itemId: TreeItemId,
	): SelectStatus => {
		const itemSelectStatus = updatedNodes[itemId]
			? updatedNodes[itemId].data.selectStatus
			: tree.items[itemId].data.selectStatus;

		return itemSelectStatus || NO;
	};

	return { onItemSelect };
};
