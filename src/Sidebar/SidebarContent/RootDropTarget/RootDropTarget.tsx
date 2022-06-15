import React from 'react';
import classNames from 'classnames';

import type { DropTarget, TreeItemId } from '../types';

import styles from './RootDropTarget.module.scss';

export type RootDropTargetProps = {
	rootId: TreeItemId;
	isDragging: boolean;
	dropTarget: DropTarget;
	onItemDropTarget: (id: TreeItemId) => void;
};

export const RootDropTarget = ({
	rootId,
	isDragging,
	dropTarget,
	onItemDropTarget,
}: RootDropTargetProps): JSX.Element => {
	const isTargeted = dropTarget.targetedNode === rootId;
	const handleDropTarget = () => {
		isDragging && !isTargeted && onItemDropTarget(rootId);
	};
	return (
		<div
			className={classNames(
				styles.isDropTargeted,
				isTargeted && styles.isTargeted,
			)}
			onMouseEnter={handleDropTarget}
		/>
	);
};
