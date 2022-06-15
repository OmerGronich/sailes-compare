import { Dashboard } from './Dashboard';
import { Owner } from './Owner';

export type Folder = {
	created: string;
	lastUpdated: string;
	name: string;
	oid: string;
	dashboards: Dashboard[];
	owner: Owner;
	parentId: any;
	type: string;
	userId: string;
	_id: string;
	folders?: Folder[];
	instanceType: string;
};
