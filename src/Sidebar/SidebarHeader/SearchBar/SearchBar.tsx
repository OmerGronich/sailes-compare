import React from 'react';

import { Icon, Input } from '@src/components';

import styles from './SearchBar.module.scss';

export type SearchBarProps = {
	onChange: (value: string) => any;
	onCancel: () => any;
	value: string;
	className?: string;
};
export const SearchBar = ({ onChange, value, onCancel }: SearchBarProps) => (
	<>
		<Input
			onChange={onChange}
			placeholder="Search..."
			search
			value={value}
			inputClassName={styles.searchBar}
			autoFocus
		/>

		<Icon name="general-x" onClick={onCancel} />
	</>
);
