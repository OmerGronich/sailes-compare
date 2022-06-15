import React from 'react';
import classNames from 'classnames';

import { OFFSET_PER_LEVEL } from '../consts';
import {
	getStyles,
	shouldUpdateDropTarget,
	overrideDefaultDragConfiguration,
} from './node-utils';
import { TreeNodeState, TreeState } from '../types';
import { TreeNodeLabel } from './TreeNodeLabel';
import { TreeNodeWrapper } from './TreeNodeWrapper';

import styles from './RenderTreeNode.module.scss';

export type RenderTreeNodeProps = TreeNodeState &
	TreeState & {
		emptyFolderPlaceholder: string;
	};

export const RenderTreeNode = ({
	item,
	provided,
	snapshot,
	emptyFolderPlaceholder,
	isSelectMode,
	isSearchMode,
	dropTarget,
	activeNodeId = '',
	getIconName,
	onItemSelect,
	onItemDropTarget,
	isInActiveRootLevelParent,
	handleOnClick,
}: RenderTreeNodeProps): JSX.Element => {
	const { id } = item;
	const { isDragging, combineTargetFor } = snapshot;
	const isShouldUpdateDropTarget: boolean = shouldUpdateDropTarget(
		item,
		dropTarget,
	);

	const handleOnSelect = () => onItemSelect(id);
	const handleOnDropTarget = () => onItemDropTarget(id);

	if (!!combineTargetFor && isShouldUpdateDropTarget) {
		handleOnDropTarget();
	}

	const updatedDragProps = overrideDefaultDragConfiguration(
		isDragging,
		provided,
	);

	const draggableStyle = getStyles(
		item,
		isDragging,
		dropTarget,
		activeNodeId,
		isInActiveRootLevelParent,
	);

	const cloneStyle = getStyles(
		item,
		false,
		dropTarget,
		activeNodeId,
		isInActiveRootLevelParent,
	);

	const iconName = getIconName(id);

	const itemDepth = item.data.parentsIds.length - 1;

	const cloneOffset = itemDepth * OFFSET_PER_LEVEL + 14;

	return (
		<>
			<div
				className={classNames(styles.treeNode, draggableStyle)}
				ref={updatedDragProps.innerRef}
				{...updatedDragProps.dragHandleProps}
				{...updatedDragProps.draggableProps}>
				<TreeNodeWrapper
					item={item}
					isSelectMode={isSelectMode}
					isDragging={isDragging}
					handleOnSelect={handleOnSelect}
					emptyFolderPlaceholder={emptyFolderPlaceholder}>
					<TreeNodeLabel
						iconName={iconName}
						title={item.data.title}
						handleOnClick={handleOnClick}
						isSearchMode={isSearchMode}
					/>
				</TreeNodeWrapper>
			</div>
			{isDragging && (
				<div
					className={classNames(styles.treeNode, cloneStyle)}
					style={{ paddingLeft: cloneOffset }}>
					<TreeNodeLabel
						iconName={iconName}
						title={item.data.title}
						className={styles.clone}
					/>
				</div>
			)}
		</>
	);
};
