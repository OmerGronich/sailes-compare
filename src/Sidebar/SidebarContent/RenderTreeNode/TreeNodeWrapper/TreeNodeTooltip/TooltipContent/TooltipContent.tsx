import React from 'react';

import { Text } from '@src/components';
import type { TooltipItem } from '../../../../types';

import styles from './TooltipContent.module.scss';

export type TooltipContentProps = {
	items: TooltipItem[];
};

export const TooltipContent = ({ items }: TooltipContentProps): JSX.Element => {
	return (
		<>
			{items.map((item) => (
				<div key={item.title} className={styles.container}>
					<Text text={item.title} className={styles.subTitle} />
					<Text text={item.content} className={styles.subInfo} />
				</div>
			))}
		</>
	);
};
