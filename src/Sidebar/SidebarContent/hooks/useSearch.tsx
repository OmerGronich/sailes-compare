import { useMemo, useState } from 'react';

import { TreeItem } from '../types';
import type { Tree } from '@src/components';

const escapeSpecialChars = (search: string) =>
	search.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

export const useSearch = (tree: Tree) => {
	const [search, setSearch] = useState<string>('');
	const { rootId } = tree;

	const displayTree: Tree = useMemo(() => {
		if (!search) {
			return tree;
		}

		const escapedSearch = escapeSpecialChars(search);
		const regex = new RegExp(escapedSearch, 'ig');
		const rootNode: TreeItem = { ...tree.items[rootId] };
		const { data } = rootNode;

		const filteredItems: Tree = {
			rootId: rootId,
			items: {
				[rootId]: { ...rootNode, children: [], ...data },
			},
		};

		const nodes = Object.values(tree.items);

		nodes.forEach((node) => {
			const isItem = !node.hasChildren;
			if (!isItem) {
				return;
			}

			const { title } = node.data;
			if (isItem && regex.test(title)) {
				filteredItems.items[tree.rootId].children.push(node.id);

				Object.assign(filteredItems.items, {
					[node.id]: {
						...node,
						data: {
							...node.data,
							title: title.replace(
								regex,
								`<span style="color: #35d7be; font-weight: 600">$&</span>`,
							),
						},
					},
				});
			}
		});

		return filteredItems;
	}, [search, tree]);

	return {
		displayTree,
		search,
		setSearch,
	};
};
