import { TreeItemId } from '.';

export type TreeConfig = {
	className?: string;
	expandedFoldersIds: TreeItemId[];
	onExpandFolders: (ids: TreeItemId[]) => void;
	onCollapseFolders: (ids: TreeItemId[]) => void;
	onSelectItem: (id: TreeItemId) => void;
	onUnSelectItem: (id: TreeItemId) => void;
	onMoveItem: (
		sourceParentId: TreeItemId,
		destinationParentId: TreeItemId,
		draggableItemId: TreeItemId,
	) => void;
	onItemClick: (is: TreeItemId) => void;
	getIconName: (id: TreeItemId) => string;
	activeNodeId?: TreeItemId;
	emptyFolderPlaceholder: string;
	isItemDraggable?: (id: TreeItemId) => boolean;
};
