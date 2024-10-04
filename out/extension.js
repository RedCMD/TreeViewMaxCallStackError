"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
exports.sleep = sleep;
exports.stringify = stringify;
const vscode = require("vscode");
let totalNodeCount = 0;
let treeView;
const TreeDataProvider = {
    getChildren(element) {
        if (!element) {
            vscode.window.showInformationMessage(`Start: ${performance.now()}`);
        }
        const elements = [];
        if (!element) {
            for (let index = 0; index < 125000; index++) {
                totalNodeCount++;
                elements.push({
                    index: index,
                    depth: 0,
                    count: totalNodeCount,
                });
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
    getTreeItem(element) {
        const index = element.index;
        const depth = element.depth;
        const count = element.count;
        const item = new vscode.TreeItem(`${depth}_${index}`, vscode.TreeItemCollapsibleState.Expanded);
        item.id = count.toString();
        if (count == 124999) {
            vscode.window.showInformationMessage(`End: ${performance.now()}`);
        }
        return item;
    },
};
function initCallStackView(context) {
    // vscode.window.showInformationMessage(`initCallStackView\n${JSON.stringify(context)}`);
    const options = {
        treeDataProvider: TreeDataProvider,
        canSelectMany: false,
        showCollapseAll: true,
        manageCheckboxStateManually: false,
        // dragAndDropController: undefined,
    };
    treeView = vscode.window.createTreeView('TreeView', options);
}
async function activate(context) {
    // vscode.window.showInformationMessage(JSON.stringify("TreeView Extension"));
    // const start = performance.now();
    initCallStackView(context);
    // vscode.window.showInformationMessage(`TreeView Extension ${(performance.now() - start).toFixed(3)}ms`);
}
// This method is called when your extension is deactivated
function deactivate() {
    // vscode.window.showInformationMessage(JSON.stringify("deactivate"));
    // https://github.com/microsoft/vscode/issues/105484
    // https://github.com/microsoft/vscode/issues/201664
}
function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}
function stringify(key, value) {
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
