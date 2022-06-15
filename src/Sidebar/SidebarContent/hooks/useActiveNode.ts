import React, { useEffect, useState } from 'react';

import type {
	Tree,
	TreeWithUiState,
	TreeItemWithUiState,
	TreeItemId,
	MappedNodes,
} from '../types';
import { deepCopyTreeNode } from '../tree-utils';

export const useActiveNode = (
	tree: Tree,
	treeWithUiState: TreeWithUiState,
	setTreeWithUiState: React.Dispatch<React.SetStateAction<TreeWithUiState>>,
	onExpandFolders: (id: TreeItemId[]) => void,
	activeNodeId?: TreeItemId,
	isSearchMode = false,
) => {
	const [activeRootLevelParentId, setActiveRootLevelParentId] =
		useState<TreeItemId>('');
	const [isNewTree, setIsNewTree] = useState(false);
	const [isNewActiveNode, setIsNewActiveNode] = useState(false);

	useEffect(() => {
		setIsNewTree(true);
	}, [tree]);

	useEffect(() => {
		activeNodeId && setIsNewActiveNode(true);
	}, [activeNodeId]);

	useEffect(() => {
		if (!isSearchMode && (isNewActiveNode || (isNewTree && !!activeNodeId))) {
			const collapsedParentsIds = getCollapsedParentsIds(
				treeWithUiState,
				activeNodeId!,
			);
			const mappedExpandedParents = getMappedExpandedParents(
				treeWithUiState,
				collapsedParentsIds,
			);
			const rootLevelParent = getRootLevelParent(
				treeWithUiState,
				activeNodeId!,
			);
			onExpandFolders(collapsedParentsIds);
			setActiveRootLevelParentId(rootLevelParent);
			setTreeWithUiState({
				...treeWithUiState,
				items: { ...treeWithUiState.items, ...mappedExpandedParents },
			});
			setIsNewTree(false);
			setIsNewActiveNode(false);
		}
	}, [isNewActiveNode, isNewTree, treeWithUiState, activeNodeId]);

	const getCollapsedParentsIds = (
		tree: TreeWithUiState,
		activeItemId: TreeItemId,
	): TreeItemId[] =>
		tree.items[activeItemId].data.parentsIds.filter(
			(parentId) =>
				tree.items[parentId].hasChildren && !tree.items[parentId].isExpanded,
		);

	const getMappedExpandedParents = (
		tree: TreeWithUiState,
		collapsedParentsIds: TreeItemId[],
	): MappedNodes => {
		const mappedExpandedParents: MappedNodes = {};
		collapsedParentsIds.forEach((collapsedParentId) => {
			const collapsedParent: TreeItemWithUiState = deepCopyTreeNode(
				collapsedParentId,
				tree,
			);
			collapsedParent.isExpanded = true;
			mappedExpandedParents[collapsedParentId] = collapsedParent;
		});

		return mappedExpandedParents;
	};

	const getRootLevelParent = (
		tree: TreeWithUiState,
		itemId: TreeItemId,
	): TreeItemId => {
		const { parentsIds } = tree.items[itemId].data;

		return parentsIds.length > 1 ? parentsIds[1] : itemId;
	};

	const isInActiveRootLevelParent = (id: TreeItemId): boolean => {
		const item = treeWithUiState.items[id];
		const isActiveRootLevelParent = id === activeRootLevelParentId;
		const isInActiveRootLevelParent = item.data.parentsIds.includes(
			activeRootLevelParentId,
		);

		return isActiveRootLevelParent || isInActiveRootLevelParent;
	};

	return { isInActiveRootLevelParent };
};
