import React, { useState, useEffect } from 'react';
import type { ItemId } from '@atlaskit/tree';

import type {
	TreeItemId,
	MappedNodes,
	TreeWithUiState,
	TreeItemWithUiState,
} from '../types';
import { deepCopyTreeNode } from '../tree-utils';
import { useDropTarget } from '.';

export const useDragAndDrop = (
	tree: TreeWithUiState,
	setTree: (TreeWithUiState: TreeWithUiState) => void,
	onExpandFolders: (id: TreeItemId[]) => void,
	onCollapseFolders: (id: TreeItemId[]) => void,
	onMoveItem: (
		sourceParentId: string,
		destinationParentId: string,
		draggableItemId: string,
	) => void,
	isItemDraggable: (id: TreeItemId) => boolean,
) => {
	const [draggedItemId, setDraggedItemId] = useState<TreeItemId>('');
	const [dropDetails, setDropDetails] = useState({
		oldParentId: '',
		newParentId: '',
	});
	const [isDragging, setIsDragging] = useState(false);

	const onExpand = (itemId: ItemId): void => {
		const expandedItem: TreeItemWithUiState = deepCopyTreeNode(
			itemId as TreeItemId,
			tree,
		);
		expandedItem.isExpanded = true;
		setTree({
			...tree,
			items: { ...tree.items, [expandedItem.id]: expandedItem },
		});
		onExpandFolders([expandedItem.id]);
	};

	const onCollapse = (itemId: ItemId): void => {
		const collapsedItem = deepCopyTreeNode(itemId as TreeItemId, tree);
		collapsedItem.isExpanded = false;
		setTree({
			...tree,
			items: { ...tree.items, [collapsedItem.id]: collapsedItem },
		});
		onCollapseFolders([collapsedItem.id]);
	};

	const { dropTarget, initializeDropTarget, onItemDropTarget } = useDropTarget(
		tree,
		onExpand,
		draggedItemId,
		isItemDraggable,
	);

	useEffect(() => {
		const { oldParentId, newParentId } = dropDetails;
		if (oldParentId && newParentId && draggedItemId) {
			setDropDetails({ oldParentId: '', newParentId: '' });
			setDraggedItemId('');
			onMoveItem(oldParentId, newParentId, draggedItemId);
		}
	}, [dropDetails]);

	const onDragStart = (itemId: ItemId) => {
		setIsDragging(true);
		setDraggedItemId(itemId as TreeItemId);
	};

	const onDragEnd = () => {
		setIsDragging(false);
		const sourceParentId = getParentId(draggedItemId);
		const destinationParentId = dropTarget.targetedNode;
		if (sourceParentId !== destinationParentId) {
			onMoveNode(sourceParentId, destinationParentId, draggedItemId);
		}
		initializeDropTarget();
	};

	const getParentId = (itemId: TreeItemId): TreeItemId => {
		const { parentsIds } = deepCopyTreeNode(itemId, tree).data;
		const parentId = parentsIds[parentsIds.length - 1];

		return parentId;
	};

	const onMoveNode = (
		oldParentId: TreeItemId,
		newParentId: TreeItemId,
		draggedItemId: TreeItemId,
	) => {
		const updatedNodes: MappedNodes = {};
		setDropDetails({ oldParentId, newParentId });
		removeNodeFromParent(draggedItemId, oldParentId, updatedNodes);
		addNodeToParent(draggedItemId, newParentId, updatedNodes);
		updateNodeLoading(draggedItemId, updatedNodes);
		setTree({
			...tree,
			items: {
				...tree.items,
				...updatedNodes,
			},
		});
		onExpandFolders([newParentId]);
	};

	const removeNodeFromParent = (
		id: TreeItemId,
		parentId: TreeItemId,
		updatedNodes: MappedNodes,
	): void => {
		const parent = deepCopyTreeNode(parentId, tree);
		const indexInSource = parent.children.indexOf(id);
		parent.children.splice(indexInSource, 1);

		updatedNodes[parentId] = parent;
	};

	const addNodeToParent = (
		id: TreeItemId,
		parentId: TreeItemId,
		updatedNodes: MappedNodes,
	): void => {
		const parent = deepCopyTreeNode(parentId, tree);
		const indexInChildren = findNewSortedIndex(parent.children, id);
		parent.children.splice(indexInChildren, 0, id);
		parent.isExpanded = true;

		updatedNodes[parentId] = parent;
	};

	const findNewSortedIndex = (
		nodesIds: TreeItemId[],
		id: TreeItemId,
	): number => {
		const newNode = tree.items[id];

		const newIndex = nodesIds.findIndex((nodeId) => {
			const currentNode = tree.items[nodeId];
			const isCanCompareNodes = currentNode.hasChildren === newNode.hasChildren;
			const isFolderBeforeItems =
				!currentNode.hasChildren && newNode.hasChildren;
			const oldNodeTitle = currentNode.data.title.toLocaleLowerCase();
			const newNodeTitle = newNode.data.title.toLocaleLowerCase();

			return isCanCompareNodes
				? oldNodeTitle > newNodeTitle
				: isFolderBeforeItems;
		});

		return newIndex >= 0 ? newIndex : nodesIds.length;
	};

	const updateNodeLoading = (
		id: TreeItemId,
		mappedNodes: MappedNodes,
	): void => {
		const node = deepCopyTreeNode(id, tree);
		node.isChildrenLoading = true;
		node.isExpanded = false;
		mappedNodes[id] = node;
	};

	return {
		onDragStart,
		onDragEnd,
		onExpand,
		onCollapse,
		onItemDropTarget,
		dropTarget,
		isDragging,
	};
};
