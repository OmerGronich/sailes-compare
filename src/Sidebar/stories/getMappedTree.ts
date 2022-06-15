import React from 'react';

import type { Tree, TreeItem, TooltipItem } from '../../Sidebar';
import type { TreeNode, Folder, Dashboard } from './types';
import { itemTypes, MenuItemConfig } from '@src/components';

export const getMappedTree = (data: TreeNode): Tree => {
	const mappedTree: Tree = { rootId: data.oid, items: {} };
	const treeOwnerId: string = data.owner._id;

	const mapTreeItem = (item: TreeNode): void => {
		mappedTree.items[item.oid] = createTreeItem(item, treeOwnerId);
		item.folders?.map((folder) => mapTreeItem(folder as TreeNode));
		item.dashboards?.map((dashboard) => mapTreeItem(dashboard as TreeNode));
	};

	mapTreeItem(data);

	return mappedTree;
};

const createTreeItem = (item: TreeNode, treeOwnerId: string): TreeItem => {
	const isFolder = item.type === 'folder';
	const isOwner = item.owner._id === treeOwnerId;

	const node: TreeItem = {
		id: item.oid,
		children: isFolder ? listFoldersDashbordsIds(item) : [],
		hasChildren: isFolder,
		data: {
			title: isFolder ? item.name : item.title!,
			tooltipItems: createTreeNodeTooltip(item),
		},
	};
	if (isOwner) {
		node.data.menuItems = createTreeNodeMenu(item.oid);
	}

	return node;
};

const createTreeNodeMenu = (id: string): MenuItemConfig[] => [
	{
		caption: 'Rename',
		type: itemTypes.ITEM,
		onClick: () => {
			console.log('rename ', id);
		},
		id: `${id}-0`,
	},
	{
		caption: 'Duplicate',
		type: itemTypes.ITEM,
		onClick: () => {
			console.log('duplicate ', id);
		},
		id: `${id}-1`,
	},
	{
		caption: 'Delete',
		type: itemTypes.ITEM,
		onClick: () => {
			console.log('delete ', id);
		},
		id: `${id}-2`,
	},
];

const createTreeNodeTooltip = (item: TreeNode): TooltipItem[] => [
	{
		title: 'Name',
		content: item.title || item.name,
	},
	{
		title: 'Owner',
		content: `${item.owner.firstName} ${item.owner.lastName || ''}, ${
			item.owner.email
		}`,
	},
	{
		title: 'Created Date',
		content: item.created || '',
	},
	{
		title: 'Last Modified',
		content: item.lastUpdated || '',
	},
];

const listFoldersDashbordsIds = (node: TreeNode): string[] => {
	const foldersIdList =
		node.folders?.sort(compareNames).map((folder) => folder.oid) || [];
	const dashboardsIdsList =
		node.dashboards?.sort(compareTitles).map((dashboard) => dashboard.oid) ||
		[];

	return [...foldersIdList, ...dashboardsIdsList];
};

const compareNames = (a: Folder, b: Folder) =>
	a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1;

const compareTitles = (a: Dashboard, b: Dashboard) =>
	a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1;
