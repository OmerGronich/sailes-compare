import React from 'react';
import classnames from 'classnames';

import { Icon, Text } from '@src/components';

import styles from './TreeNodeLabel.module.scss';

export type TreeNodeLabelProps = {
	iconName: string;
	title: string;
	className?: string;
	handleOnClick?: () => void;
	isSearchMode?: boolean;
};

export const TreeNodeLabel = ({
	iconName,
	title,
	className,
	handleOnClick = () => {},
	isSearchMode = false,
}: TreeNodeLabelProps): JSX.Element => (
	<div
		className={classnames(styles.labelContainer, className)}
		onClick={handleOnClick}>
		<div className={styles.iconContainer}>
			<Icon name={iconName} className={styles.icon} />
		</div>
		{isSearchMode ? (
			<span
				className={styles.title}
				dangerouslySetInnerHTML={{ __html: title }}
			/>
		) : (
			<Text text={title} className={styles.title} />
		)}
	</div>
);
