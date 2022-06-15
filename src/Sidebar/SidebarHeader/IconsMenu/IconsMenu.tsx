import React from 'react';
import classNames from 'classnames';

import { Icon, MenuButton, MenuItemConfig } from '@src/components';

import styles from './IconsMenu.module.scss';

const noop = () => {};
export type IconsMenuProps = {
	searchIcon: {
		title: string;
		name: string;
		onClick: () => void;
		isDisabled?: boolean;
	};
	selectedIcon: {
		title: string;
		name: string;
		onClick: () => void;
	};
	menuButton: {
		title: string;
		iconName: string;
		items: MenuItemConfig[];
		isDisabled?: boolean;
	};
};

export const IconsMenu = ({
	searchIcon,
	selectedIcon,
	menuButton,
}: IconsMenuProps): JSX.Element => {
	const handleOnMenuItemSelected = (menuItem: MenuItemConfig) => {
		const { onClick = noop } = menuItem;
		return onClick();
	};

	return (
		<div className={styles.iconsContainer}>
			<Icon
				title={searchIcon.title}
				name={searchIcon.name}
				onClick={searchIcon.onClick}
				disabled={searchIcon.isDisabled}
				className={classNames({ [styles.iconDisabled]: searchIcon.isDisabled })}
			/>
			<Icon
				title={selectedIcon.title}
				name={selectedIcon.name}
				onClick={selectedIcon.onClick}
			/>
			<MenuButton
				title={menuButton.title}
				iconName={menuButton.iconName}
				items={menuButton.items}
				onItemSelected={handleOnMenuItemSelected}
				classes={{ wrapper: styles.menu }}
				disabled={menuButton.isDisabled}
			/>
		</div>
	);
};
