import React, { useState } from 'react';
import classnames from 'classnames';

import type { MenuItemConfig } from '@src/components';
import { Text } from '@src/components';
import { IconsMenu } from './IconsMenu';
import { SearchBar } from './SearchBar';

import styles from './SidebarHeader.module.scss';

export type SidebarHeaderProps = {
	className?: string;
	title: string;
	onSelectIconClick: () => void;
	isSelectMode: boolean;
	menuItems: MenuItemConfig[];
	search: string;
	onSearchChange: (value: string) => any;
};

export const SidebarHeader = ({
	className,
	title,
	onSelectIconClick,
	isSelectMode,
	menuItems,
	search,
	onSearchChange,
}: SidebarHeaderProps): JSX.Element => {
	const [isSearchMode, setIsSearchMode] = useState(false);

	const handleOnCancelSearch = () => {
		setIsSearchMode(false);
		onSearchChange('');
	};

	return (
		<div className={classnames(styles.container, className)}>
			{!isSearchMode && (
				<>
					<Text text={title} className={styles.title} />
					<IconsMenu
						searchIcon={{
							title: 'search',
							name: 'general-search-small',
							onClick: () => setIsSearchMode(true),
							isDisabled: isSelectMode,
						}}
						selectedIcon={{
							title: `select ${title.toLowerCase()}`,
							name: 'general-selected',
							onClick: onSelectIconClick,
						}}
						menuButton={{
							title: 'options',
							iconName: 'general-plus',
							items: menuItems,
							isDisabled: isSelectMode,
						}}
					/>
				</>
			)}

			{isSearchMode && (
				<SearchBar
					value={search}
					onChange={onSearchChange}
					onCancel={handleOnCancelSearch}
				/>
			)}
		</div>
	);
};
