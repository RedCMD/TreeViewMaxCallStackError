import * as vscode from 'vscode';

let totalNodeCount = 0;

type element = {
	type: 'sibling' | 'nesting' | 'sib' | 'nest',
	index: number,
	depth: number,
	count: number,
};

const TreeDataProvider: vscode.TreeDataProvider<element> = {
	getChildren(element?: element): element[] {
		const elements: element[] = [];

		if (!element) {
			elements.push(
				{
					type: 'sibling',
					index: -1,
					depth: -1,
					count: 0,
				}
			);
			elements.push(
				{
					type: 'nesting',
					index: -1,
					depth: -1,
					count: 0,
				}
			);
			return elements;
		}

		if (element.type == 'sibling') {
			vscode.window.showInformationMessage(`Start Sibling: ${performance.now().toFixed(3)}ms`);
			totalNodeCount = 0;
			for (let index = 0; index < 130000; index++) {
				totalNodeCount++;
				elements.push(
					{
						type: 'sib',
						index: index,
						depth: -1,
						count: totalNodeCount,
					}
				);
			}
			return elements;
		}

		if (element.type == 'nesting') {
			vscode.window.showInformationMessage(`Start Nesting: ${performance.now().toFixed(3)}ms`);
			totalNodeCount = 0;
			elements.push(
				{
					type: 'nest',
					index: 0,
					depth: element.depth + 1,
					count: totalNodeCount,
				}
			);
			return elements;
		}

		if (element.type == 'nest') {
			if (element.depth < 4000) {
				totalNodeCount++;
				elements.push(
					{
						type: 'nest',
						index: 0,
						depth: element.depth + 1,
						count: totalNodeCount,
					}
				);
			}
			return elements;
		}
	},
	getTreeItem(element: element): vscode.TreeItem {
		const type = element.type;
		const index = element.index;
		const depth = element.depth;
		const count = element.count;

		if (type == 'nesting' || type == 'sibling') {
			const item = new vscode.TreeItem(
				type,
				vscode.TreeItemCollapsibleState.Collapsed,
			);
			return item;
		}

		if (type == 'sib') {
			if (count == 124999) {
				vscode.window.showInformationMessage(`End Sibling: ${performance.now().toFixed(3)}ms`);
			}
		}
		if (type == 'nest') {
			if (count == 3999) {
				vscode.window.showInformationMessage(`End Nesting: ${performance.now().toFixed(3)}ms`);
			}
		}

		const item = new vscode.TreeItem(
			`${depth}_${index}`,
			vscode.TreeItemCollapsibleState.Expanded,
		);
		item.id = `${depth}_${index}`;
		return item;
	},
};

function initCallStackView(context: vscode.ExtensionContext): void {
	// vscode.window.showInformationMessage(`initCallStackView\n${JSON.stringify(context)}`);

	const options: vscode.TreeViewOptions<element> = {
		treeDataProvider: TreeDataProvider,
		canSelectMany: false,
		showCollapseAll: true,
		manageCheckboxStateManually: false,
		// dragAndDropController: undefined,
	};
	vscode.window.createTreeView('TreeView', options);
}

export function activate(context: vscode.ExtensionContext) {
	initCallStackView(context);
}

