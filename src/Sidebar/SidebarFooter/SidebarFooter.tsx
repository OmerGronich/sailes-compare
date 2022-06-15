import React, { useState } from 'react';
import classnames from 'classnames';

import { IconsMenu } from './IconsMenu';
import { ConfirmationModal } from './ConfirmationModal';
import { MenuItem } from './types';
import { Title } from '@src/components';

import styles from './SidebarFooter.module.scss';

export interface SidebarFooterProps {
	className?: string;
	menuItems: MenuItem[];
	placeholderHint: string;
	isShowFooter: boolean;
}

export const SidebarFooter = ({
	className,
	menuItems,
	placeholderHint,
	isShowFooter,
}: SidebarFooterProps) => {
	const [menuItemHint, setMenuItemHint] = useState('');
	const [menuItemToBeConfirmed, setMenuItemToBeConfirmed] =
		useState<MenuItem | null>(null);

	return (
		<div
			className={classnames(
				styles.footer,
				isShowFooter ? styles.showFooter : '',
				className,
			)}>
			<IconsMenu
				menuItems={menuItems}
				setMenuItemToBeConfirmed={setMenuItemToBeConfirmed}
				setMenuItemHint={setMenuItemHint}
			/>

			<Title
				className={classnames(styles.hint)}
				title={menuItemHint || placeholderHint}
			/>

			{menuItemToBeConfirmed?.confirmation && (
				<ConfirmationModal
					onRequestCloseModal={() => {
						setMenuItemToBeConfirmed(null);
					}}
					setMenuItemToBeConfirmed={setMenuItemToBeConfirmed}
					confirmation={menuItemToBeConfirmed.confirmation}
					onClick={menuItemToBeConfirmed.onClick}
				/>
			)}
		</div>
	);
};
