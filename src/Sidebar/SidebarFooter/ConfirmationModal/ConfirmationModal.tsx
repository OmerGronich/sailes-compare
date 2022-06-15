import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { WarningModalDialog } from '@src/components';

import type { MenuItem } from '../types';

import styles from './ConfirmationModal.module.scss';

export interface ConfirmationModalProps {
	onRequestCloseModal: () => void;
	setMenuItemToBeConfirmed: (menuItem: MenuItem | null) => void;
	confirmation: {
		headerTitle: string;
		contentTitle: string;
		contentDescription?: string;
		onConfirmText: string;
		onCancelText: string;
		className?: string;
	};
	onClick: () => void;
}

export const ConfirmationModal = ({
	onRequestCloseModal,
	setMenuItemToBeConfirmed,
	confirmation,
	onClick,
}: ConfirmationModalProps) => {
	return (
		<WarningModalDialog
			isOpen
			shouldCloseOnOverlayClick
			onRequestCloseModal={onRequestCloseModal}
			className={classnames(styles.deleteModal, confirmation?.className)}
			content={{
				title: confirmation.contentTitle,
				description: confirmation.contentDescription,
			}}
			footer={{
				actions: [
					{
						text: confirmation.onCancelText,
						onClick: () => {
							setMenuItemToBeConfirmed(null);
						},
						className: 'btn--gray',
					},
					{
						text: confirmation.onConfirmText,
						onClick: () => {
							setMenuItemToBeConfirmed(null);
							onClick();
						},
					},
				],
			}}
		/>
	);
};
