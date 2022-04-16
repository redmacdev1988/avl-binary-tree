"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVLNode = void 0;
const TreeNode_1 = require("./TreeNode");
const NodeData_1 = require("./NodeData");
class AVLNode extends TreeNode_1.TreeNode {
    constructor(data) {
        super(new NodeData_1.NodeData({ data }));
        this.left = null;
        this.right = null;
        let heightResult = 0;
        let balanceResult = 0;
        if (!this.left && !this.right) {
            heightResult = 0;
            balanceResult = 0;
        }
        else {
            const leftCurHeight = this.left ? (this.getHeight(this.left) + 1) : 0;
            const rightCurHeight = this.right ? (this.getHeight(this.right) + 1) : 0;
            heightResult = Math.max(leftCurHeight, rightCurHeight);
            balanceResult = leftCurHeight - rightCurHeight;
        }
        this.height = heightResult;
        this.balance = balanceResult;
    }
    getData() {
        return super.getNode();
    }
    getHeight(node) {
        if (!node) {
            return 0;
        }
        else {
            if (!node.left && !node.right) {
                return 0;
            }
            else if (node.left && !node.right) {
                return this.getHeight(node.left) + 1;
            }
            else if (!node.left && node.right) {
                return this.getHeight(node.right) + 1;
            }
            else {
                const left = this.getHeight(node.left);
                const right = this.getHeight(node.right);
                const result = Math.max(left, right) + 1;
                return result;
            }
        }
    }
    updateHeightAndBalance() {
        if (this) {
            if (!this.left && !this.right) {
                this.height = 0;
                this.balance = 0;
            }
            else {
                const leftHeightFromCurrent = this.left ? this.left.height + 1 : 0;
                const rightHeightFromCurrent = this.right ? this.right.height + 1 : 0;
                this.height = Math.max(leftHeightFromCurrent, rightHeightFromCurrent);
                this.balance = leftHeightFromCurrent - rightHeightFromCurrent;
            }
        }
        return this;
    }
    delete() {
        this.deleteNode();
        this.left = null;
        this.right = null;
        this.height = -1;
        this.balance = Infinity;
    }
}
exports.AVLNode = AVLNode;
//# sourceMappingURL=AVLNode.js.map