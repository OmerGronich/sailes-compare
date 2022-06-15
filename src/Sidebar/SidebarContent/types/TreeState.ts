import { DropTarget, TreeItemId } from '.';
export type TreeState = {
	isSelectMode: boolean;
	isSearchMode: boolean;
	onItemSelect: (id: TreeItemId) => void;
	dropTarget: DropTarget;
	onItemDropTarget: (id: TreeItemId) => void;
	activeNodeId?: TreeItemId;
	isInActiveRootLevelParent: (id: TreeItemId) => boolean;
	handleOnClick: () => void;
	getIconName: (id: TreeItemId) => string;
};
