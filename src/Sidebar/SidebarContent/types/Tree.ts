import { TreeData } from '@atlaskit/tree';

import { TreeItemId, TreeItemWithUiState, TreeItem } from '.';

export interface Tree {
	rootId: TreeItemId;
	items: Record<TreeItemId, TreeItem>;
}

export interface TreeWithUiState extends TreeData, Tree {
	rootId: TreeItemId;
	items: MappedNodes;
}

export type MappedNodes = Record<TreeItemId, TreeItemWithUiState>;
