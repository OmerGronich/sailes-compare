import { TreeItemId } from '.';

export type DropTarget = {
	targetedNode: TreeItemId;
	topNodeId?: TreeItemId;
	bottomNodeId: TreeItemId;
};
