"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVLTree = void 0;
const AVLNode_1 = require("./AVLNode");
const AVLTreeUtilities_1 = require("./AVLTreeUtilities");
class AVLTree {
    constructor(head, newName, newDescription) {
        this.head = head;
        this.name = "";
        this.description = "";
        this.executeCopyForDeletion = (nodeToDelete, cb) => {
            return (value) => {
                cb(nodeToDelete.getNode().get("data"), `deleted node with value ${value} and replaced Node ${nodeToDelete.getNode().get("data")} with value ${value}`);
                nodeToDelete.getNode().set({ data: value });
                return value;
            };
        };
        this.head = null;
        this.name = newName;
        this.description = newDescription;
        console.log(`AVL Tree [${this.name}] created`);
    }
    insertDataIntoAVLTree(data, node) {
        let tmpNode = node;
        if (!tmpNode) {
            tmpNode = new AVLNode_1.AVLNode(data);
        }
        else {
            if (data > tmpNode.getData().get('data')) {
                tmpNode.right = this.insertDataIntoAVLTree(data, node ? node.right : null);
            }
            else if (data <= tmpNode.getData().get('data')) {
                tmpNode.left = this.insertDataIntoAVLTree(data, node ? node.left : null);
            }
        }
        // 2. we update the height and balance of every node before we iterate back up.
        tmpNode.updateHeightAndBalance();
        return tmpNode;
    }
    checkForImbalance(node) {
        if (node) {
            if (node.balance >= 2 && node.left && node.left.balance >= 1) { // do right rotation: /
                node = AVLTreeUtilities_1.rightRotation(node);
            }
            else if (node.balance >= 2 && node.left && node.left.balance <= -1) { // do left right rotation: <
                node = AVLTreeUtilities_1.leftRightRotation(node);
            }
            else if (node.balance <= -2 && node.right && node.right.balance <= -1) { // do left rotation: \
                node = AVLTreeUtilities_1.leftRotation(node);
            }
            else if (node.balance <= -2 && node.right && node.right.balance >= 1) { // do right left rotations: >
                node = AVLTreeUtilities_1.rightLeftRotation(node);
            }
            node.left = node.left && this.checkForImbalance(node.left);
            node.right = node.right && this.checkForImbalance(node.right);
            node.updateHeightAndBalance();
        }
        return node;
    }
    deleteNode(node, cb) {
        if (node) {
            const valueToDelete = node.getData().get("data");
            if (AVLTreeUtilities_1.noChildren(node)) {
                cb(node.getData().get("data"), `No children at ${valueToDelete}. Delete and assign node to null`);
                node.delete();
                node = null;
                return null;
            }
            else if (AVLTreeUtilities_1.leftChildExists(node)) {
                let leftNode = node.left;
                cb(node.getData().get("data"), `left child exists at ${valueToDelete}. return left node`);
                node.delete();
                return leftNode;
            }
            else if (AVLTreeUtilities_1.rightChildExists(node)) {
                let rightNode = node.right;
                cb(node.getData().get("data"), `right child exists at ${valueToDelete}, return right node`);
                node.delete();
                return rightNode;
            }
            else if (AVLTreeUtilities_1.bothChildrenExists(node)) {
                if (node.left.height == node.right.height) {
                    if (AVLTreeUtilities_1.numOfNodesInSubtree(node.left) < AVLTreeUtilities_1.numOfNodesInSubtree(node.right)) {
                        node.right = AVLTreeUtilities_1.leftMostOfRightSubTree(node.right, this.executeCopyForDeletion(node, cb));
                        return node.updateHeightAndBalance();
                    }
                    else {
                        node.left = AVLTreeUtilities_1.rightMostOfLeftSubTree(node.left, this.executeCopyForDeletion(node, cb));
                        return node.updateHeightAndBalance();
                    }
                }
                if (node.left.height >= node.right.height) {
                    node.left = AVLTreeUtilities_1.rightMostOfLeftSubTree(node.left, this.executeCopyForDeletion(node, cb));
                    return node.updateHeightAndBalance();
                }
                if (node.right.height > node.left.height) {
                    node.right = AVLTreeUtilities_1.leftMostOfRightSubTree(node.right, this.executeCopyForDeletion(node, cb));
                    return node.updateHeightAndBalance();
                }
            }
            return node;
        }
        return null;
    }
    traverseRemove(data, node, cb) {
        if (node == null) {
            return null;
        }
        const nodeData = node.getData().get("data");
        if (data > nodeData) {
            node.right = this.traverseRemove(data, node.right, cb);
        }
        else if (data < nodeData) {
            node.left = this.traverseRemove(data, node.left, cb);
        }
        else if (data == nodeData) {
            return this.deleteNode(node, cb);
        }
        node.updateHeightAndBalance();
        return node;
    }
    insert(value) {
        // 1. we insert the data into the tree
        this.head = this.insertDataIntoAVLTree(value, this.head);
        // 3. check if any nodes are unbalanced, then rebalance using rotations
        this.head = this.checkForImbalance(this.head);
    }
    remove(value, cb) {
        this.head = this.traverseRemove(value, this.head, (value, description) => {
            return cb(value, description);
        });
        this.head = this.checkForImbalance(this.head);
    }
    numOfNodes() {
        return AVLTreeUtilities_1.numOfNodesInSubtree(this.head);
    }
    height() {
        var _a;
        return (!this.head) ? 0 : (_a = this.head) === null || _a === void 0 ? void 0 : _a.height;
    }
    balance() {
        var _a;
        return (!this.head) ? 0 : (_a = this.head) === null || _a === void 0 ? void 0 : _a.balance;
    }
    rootValue() {
        var _a;
        return (!this.head) ? undefined : (_a = this.head) === null || _a === void 0 ? void 0 : _a.getData().get("data");
    }
}
exports.AVLTree = AVLTree;
//# sourceMappingURL=AVLTree.js.map