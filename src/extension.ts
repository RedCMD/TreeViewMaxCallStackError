import * as vscode from 'vscode';

let totalNodeCount = 0;
let treeView: vscode.TreeView<element>;

type element = {
	index: number,
	depth: number,
	count: number,
};

const TreeDataProvider: vscode.TreeDataProvider<element> = {
	getChildren(element?: element): element[] {
		if (!element) {
			vscode.window.showInformationMessage(`Start: ${performance.now()}`);
		}
		
		const elements: element[] = [];

		if (!element) {
			for (let index = 0; index < 125000; index++) {
				totalNodeCount++;
				elements.push(
					{
						index: index,
						depth: 0,
						count: totalNodeCount,
					}
				);
			}
		}

		// const depth = element?.depth ?? 0;
		// if (depth < 4000) {
		// 	totalNodeCount++;
		// 	elements.push(
		// 		{
		// 			index: 0,
		// 			depth: depth + 1,
		// 			count: totalNodeCount,
		// 		}
		// 	);
		// }

		return elements;
	},
	getTreeItem(element: element): vscode.TreeItem {
		const index = element.index;
		const depth = element.depth;
		const count = element.count;
		const item = new vscode.TreeItem(
			`${depth}_${index}`,
			vscode.TreeItemCollapsibleState.Expanded,
		);
		item.id = count.toString();
		if (count == 124999) {
			vscode.window.showInformationMessage(`End: ${performance.now()}`);
		}
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
	treeView = vscode.window.createTreeView('TreeView', options);
}

export async function activate(context: vscode.ExtensionContext) {
	// vscode.window.showInformationMessage(JSON.stringify("TreeView Extension"));
	// const start = performance.now();

	initCallStackView(context);

	// vscode.window.showInformationMessage(`TreeView Extension ${(performance.now() - start).toFixed(3)}ms`);
}


// This method is called when your extension is deactivated
export function deactivate() {
	// vscode.window.showInformationMessage(JSON.stringify("deactivate"));
	// https://github.com/microsoft/vscode/issues/105484
	// https://github.com/microsoft/vscode/issues/201664
}


export function sleep(miliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, miliseconds));
}

export function stringify(this: any, key: string, value: any) {
	if (typeof value === 'function') {
		return "<function>";
	}
	if (typeof value === 'symbol') {
		return "<symbol>";
	}
	if (typeof value === 'undefined') {
		return "<undefined>";
	}
	if (value == null) {
		return null;
	}
	if (value instanceof Map) {
		if (key == "_grammars") {
			return Array.from(value.keys());
		}
		return Array.from(value.entries());
	}
	if (key.startsWith("HEAP")) {
		return "<error>";
	}
	return value;
}
