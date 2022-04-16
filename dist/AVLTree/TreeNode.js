"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = void 0;
// 2) Any generic type T used in class Node must conform to NodeMustHave
// This means T must have property data: string
// the data object passed into data should be NodeData, which implements get/set/print
class TreeNode {
    constructor(dataAttr) {
        var _a;
        this.dataAttr = dataAttr;
        (_a = this.dataAttr) === null || _a === void 0 ? void 0 : _a.print();
    }
    getNode() {
        return this.dataAttr;
    }
    setNode(newDataAttr) {
        this.dataAttr = newDataAttr;
    }
    deleteNode() {
        this.dataAttr = undefined;
        delete this.dataAttr;
    }
}
exports.TreeNode = TreeNode;
//# sourceMappingURL=TreeNode.js.map