import classNames from 'classnames';

import { DropTarget, TreeItemWithUiState, TreeItemId } from '../../types';
import { getDirectParentId } from '../../tree-utils';

import styles from '../RenderTreeNode.module.scss';

export const shouldUpdateDropTarget = (
	item: TreeItemWithUiState,
	dropTarget: DropTarget,
): boolean => {
	if (item.hasChildren) {
		return dropTarget.targetedNode !== item.id;
	}
	//when dragging over a non-folder node it's direct parent will be the drop target
	const directParentId = getDirectParentId(item);

	return dropTarget.targetedNode !== directParentId;
};

export const getStyles = (
	item: TreeItemWithUiState,
	isDragging: boolean,
	dropTarget: DropTarget,
	activeNodeId: TreeItemId,
	isInActiveFolder: (id: TreeItemId) => boolean,
): string => {
	const { id } = item;

	switch (true) {
		case isDragging:
			return styles.dragging;
		case item.isChildrenLoading:
			return styles.isLoading;
		default:
			return classNames({
				[styles.isDropTargetTopNode]: id === dropTarget.topNodeId,
				[styles.isInDropTarget]: isNodeInDropTarget(item, dropTarget),
				[styles.isDropTargetBottomNode]: id === dropTarget.bottomNodeId,
				[styles.isActive]: id === activeNodeId,
				[styles.isInActiveFolder]: isInActiveFolder(id),
			});
	}
};

const isNodeInDropTarget = (
	item: TreeItemWithUiState,
	dropTarget: DropTarget,
): boolean => {
	const { parentsIds } = item.data;
	const { targetedNode } = dropTarget;
	const rootFolderTargeted = targetedNode === parentsIds[0];
	if (rootFolderTargeted) {
		//only highlight non-folders when drop targeting the root folder
		return item.hasChildren ? false : parentsIds.length === 1;
	}
	return parentsIds.includes(targetedNode);
};
