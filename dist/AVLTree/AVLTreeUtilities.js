"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leftMostOfRightSubTree = exports.rightMostOfLeftSubTree = exports.leftRotation = exports.rightRotation = exports.leftRightRotation = exports.rightLeftRotation = exports.numOfNodesInSubtree = exports.bothChildrenExists = exports.rightChildExists = exports.leftChildExists = exports.noChildren = void 0;
function noChildren(node) {
    if (node) {
        return !node.left && !node.right;
    }
    return null;
}
exports.noChildren = noChildren;
function leftChildExists(node) {
    if (node) {
        return node.left && !node.right;
    }
    return null;
}
exports.leftChildExists = leftChildExists;
function rightChildExists(node) {
    if (node) {
        return !node.left && node.right;
    }
    return null;
}
exports.rightChildExists = rightChildExists;
function bothChildrenExists(node) {
    if (node) {
        return node.left && node.right;
    }
    return null;
}
exports.bothChildrenExists = bothChildrenExists;
function subTreeCount(node) {
    if (!node) {
        return 0;
    }
    return subTreeCount(node.left) + subTreeCount(node.right) + 1;
}
function numOfNodesInSubtree(node) {
    return subTreeCount(node);
}
exports.numOfNodesInSubtree = numOfNodesInSubtree;
function rightLeftRotation(node) {
    const tmp = node;
    const anchor = tmp.right;
    const anchorLeft = anchor && anchor.left;
    const rightOfAnchorLeft = anchorLeft && anchorLeft.right;
    if (anchorLeft && anchor) {
        anchorLeft.right = anchor;
        anchor.left = rightOfAnchorLeft;
        tmp.right = anchorLeft;
        anchor.updateHeightAndBalance();
        anchorLeft.updateHeightAndBalance();
        tmp.updateHeightAndBalance();
        return leftRotation(tmp);
    }
    return null;
}
exports.rightLeftRotation = rightLeftRotation;
function leftRightRotation(node) {
    const tmp = node;
    const anchor = tmp.left;
    const anchorRight = anchor && anchor.right;
    const leftOfAnchorRight = anchorRight && anchorRight.left;
    if (anchorRight && anchor) {
        anchorRight.left = anchor;
        anchor.right = leftOfAnchorRight;
        tmp.left = anchorRight;
        anchor.updateHeightAndBalance();
        anchorRight.updateHeightAndBalance();
        tmp.updateHeightAndBalance();
        return rightRotation(tmp);
    }
    return null;
}
exports.leftRightRotation = leftRightRotation;
function rightRotation(node) {
    const tmp = node;
    const anchor = tmp.left;
    if (anchor) {
        tmp.left = anchor.right;
        anchor.right = tmp;
        anchor.updateHeightAndBalance();
        tmp.updateHeightAndBalance();
        return anchor;
    }
    return null;
}
exports.rightRotation = rightRotation;
function leftRotation(node) {
    const tmp = node;
    const anchor = tmp.right;
    if (anchor) {
        tmp.right = anchor.left;
        anchor.left = tmp;
        tmp.updateHeightAndBalance();
        anchor.updateHeightAndBalance();
        return anchor;
    }
    return null;
}
exports.leftRotation = leftRotation;
function rightMostOfLeftSubTree(node, replaceValueAtToDeleteNode) {
    if (!node.left && !node.right) {
        replaceValueAtToDeleteNode(node.getNode().get("data"), "rightMostOfLeftSubTree");
        node.delete();
        return null;
    }
    else if (!node.right) {
        let toConnect = node.left;
        replaceValueAtToDeleteNode(node.getNode().get("data"), "rightMostOfLeftSubTree");
        return toConnect; // return the node to connect
    }
    node.right = rightMostOfLeftSubTree(node.right, replaceValueAtToDeleteNode);
    node.updateHeightAndBalance();
    return node;
}
exports.rightMostOfLeftSubTree = rightMostOfLeftSubTree;
function leftMostOfRightSubTree(node, replaceValueAtToDeleteNode) {
    if (!node.left && !node.right) {
        replaceValueAtToDeleteNode(node.getNode().get("data"), "leftMostOfRightSubTree");
        node.delete();
        return null;
    }
    else if (!node.left) {
        let toConnect = node.right;
        replaceValueAtToDeleteNode(node.getNode().get("data"), "leftMostOfRightSubTree");
        return toConnect; // return the node to connect
    }
    node.left = leftMostOfRightSubTree(node.left, replaceValueAtToDeleteNode);
    node.updateHeightAndBalance();
    return node;
}
exports.leftMostOfRightSubTree = leftMostOfRightSubTree;
//# sourceMappingURL=AVLTreeUtilities.js.map