/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
const vscode = __webpack_require__(1);
let totalNodeCount = 0;
const TreeDataProvider = {
    getChildren(element) {
        const elements = [];
        if (!element) {
            elements.push({
                type: 'sibling',
                index: -1,
                depth: -1,
                count: 0,
            });
            elements.push({
                type: 'nesting',
                index: -1,
                depth: -1,
                count: 0,
            });
            return elements;
        }
        if (element.type == 'sibling') {
            vscode.window.showInformationMessage(`Start Sibling: ${performance.now().toFixed(3)}ms`);
            totalNodeCount = 0;
            for (let index = 0; index < 130000; index++) {
                totalNodeCount++;
                elements.push({
                    type: 'sib',
                    index: index,
                    depth: -1,
                    count: totalNodeCount,
                });
            }
            return elements;
        }
        if (element.type == 'nesting') {
            vscode.window.showInformationMessage(`Start Nesting: ${performance.now().toFixed(3)}ms`);
            totalNodeCount = 0;
            elements.push({
                type: 'nest',
                index: 0,
                depth: element.depth + 1,
                count: totalNodeCount,
            });
            return elements;
        }
        if (element.type == 'nest') {
            if (element.depth < 4000) {
                totalNodeCount++;
                elements.push({
                    type: 'nest',
                    index: 0,
                    depth: element.depth + 1,
                    count: totalNodeCount,
                });
            }
            return elements;
        }
    },
    getTreeItem(element) {
        const type = element.type;
        const index = element.index;
        const depth = element.depth;
        const count = element.count;
        if (type == 'nesting' || type == 'sibling') {
            const item = new vscode.TreeItem(type, vscode.TreeItemCollapsibleState.Collapsed);
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
        const item = new vscode.TreeItem(`${depth}_${index}`, vscode.TreeItemCollapsibleState.Expanded);
        item.id = `${depth}_${index}`;
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
    vscode.window.createTreeView('TreeView', options);
}
function activate(context) {
    initCallStackView(context);
}

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=extension.js.map