import React, { useState, ReactNode } from 'react';

import { getMappedTree } from './getMappedTree';
import nestedFoldersData from './raw_data/nested_folders';
import onlyFoldersData from './raw_data/only_folders';
import onlyDashboardsData from './raw_data/only_dashboards';
import emptyData from './raw_data/empty_data';
import { Sidebar } from '..';
import type { MenuItem, TreeItemId, TreeConfig, Tree } from '..';
import { itemTypes, MenuItemConfig, TreeItem } from '@src/components';

import styles from './Sidebar.module.scss';

export default {
	title: 'Components/Sidebar',
};

const useSidebar = (
	tree: Tree,
	setTree: React.Dispatch<React.SetStateAction<Tree>>,
	activeNodeId?: TreeItemId,
) => {
	const [activeItemId, setActiveItemId] = useState<TreeItemId>(
		activeNodeId || '',
	);
	const [selectedItemsIds, setSelectedItemsIds] = useState<TreeItemId[]>([]);
	const [expandedFoldersIds, setExpandedFoldersIds] = useState<TreeItemId[]>(
		[],
	);

	const isItemDraggable = (id: TreeItemId): boolean => {
		return !!tree.items[id].data.menuItems;
	};

	const onExpandFolders = (ids: TreeItemId[]): void => {
		setExpandedFoldersIds((expandedFoldersIds) => [
			...expandedFoldersIds,
			...ids,
		]);
	};

	const onCollapseFolders = (ids: TreeItemId[]): void => {
		setExpandedFoldersIds((expandedFoldersIds) =>
			expandedFoldersIds.filter((folderId) => !ids.includes(folderId)),
		);
	};

	const onItemClick = (itemId: TreeItemId) => {
		!tree.items[itemId].hasChildren && setActiveItemId(itemId);
	};

	const getIconName = (id: TreeItemId): string => {
		const item = tree.items[id];
		return item.hasChildren ? getFolderIconName(item) : getItemIconName(item);
	};

	const getItemIconName = (item: TreeItem): string =>
		item.data.menuItems
			? 'general-dashboard-new'
			: 'general-dashboard-new-share';

	const getFolderIconName = (item: TreeItem): string => {
		if (item.data.menuItems) {
			return expandedFoldersIds.includes(item.id)
				? 'general-folder-opened'
				: 'general-folder';
		} else {
			return expandedFoldersIds.includes(item.id)
				? 'general-folder-share-opened'
				: 'general-folder-share';
		}
	};

	const onSelectItem = (selectedItemId: TreeItemId) => {
		const selectedItem = tree.items[selectedItemId];
		if (
			!selectedItem.hasChildren &&
			!selectedItemsIds.includes(selectedItemId)
		) {
			setSelectedItemsIds((selectedItemsIds) =>
				selectedItemsIds.concat(selectedItemId),
			);
		}
	};

	const onUnSelectItem = (selectedItemId: TreeItemId) => {
		setSelectedItemsIds((selectedItemsIds) =>
			selectedItemsIds.filter(
				(itemId: TreeItemId) => itemId !== selectedItemId,
			),
		);
	};

	const onMoveItem = (
		oldParentId: TreeItemId,
		newParentId: TreeItemId,
		draggedItemId: TreeItemId,
	) => {
		//test asynchronous actions
		setTimeout(() => {
			const oldParent = removeNodeFromParent(draggedItemId, oldParentId);
			const newParent = addNodeToParent(draggedItemId, newParentId);
			setTree({
				...tree,
				items: {
					...tree.items,
					[oldParentId]: oldParent,
					[newParentId]: newParent,
				},
			});
		}, 500);
	};

	const removeNodeFromParent = (
		id: TreeItemId,
		parentId: TreeItemId,
	): TreeItem => {
		const parent = deepCopyNodeFromTree(parentId);
		const indexInSource = parent.children.indexOf(id);
		parent.children.splice(indexInSource, 1);

		return parent;
	};

	const addNodeToParent = (id: TreeItemId, parentId: TreeItemId): TreeItem => {
		const parent = deepCopyNodeFromTree(parentId);
		const indexInChildren = findNewSortedIndex(parent.children, id);
		parent.children.splice(indexInChildren, 0, id);

		return parent;
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

	const deepCopyNodeFromTree = (nodeId: TreeItemId) => {
		const node = { ...tree.items[nodeId] };
		const children = [...node.children];
		const data = { ...node.data };

		return { ...node, children, data };
	};

	return {
		onSelectItem,
		onUnSelectItem,
		selectedItemsIds,
		onItemClick,
		onMoveItem,
		activeItemId,
		setActiveItemId,
		getIconName,
		onExpandFolders,
		onCollapseFolders,
		expandedFoldersIds,
		isItemDraggable,
	};
};

const handleOnSideBarRowClick = () => {};

const onHeaderMenuItemClick = () => {};

const headerMenuItems: MenuItemConfig[] = [
	{
		type: itemTypes.ITEM,
		caption: 'New Dashboard',
		id: '1',
		value: 'a',
		onClick: onHeaderMenuItemClick,
	},
	{
		type: itemTypes.ITEM,
		caption: 'Add New Folder',
		id: 'add_new_folder',
		value: 'b',
		onClick: onHeaderMenuItemClick,
	},
	{
		type: itemTypes.ITEM,
		caption: 'Import Dashboard',
		id: '3',
		value: 'c',
		onClick: onHeaderMenuItemClick,
	},
];

const getFooterMenuItems = (selectedItemsIds: TreeItemId[]): MenuItem[] => [
	{
		iconName: 'general-external-link',
		hint: 'Export',
		onClick: () => {
			console.log(
				"External link icon. Selected Id's:",
				selectedItemsIds.join(','),
			);
		},
	},
	{
		iconName: 'general-duplicate',
		hint: 'Duplicate',
		onClick: () => {
			console.log(
				"Duplicate link icon. Selected Id's:",
				selectedItemsIds.join(','),
			);
		},
	},
	{
		iconName: 'general-copy-to-server',
		hint: 'Copy To Server',
		onClick: () => {
			console.log("Copy link icon. Selected Id's:", selectedItemsIds.join(','));
		},
	},
	{
		iconName: 'general-delete',
		hint: 'Delete',
		onClick: () => {
			console.log(
				"Delete link icon. Selected Id's:",
				selectedItemsIds.join(','),
			);
		},
		confirmation: {
			headerTitle: 'Delete Dashboards',
			contentTitle: `Are you sure you want to delete?`,
			contentDescription: `${selectedItemsIds.length} dashboards selected.`,
			onConfirmText: 'Delete',
			onCancelText: 'Cancel',
		},
	},
];

export const NestedFoldersWithDisabledSharedNodes: ReactNode = () => {
	const [tree, setTree] = useState<Tree>(getMappedTree(nestedFoldersData));
	const {
		onSelectItem,
		onUnSelectItem,
		selectedItemsIds,
		onItemClick,
		onMoveItem,
		activeItemId,
		getIconName,
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
		isItemDraggable,
	} = useSidebar(tree, setTree);

	const treeConfig: TreeConfig = {
		getIconName,
		onItemClick,
		emptyFolderPlaceholder: 'Folder is empty',
		onSelectItem,
		onUnSelectItem,
		onMoveItem,
		activeNodeId: activeItemId,
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
		isItemDraggable,
	};

	const footerMenuItems = getFooterMenuItems(selectedItemsIds);

	return (
		<Sidebar
			sidebar={{ className: styles.sidebar }}
			sidebarHeader={{
				title: 'Dashboards',
				menuItems: headerMenuItems,
			}}
			sidebarRow={{
				title: 'All Dashboards',
				iconName: 'general-all-dashboards',
				onClick: handleOnSideBarRowClick,
			}}
			sidebarContent={{ treeConfig, tree }}
			sidebarFooter={{
				menuItems: footerMenuItems,
				placeholderHint: `${selectedItemsIds.length} Dashboards selected`,
				isShowFooter: selectedItemsIds.length > 0,
			}}
		/>
	);
};

export const NestedFoldersWithActiveItem: ReactNode = () => {
	const [tree, setTree] = useState<Tree>(getMappedTree(nestedFoldersData));
	const activeNodeId = nestedFoldersData.folders[1].dashboards[0].oid;

	const {
		onSelectItem,
		onUnSelectItem,
		selectedItemsIds,
		onItemClick,
		onMoveItem,
		activeItemId,
		getIconName,
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
	} = useSidebar(tree, setTree, activeNodeId);

	const treeConfig: TreeConfig = {
		getIconName,
		onItemClick,
		onSelectItem,
		onUnSelectItem,
		onMoveItem,
		activeNodeId: activeItemId,
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
		emptyFolderPlaceholder: 'Folder is Empty',
	};

	const footerMenuItems = getFooterMenuItems(selectedItemsIds);

	return (
		<Sidebar
			sidebar={{ className: styles.sidebar }}
			sidebarHeader={{
				title: 'Dashboards',
				menuItems: headerMenuItems,
			}}
			sidebarRow={{
				title: 'All Dashboards',
				iconName: 'general-all-dashboards',
				onClick: handleOnSideBarRowClick,
			}}
			sidebarContent={{
				treeConfig,
				tree,
			}}
			sidebarFooter={{
				menuItems: footerMenuItems,
				placeholderHint: `${selectedItemsIds.length} Dashboards selected`,
				isShowFooter: selectedItemsIds.length > 0,
			}}
		/>
	);
};

export const OnlyDashboards: ReactNode = () => {
	const [tree, setTree] = useState<Tree>(getMappedTree(onlyDashboardsData));

	const {
		onSelectItem,
		onUnSelectItem,
		selectedItemsIds,
		onItemClick,
		onMoveItem,
		getIconName,
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
	} = useSidebar(tree, setTree);

	const treeConfig: TreeConfig = {
		getIconName,
		onSelectItem,
		onUnSelectItem,
		onMoveItem,
		onItemClick,
		emptyFolderPlaceholder: 'Folder is empty',
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
	};

	const footerMenuItems = getFooterMenuItems(selectedItemsIds);

	return (
		<Sidebar
			sidebar={{ className: styles.sidebar }}
			sidebarHeader={{
				title: 'Dashboards',
				menuItems: headerMenuItems,
			}}
			sidebarRow={{
				title: 'All Dashboards',
				iconName: 'general-all-dashboards',
				onClick: handleOnSideBarRowClick,
			}}
			sidebarContent={{ treeConfig, tree }}
			sidebarFooter={{
				menuItems: footerMenuItems,
				placeholderHint: `${selectedItemsIds.length} Dashboards selected`,
				isShowFooter: selectedItemsIds.length > 0,
			}}
		/>
	);
};

export const OnlyFolders: ReactNode = () => {
	const [tree, setTree] = useState<Tree>(getMappedTree(onlyFoldersData));

	const {
		onSelectItem,
		onUnSelectItem,
		selectedItemsIds,
		onItemClick,
		onMoveItem,
		getIconName,
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
	} = useSidebar(tree, setTree);

	const treeConfig: TreeConfig = {
		onSelectItem,
		onUnSelectItem,
		onMoveItem,
		onItemClick,
		getIconName,
		emptyFolderPlaceholder: 'Folder is empty',
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
	};

	const footerMenuItems = getFooterMenuItems(selectedItemsIds);
	return (
		<Sidebar
			sidebar={{ className: styles.sidebar }}
			sidebarHeader={{
				title: 'Dashboards',
				menuItems: headerMenuItems,
			}}
			sidebarRow={{
				title: 'All Dashboards',
				iconName: 'general-all-dashboards',
				onClick: handleOnSideBarRowClick,
			}}
			sidebarContent={{ treeConfig, tree }}
			sidebarFooter={{
				menuItems: footerMenuItems,
				placeholderHint: `${selectedItemsIds.length} Dashboards selected`,
				isShowFooter: selectedItemsIds.length > 0,
			}}
		/>
	);
};

export const EmptyTree: ReactNode = () => {
	const [tree, setTree] = useState<Tree>(getMappedTree(emptyData));

	const {
		onSelectItem,
		onUnSelectItem,
		selectedItemsIds,
		onItemClick,
		onMoveItem,
		getIconName,
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
	} = useSidebar(tree, setTree);

	const treeConfig: TreeConfig = {
		onSelectItem,
		onUnSelectItem,
		onMoveItem,
		onItemClick,
		getIconName,
		onCollapseFolders,
		onExpandFolders,
		expandedFoldersIds,
		emptyFolderPlaceholder: 'Folder is empty',
	};

	const footerMenuItems = getFooterMenuItems(selectedItemsIds);

	return (
		<Sidebar
			sidebar={{ className: styles.sidebar }}
			sidebarHeader={{
				title: 'Dashboards',
				menuItems: headerMenuItems,
			}}
			sidebarRow={{
				title: 'All Dashboards',
				iconName: 'general-all-dashboards',
				onClick: handleOnSideBarRowClick,
			}}
			sidebarContent={{ treeConfig, tree }}
			sidebarFooter={{
				menuItems: footerMenuItems,
				placeholderHint: `${selectedItemsIds.length} Dashboards selected`,
				isShowFooter: selectedItemsIds.length > 0,
			}}
		/>
	);
};
