import React from 'react';

import { Tooltip } from '@src/components';
import { TooltipContent } from './TooltipContent';
import type { TooltipItem } from '../../../types';

export type TreeNodeTooltipProps = {
	items: TooltipItem[];
	isShowTooltip: boolean;
	children: React.ReactChild | React.ReactNode;
};

export const TreeNodeTooltip = ({
	items = [],
	isShowTooltip = false,
	children,
}: TreeNodeTooltipProps): JSX.Element => {
	return (
		<Tooltip
			placement="rightTop"
			align="top"
			overlay={isShowTooltip && <TooltipContent items={items} />}
			mouseEnterDelay={0.5}
			hideArrow>
			{children}
		</Tooltip>
	);
};
