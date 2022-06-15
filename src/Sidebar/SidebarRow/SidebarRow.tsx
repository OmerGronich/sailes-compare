import React from 'react';
import classnames from 'classnames';

import Icon from '@src/components/Icon/Icon';

import styles from './SidebarRow.module.scss';

export type SidebarRowProps = {
	iconName: string;
	onClick: () => any;
	title: string;
	className?: string;
};
export const SidebarRow = ({
	className,
	iconName,
	onClick,
	title,
}: SidebarRowProps) => (
	<div className={classnames(styles.row, className)} onClick={onClick}>
		<div className={styles.content}>
			<Icon name={iconName} />
			<div className={styles.title}>{title}</div>
		</div>
	</div>
);
