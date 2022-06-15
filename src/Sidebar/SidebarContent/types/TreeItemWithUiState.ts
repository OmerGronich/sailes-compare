import { MenuItemConfig } from '@src/components';
import { TreeItem as TreeItemComponent } from '@atlaskit/tree';

import type { TreeItem, TreeItemId, TooltipItem } from '.';

export interface TreeItemWithUiState extends TreeItem, TreeItemComponent {
	id: TreeItemId;
	children: TreeItemId[];
	hasChildren: boolean;
	isExpanded: boolean;
	isChildrenLoading?: boolean;
	data: DataWithUiState;
}

export type DataWithUiState = {
	title: string;
	parentsIds: TreeItemId[];
	iconName?: string;
	selectStatus?: SelectStatus;
	menuItems?: MenuItemConfig[];
	tooltipItems?: TooltipItem[];
};

export enum SelectStatus {
	NO,
	PARTIAL,
	YES,
}
