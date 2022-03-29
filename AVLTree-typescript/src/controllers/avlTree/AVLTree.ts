import { AVLNode } from "./AVLNode";
import { NodeData } from "./NodeData";
import { NodeMustHave, TreeNode } from "./TreeNode";
import { bothChildrenExists, leftChildExists, leftMostOfRightSubTree, leftRightRotation, leftRotation, MyCallback, noChildren, numOfNodesInSubtree, rightChildExists, rightLeftRotation, rightMostOfLeftSubTree, rightRotation } from "./AVLTreeUtilities";

export interface BTree <T extends NodeMustHave>{
    insert(value: number): void;
    remove(value: number, cb: MyCallback): void;
    height(): number;
    root(): TreeNode<T>;
}


export class AVLTree implements BTree <NodeMustHave> {

    name: string = "";
    description: string = "";

    constructor(private head: AVLNode | null, newName: string, newDescription: string) {
        this.head = null;
        this.name = newName;
        this.description = newDescription;
        console.log(`AVL Tree [${this.name}] created`);
    }

    private insertDataIntoAVLTree(data: number, node: AVLNode | null): AVLNode | null {
        let tmpNode: AVLNode | null = node;
        if (!tmpNode) {
            tmpNode = new AVLNode(data);
        } else {
            if (data > tmpNode.getData().get('data')) {
              tmpNode.right = this.insertDataIntoAVLTree(data, node ? node.right : null);
            } else if (data <= tmpNode.getData().get('data')) {
              tmpNode.left = this.insertDataIntoAVLTree(data, node ? node.left : null);
            }
        }
        // 2. we update the height and balance of every node before we iterate back up.
        tmpNode.updateHeightAndBalance();
        return tmpNode;
      }


      private checkForImbalance(node: AVLNode | null): AVLNode | null {
        if (node) {
          if (node.balance >= 2 && node.left && node.left.balance >= 1) {  // do right rotation: /
            node = rightRotation(node);
          } else if (node.balance >= 2 && node.left && node.left.balance <= -1) {  // do left right rotation: <
            node = leftRightRotation(node);
          }

          else if (node.balance <= -2 && node.right && node.right.balance <= -1) { // do left rotation: \
            node = leftRotation(node);
          } else if (node.balance <= -2 && node.right && node.right.balance >= 1) { // do right left rotations: >
            node = rightLeftRotation(node);
          }

          node!.left = node!.left && this.checkForImbalance(node!.left);
          node!.right = node!.right && this.checkForImbalance(node!.right);
          node!.updateHeightAndBalance();
        }
        return node;
      }

      private executeCopyForDeletion = (node: AVLNode, cb: MyCallback) => {
        return (value: number) => {
            cb(value);
            node!.getNode().set({ data: value});
            return value;
        }
      }

      private deleteNode(node: AVLNode | null, cb: MyCallback): AVLNode | null {
        if (node) {
            if (noChildren(node)) {
                cb(node.getData().get("data"));
                node.delete();
                node = null;
                return null;
            }
            else if (leftChildExists(node)) {
                let leftNode = node.left;
                cb(node.getData().get("data"));
                node.delete();
                return leftNode;
            }
            else if (rightChildExists(node)) {
                let rightNode = node.right;
                cb(node.getData().get("data"));
                node.delete();
                return rightNode;
            }
            else if (bothChildrenExists(node)) {  
                if (node.left!.height == node.right!.height) {
                    if (numOfNodesInSubtree(node.left!) < numOfNodesInSubtree(node.right!)) {
                        node.right = leftMostOfRightSubTree(node.right!, this.executeCopyForDeletion(node, cb));
                        return node.updateHeightAndBalance();
                    } else {
                        node.left = rightMostOfLeftSubTree(node.left!, this.executeCopyForDeletion(node, cb));
                        return node.updateHeightAndBalance();
                    }
                }
                if  (node.left!.height >= node.right!.height) { 
                    node.left = rightMostOfLeftSubTree(node.left!, this.executeCopyForDeletion(node, cb));
                    return node.updateHeightAndBalance();
                }
                if  (node.right!.height > node.left!.height) {
                    node.right = leftMostOfRightSubTree(node.right!, this.executeCopyForDeletion(node, cb));
                    return node.updateHeightAndBalance();
                }
            }
            return node;
        }
        return null;
      }


    private traverseRemove(data: number, node: AVLNode | null, cb: MyCallback): AVLNode | null {
        if (node == null) {
            return null;
        }
        const nodeData = node.getData().get("data")
        if (data > nodeData) {
            node.right = this.traverseRemove(data, node.right, cb);
        } else if (data < nodeData) {
            node.left = this.traverseRemove(data, node.left, cb);
        } else if (data == nodeData) {
            return this.deleteNode(node, cb);
        }
        node.updateHeightAndBalance();
        return node;
    }

    insert(value: number): void {
        // 1. we insert the data into the tree
        this.head = this.insertDataIntoAVLTree(value, this.head);
        // 3. check if any nodes are unbalanced, then rebalance using rotations
        this.head = this.checkForImbalance(this.head);
    }

    remove(value: number, cb: MyCallback): void {
        this.head = this.traverseRemove(value, this.head, (value: number) => {
            return cb(value);
        });
        this.head = this.checkForImbalance(this.head);
    }

    numOfNodes(): number {
        return numOfNodesInSubtree(this.head);
    }

    height(): number {
        return 0;
    }

    root(): TreeNode<NodeMustHave> {
        // return new NodeData<NodeMustHave>({ 0 });
        return new TreeNode <NodeMustHave>(new NodeData<NodeMustHave>({ data: 0 }));
    }


}