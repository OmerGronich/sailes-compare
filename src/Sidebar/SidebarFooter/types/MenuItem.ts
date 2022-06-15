export type MenuItem = {
	iconName: string;
	hint: string;
	onClick: () => void;
	confirmation?: {
		headerTitle: string;
		contentTitle: string;
		contentDescription?: string;
		onConfirmText: string;
		onCancelText: string;
		className?: string;
	};
};
