import { Folder } from './Folder';
import { Dashboard } from './Dashboard';
import { ItemId } from '@atlaskit/tree';
import { Owner } from './Owner';

type RootFolder = {
	name: string;
	oid: string;
	owner: Owner;
	type: string;
	dashboards: Dashboard[];
	folders: Folder[];
	instanceType: string;
};

export type TreeNode = RootFolder & Partial<Folder> & Partial<Dashboard>;
