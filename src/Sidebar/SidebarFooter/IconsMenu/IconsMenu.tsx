import React from 'react';
import classnames from 'classnames';

import type { MenuItem } from '../types';
import { Icon } from '@src/components';

import styles from './IconsMenu.module.scss';

export type IconsMenuProps = {
	menuItems: MenuItem[];
	setMenuItemToBeConfirmed: (menuItem: MenuItem) => void;
	setMenuItemHint: (hint: string) => void;
};

export const IconsMenu = ({
	menuItems,
	setMenuItemToBeConfirmed,
	setMenuItemHint,
}: IconsMenuProps) => {
	return (
		<div className={classnames(styles.container)}>
			<div>
				{menuItems.map((menuItem) => (
					<Icon
						key={menuItem.iconName}
						className={styles.icon}
						onClick={() => {
							if (menuItem.confirmation) {
								setMenuItemToBeConfirmed(menuItem);
								return;
							}
							menuItem.onClick();
						}}
						name={menuItem.iconName}
						onMouseOver={() => {
							setMenuItemHint(menuItem.hint);
						}}
						onMouseLeave={() => {
							setMenuItemHint('');
						}}
					/>
				))}
			</div>
		</div>
	);
};
