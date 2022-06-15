export type DraggableItemState = {
	isDragging: boolean;
	isDropAnimating: boolean;
	dropAnimation?: any;
	draggingOver?: string;
	combineWith?: string; // the currently dragged item gets the drop target item id
	combineTargetFor?: string; //the current drop target item gets the dragged item id
	mode?: 'SNAP' | 'FlUID';
};
