import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
	default as TreeComponent,
	TreeItem,
	RenderItemParams,
} from '@atlaskit/tree';

import { useSelect, useDragAndDrop, useActiveNode } from './hooks';
import { RenderTreeNode } from './RenderTreeNode';
import { RootDropTarget } from './RootDropTarget';
import type {
	TreeItemId,
	TreeState,
	TreeNodeState,
	TreeConfig,
	Tree,
	TreeWithUiState,
} from './types';
import { getTreeWithUiState } from './tree-utils';
import { OFFSET_PER_LEVEL } from './consts';

import styles from './SidebarContent.module.scss';

export type SidebarContentProps = {
	treeState: Pick<TreeState, 'isSelectMode' | 'isSearchMode'>;
	treeConfig: TreeConfig;
	tree: Tree;
};

export const SidebarContent = ({
	tree,
	treeConfig,
	treeState,
}: SidebarContentProps): JSX.Element => {
	const {
		className,
		getIconName,
		onItemClick,
		onSelectItem,
		onUnSelectItem,
		onMoveItem,
		activeNodeId,
		emptyFolderPlaceholder,
		expandedFoldersIds,
		onExpandFolders,
		onCollapseFolders,
		isItemDraggable = () => true,
	} = treeConfig;

	const { rootId } = tree;
	const { isSelectMode, isSearchMode } = treeState;

	const isDragEnabled = (item: TreeItem): boolean => {
		if (isSelectMode || isSearchMode) {
			return false;
		}
		return isItemDraggable(item.id as TreeItemId);
	};

	const [treeWithUiState, setTreeWithUiState] = useState<TreeWithUiState>({
		rootId,
		items: getTreeWithUiState(tree, expandedFoldersIds),
	});

	useEffect(() => {
		setTreeWithUiState({
			rootId,
			items: getTreeWithUiState(tree, expandedFoldersIds),
		});
	}, [tree]);

	const { isInActiveRootLevelParent } = useActiveNode(
		tree,
		treeWithUiState,
		setTreeWithUiState,
		onExpandFolders,
		activeNodeId,
		isSearchMode,
	);

	const { onItemSelect } = useSelect(
		treeWithUiState,
		setTreeWithUiState,
		isSelectMode,
		onSelectItem,
		onUnSelectItem,
	);

	const {
		onDragStart,
		onDragEnd,
		onExpand,
		onCollapse,
		onItemDropTarget,
		dropTarget,
		isDragging,
	} = useDragAndDrop(
		treeWithUiState,
		setTreeWithUiState,
		onExpandFolders,
		onCollapseFolders,
		onMoveItem,
		isItemDraggable,
	);

	const renderItem = (props: RenderItemParams) => {
		const nodeState = props as TreeNodeState;

		const handleOnClick = () => {
			props.item.hasChildren
				? toggleNodeExpansion()
				: onItemClick(props.item.id.toString());
		};

		const toggleNodeExpansion = () => {
			props.item.isExpanded
				? onCollapse(props.item.id)
				: onExpand(props.item.id);
		};

		const treeState: TreeState = {
			isSelectMode,
			isSearchMode,
			onItemSelect,
			dropTarget,
			onItemDropTarget,
			activeNodeId,
			isInActiveRootLevelParent,
			handleOnClick,
			getIconName,
		};
		return (
			<RenderTreeNode
				{...treeState}
				{...nodeState}
				emptyFolderPlaceholder={emptyFolderPlaceholder}
			/>
		);
	};

	return (
		<div className={classNames(styles.treeContainer, className)}>
			<TreeComponent
				tree={treeWithUiState}
				renderItem={renderItem}
				onExpand={onExpand}
				onCollapse={onCollapse}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				offsetPerLevel={OFFSET_PER_LEVEL}
				isDragEnabled={isDragEnabled}
				isNestingEnabled
			/>
			<RootDropTarget
				rootId={rootId}
				isDragging={isDragging}
				dropTarget={dropTarget}
				onItemDropTarget={onItemDropTarget}
			/>
		</div>
	);
};
