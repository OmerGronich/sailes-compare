export type ProvidedProps = {
	draggableProps: DraggableItemProps;
	dragHandleProps: DraggableProvidedDragHandleProps;
	innerRef: (el: HTMLElement | null) => void;
};

export type DraggableItemProps = {
	style?: DraggingStyle | NotDraggingStyle;
	'data-rbd-draggable-context-id': string;
	'data-rbd-draggable-id': string;
	onTransitionEnd?: React.TransitionEventHandler<any>;
};

export type DraggableProvidedDragHandleProps = {
	'data-rbd-drag-handle-draggable-id': string;
	'data-rbd-drag-handle-context-id': string;
	'aria-describedby': string;
	role: string;
	tabIndex: number;
	draggable: boolean;
	onDragStart: React.DragEventHandler<any>;
};

export type NotDraggingStyle = {
	transform?: string;
	transition: string;
};

export type DraggingStyle = {
	position: 'fixed';
	top: number;
	left: number;
	boxSizing: 'border-box';
	width: number;
	height: number;
	transition: 'none';
	transform?: string;
	zIndex: number;
	opacity?: number;
	pointerEvents: 'none';
	cursor: 'move';
};
