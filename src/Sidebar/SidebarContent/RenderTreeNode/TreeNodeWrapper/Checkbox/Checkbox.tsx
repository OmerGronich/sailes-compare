import React from 'react';

import { SelectStatus } from '../../../types';
import { Icon } from '@src/components';

import styles from './Checkbox.module.scss';

export type CheckboxProps = {
	selectStatus?: SelectStatus;
	onItemSelect: () => void;
};

const { YES, PARTIAL, NO } = SelectStatus;

const iconsMap: Record<SelectStatus, string> = {
	[YES]: 'general-checkbox-checked',
	[PARTIAL]: 'general-checkbox-partial-border-24px',
	[NO]: 'general-checkbox-unchecked',
};
const getSelectIcon = (selectStatus: SelectStatus): string =>
	iconsMap[selectStatus];

export const Checkbox = ({
	selectStatus = NO,
	onItemSelect,
}: CheckboxProps): JSX.Element => (
	<Icon
		name={getSelectIcon(selectStatus)}
		onClick={onItemSelect}
		className={styles.checkbox}
	/>
);
