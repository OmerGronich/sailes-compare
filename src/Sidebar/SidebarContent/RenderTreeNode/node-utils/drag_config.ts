import { ProvidedProps, DraggingStyle, NotDraggingStyle } from '../../types';

export const overrideDefaultDragConfiguration = (
	isDragging: boolean,
	provided: ProvidedProps,
): ProvidedProps => {
	if (isDragging) {
		overrideVerticalDragging(provided.draggableProps.style as DraggingStyle);
	} else {
		overrideReorderEffect(provided.draggableProps.style as NotDraggingStyle);
	}
	return provided;
};

const overrideReorderEffect = (draggablePropsStyle: NotDraggingStyle) => {
	draggablePropsStyle.transform = 'none';
	draggablePropsStyle.transition = 'none';
};

const overrideVerticalDragging = (draggablePropsStyle: DraggingStyle): void => {
	if (!draggablePropsStyle.transform) {
		return;
	}
	const xAxisIndexStart = draggablePropsStyle.transform.indexOf('(') + 1;
	const xAxisIndexEnd = draggablePropsStyle.transform.indexOf(',');
	const xAxisString: string = draggablePropsStyle.transform.slice(
		xAxisIndexStart,
		xAxisIndexEnd,
	);
	const overrideXAxis = draggablePropsStyle.transform.replace(
		xAxisString,
		'0px',
	);
	draggablePropsStyle.transform = overrideXAxis;
};
