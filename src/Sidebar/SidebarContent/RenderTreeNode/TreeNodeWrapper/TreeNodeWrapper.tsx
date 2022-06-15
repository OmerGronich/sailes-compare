import React, { ReactElement, useState } from 'react';
import classNames from 'classnames';

import type { MenuItemConfig } from '@src/components';
import { MenuButton, AlignPoints } from '@src/components';
import type { TreeItemWithUiState, TreeItemId } from '../../types';
import { Checkbox } from './Checkbox';
import { TreeNodeTooltip } from './TreeNodeTooltip';

import styles from './TreeNodeWrapper.module.scss';

export type TreeNodeWrapperProps = {
	item: TreeItemWithUiState;
	isSelectMode: boolean;
	isDragging: boolean;
	handleOnSelect: () => void;
	children: ReactElement;
	emptyFolderPlaceholder?: string;
};

export const TreeNodeWrapper = ({
	item,
	isSelectMode,
	handleOnSelect,
	children,
	emptyFolderPlaceholder,
}: TreeNodeWrapperProps): JSX.Element => {
	const [isHovered, setIsHovered] = useState(false);
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const isMenuIconVisible =
		!isSelectMode && (isHovered || isMenuVisible) && item.data.menuItems;

	const isShowEmptyFolderPlaceholder =
		!!emptyFolderPlaceholder &&
		item.hasChildren &&
		item.isExpanded &&
		item.children.length === 0;

	const menuPositioningConfig = {
		points: [AlignPoints.topLeft, AlignPoints.topRight],
		offset: [5, -5],
	};

	const handleOnMenuItemSelected = (menuItem: MenuItemConfig) => {
		const { onClick = () => {} } = menuItem;
		return onClick();
	};

	const hideTooltipWhenMenuIsVisible = (isVisible: boolean) => {
		setIsMenuVisible(isVisible);
		if (isVisible) {
			setIsHovered(false);
		}
	};

	const handleOnMouseOver = () => setIsHovered(true);
	const handleOnMouseLeave = () => setIsHovered(false);

	const isShowTooltip =
		isHovered && !isSelectMode && !isMenuVisible && !!item.data.tooltipItems;

	return (
		<>
			<TreeNodeTooltip
				items={item.data.tooltipItems!}
				isShowTooltip={isShowTooltip}>
				<div
					className={styles.treeNode}
					onMouseOver={handleOnMouseOver}
					onMouseLeave={handleOnMouseLeave}>
					{isSelectMode && (
						<Checkbox
							selectStatus={item.data.selectStatus}
							onItemSelect={handleOnSelect}
						/>
					)}
					{children}
					{isMenuIconVisible && (
						<MenuButton
							onItemSelected={handleOnMenuItemSelected}
							items={item.data.menuItems!}
							classes={{
								button: styles.menuIcon,
								wrapper: styles.menuWrapper,
							}}
							menuPositioningConfig={menuPositioningConfig}
							onMenuVisibilityChange={hideTooltipWhenMenuIsVisible}
						/>
					)}
				</div>
			</TreeNodeTooltip>
			{isShowEmptyFolderPlaceholder && (
				<div className={classNames(styles.emptyFolderContainer)}>
					{emptyFolderPlaceholder}
				</div>
			)}
		</>
	);
};
