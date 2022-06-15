import React, { useState, useEffect, useLayoutEffect } from 'react';

import {
	TreeWithUiState,
	TreeItemId,
	TreeItemWithUiState,
	DropTarget,
} from '../types';

const initializedDropTarget: DropTarget = {
	targetedNode: '',
	topNodeId: '',
	bottomNodeId: '',
};

export const useDropTarget = (
	tree: TreeWithUiState,
	onExpand: (id: TreeItemId) => void,
	draggedItemId: TreeItemId,
	isItemDraggable: (id: TreeItemId) => boolean,
) => {
	const [dropTarget, setDropTarget] = useState(initializedDropTarget);
	const [expandNodeId, setExpandNodeId] = useState<TreeItemId>('');

	const { rootId } = tree;

	useEffect(() => {
		if (isShouldExpandDropTarget(dropTarget)) {
			const timerId = setTimeout(() => {
				setExpandNodeId(dropTarget.targetedNode);
			}, 400);

			return () => clearTimeout(timerId);
		}
	});

	useLayoutEffect(() => {
		if (
			isShouldExpandDropTarget(dropTarget) &&
			dropTarget.targetedNode === expandNodeId
		) {
			onExpand(expandNodeId);
		}
	}, [expandNodeId, dropTarget, setExpandNodeId]);

	const isShouldExpandDropTarget = (dropTarget: DropTarget): boolean => {
		const { topNodeId, bottomNodeId } = dropTarget;

		return (
			!!topNodeId &&
			topNodeId === bottomNodeId &&
			tree.items[topNodeId].hasChildren &&
			!tree.items[topNodeId].isExpanded
		);
	};

	useLayoutEffect(() => {
		if (tree.items[expandNodeId]?.isExpanded) {
			onItemDropTarget(expandNodeId);
			setExpandNodeId('');
		}
	});

	const initializeDropTarget = () => setDropTarget(initializedDropTarget);

	const onItemDropTarget = (draggedOverNodeId: TreeItemId): void => {
		if (!isItemDraggable(draggedOverNodeId)) {
			return;
		}
		const targetedNode = getTargetedNodeId(draggedOverNodeId);
		const topNodeId = getDropTargetTopNodeId(targetedNode);
		const bottomNodeId = getLastExpandedNodeId(targetedNode);

		setDropTarget({ targetedNode, topNodeId, bottomNodeId });
	};

	const getTargetedNodeId = (draggedOverNodeId: TreeItemId): TreeItemId => {
		const draggedOverNode = tree.items[draggedOverNodeId];

		return draggedOverNode.hasChildren
			? draggedOverNodeId
			: getParentId(draggedOverNodeId);
	};

	const getParentId = (itemId: TreeItemId): TreeItemId => {
		const item = tree.items[itemId];
		const { parentsIds } = item.data;

		return parentsIds[parentsIds.length - 1];
	};

	const getDropTargetTopNodeId = (targetedNode: TreeItemId) =>
		targetedNode === rootId ? getFirstNonFolderNodeId(rootId) : targetedNode;

	const getFirstNonFolderNodeId = (parentId: TreeItemId): TreeItemId => {
		const parent = tree.items[parentId];
		const nodeId = parent.children.find(
			(nodeId) => !tree.items[nodeId].hasChildren,
		);

		return nodeId || '';
	};

	const getLastExpandedNodeId = (targetedNodeId: TreeItemId): TreeItemId => {
		const targetedNode = tree.items[targetedNodeId];
		if (isLastExpandedNode(targetedNode)) {
			return targetedNodeId;
		}
		const lastChild = getLastChild(targetedNode.children);

		return lastChild.hasChildren
			? getLastExpandedNodeId(lastChild.id)
			: lastChild.id;
	};

	const isLastExpandedNode = (node: TreeItemWithUiState) =>
		node.id === draggedItemId ||
		!node.hasChildren ||
		!node.isExpanded ||
		node.children.length === 0;

	const getLastChild = (children: TreeItemId[]): TreeItemWithUiState => {
		const lastChildId = children[children.length - 1];

		return tree.items[lastChildId];
	};

	return {
		dropTarget,
		onItemDropTarget,
		initializeDropTarget,
	};
};
