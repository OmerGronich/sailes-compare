import { MenuItemConfig } from '@src/components';

export type TreeItemId = string;

export interface TreeItem {
	id: TreeItemId;
	children: TreeItemId[];
	hasChildren: boolean;
	data: {
		title: string;
		menuItems?: MenuItemConfig[];
		tooltipItems?: TooltipItem[];
		iconName?: string;
	};
}

export type TooltipItem = {
	title: string;
	content: string;
};
