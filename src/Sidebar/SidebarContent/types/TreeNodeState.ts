import { ItemId } from '@atlaskit/tree';
import { TreeItemWithUiState } from '.';
import { ProvidedProps } from '.';
import { DraggableItemState } from '.';

export type TreeNodeState = {
	item: TreeItemWithUiState;
	depth: number;
	onExpand: (itemId: ItemId) => void;
	onCollapse: (itemId: ItemId) => void;
	provided: ProvidedProps;
	snapshot: DraggableItemState;
};
