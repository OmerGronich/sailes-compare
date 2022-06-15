import { Owner } from './Owner';
import { Share } from './Share';
import { TreeNode } from './TreeNode';

export type Dashboard = {
	created: string;
	datasource: Record<string, any>;
	live?: boolean;
	title: string;
	lastOpened: any;
	lastUpdated: string;
	lastPublish?: string;
	oid: string;
	owner: Owner;
	shares?: Share[];
	userAuth: Record<string, any>;
	subscription?: Record<string, any>;
	_dataSourcePermission?: string;
	widgets?: any;
	instanceType: string;
	parentFolder?: any;
	allowChangeSubscription?: boolean;
};
