import { AVLNode } from "./AVLNode";

export type MyCallback = (value: number) => number;

export function noChildren(node: AVLNode | null) {
    if (node) {
        return !node.left && !node.right
    }
    return null;
  }

export function leftChildExists(node: AVLNode | null) {
    if (node) {
        return node.left && !node.right
    } 
    return null;
}

export function rightChildExists(node: AVLNode | null) {
    if (node) {
        return !node.left && node.right
    }
    return null;
}

export function bothChildrenExists(node: AVLNode | null) {
    if (node) {
        return node.left && node.right;
    }
    return null;
}


function subTreeCount(node: AVLNode|null) : number {
    if (!node) { return 0; }
    return subTreeCount(node!.left) + subTreeCount(node!.right) + 1;
}

export function numOfNodesInSubtree(node: AVLNode|null) : number{
    return subTreeCount(node);
}

export function rightLeftRotation(node: AVLNode): AVLNode | null {
    const tmp: AVLNode = node;
    const anchor: AVLNode | null = tmp.right;
    const anchorLeft: AVLNode | null = anchor && anchor.left;
    const rightOfAnchorLeft: AVLNode | null = anchorLeft && anchorLeft.right;

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

export function leftRightRotation(node: AVLNode): AVLNode | null {
    const tmp: AVLNode = node;
    const anchor: AVLNode | null = tmp.left;
    const anchorRight: AVLNode | null = anchor && anchor.right;
    const leftOfAnchorRight: AVLNode | null = anchorRight && anchorRight.left;
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

export function rightRotation(node: AVLNode): AVLNode | null {
    const tmp: AVLNode = node;
    const anchor: AVLNode | null = tmp.left;
    if (anchor) {
        tmp.left = anchor.right;
        anchor.right = tmp;
        anchor.updateHeightAndBalance();
        tmp.updateHeightAndBalance();
        return anchor;
    }
   return null;
}

export function leftRotation(node: AVLNode): AVLNode | null {
    const tmp: AVLNode = node;
    const anchor: AVLNode | null= tmp.right;
    if (anchor) {
        tmp.right = anchor.left;
        anchor.left = tmp;
        tmp.updateHeightAndBalance();
        anchor.updateHeightAndBalance();
        return anchor;
    }
    return null;
  }



export function rightMostOfLeftSubTree(node: AVLNode, replaceValueAtToDeleteNode: MyCallback) {
    if (!node.left && !node.right) {
      replaceValueAtToDeleteNode(node.getNode().get("data"));
      node.delete();
      return null;
    }
    else if (!node.right) {
      let toConnect = node.left;
      replaceValueAtToDeleteNode(node.getNode().get("data"));
      return toConnect; // return the node to connect
    }

    node.right = rightMostOfLeftSubTree(node.right, replaceValueAtToDeleteNode);
    node.updateHeightAndBalance();
    return node
}

export function leftMostOfRightSubTree(node: AVLNode, replaceValueAtToDeleteNode: MyCallback) {
    if (!node.left && !node.right) {
      replaceValueAtToDeleteNode(node.getNode().get("data"));
      node.delete();
      return null;
    }
    else if (!node.left) {
      let toConnect = node.right;
      replaceValueAtToDeleteNode(node.getNode().get("data"));
      return toConnect; // return the node to connect
    }

    node.left = leftMostOfRightSubTree(node.left, replaceValueAtToDeleteNode);
    node.updateHeightAndBalance();
    return node
  }