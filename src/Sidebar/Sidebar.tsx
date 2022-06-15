import React, { useState } from 'react';
import classNames from 'classnames';

import { SidebarHeader } from './SidebarHeader';
import { SidebarRow } from './SidebarRow';
import { SidebarContent } from './SidebarContent';
import type { SidebarContentProps } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import type { SidebarFooterProps } from './SidebarFooter';
import { useSearch } from './SidebarContent/hooks';

import type { MenuItemConfig } from '@src/components';
import { Separator } from '@src/components';

import styles from './Sidebar.module.scss';

export type SidebarProps = {
	sidebar?: {
		className?: string;
	};
	sidebarHeader: {
		className?: string;
		title: string;
		menuItems: MenuItemConfig[];
	};
	sidebarRow: {
		iconName: string;
		title: string;
		onClick: () => any;
		className?: string;
	};
	sidebarContent: Omit<SidebarContentProps, 'treeState'>;
	sidebarFooter: SidebarFooterProps;
};

export const Sidebar = ({
	sidebar,
	sidebarHeader,
	sidebarRow,
	sidebarContent,
	sidebarFooter,
}: SidebarProps): JSX.Element => {
	const [isSelectMode, setIsSelectMode] = useState(false);

	const { tree } = sidebarContent;

	const { displayTree, search, setSearch } = useSearch(tree);

	const treeState = {
		isSelectMode,
		isSearchMode: !!search,
	};

	return (
		<React.StrictMode>
			<div className={classNames(styles.sidebar, sidebar?.className)}>
				<SidebarHeader
					className={sidebarHeader.className}
					title={sidebarHeader.title}
					onSelectIconClick={() => setIsSelectMode(!isSelectMode)}
					menuItems={sidebarHeader.menuItems}
					isSelectMode={isSelectMode}
					search={search}
					onSearchChange={setSearch}
				/>
				<SidebarRow
					title={sidebarRow.title}
					iconName={sidebarRow.iconName}
					onClick={sidebarRow.onClick}
				/>
				<Separator />
				<SidebarContent
					treeState={treeState}
					treeConfig={sidebarContent.treeConfig}
					tree={displayTree}
				/>
				<SidebarFooter
					className={sidebarFooter.className}
					menuItems={sidebarFooter.menuItems}
					placeholderHint={sidebarFooter.placeholderHint}
					isShowFooter={sidebarFooter.isShowFooter}
				/>
			</div>
		</React.StrictMode>
	);
};
