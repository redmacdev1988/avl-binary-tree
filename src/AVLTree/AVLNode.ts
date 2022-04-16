import { DataAttributes, TreeNode, NodeMustHave } from "./TreeNode";
import { NodeData } from "./NodeData";

export class AVLNode extends TreeNode<NodeMustHave>{
    public left: AVLNode | null;
    public right: AVLNode | null;
    public balance: number;
    public height: number;

    getData(): DataAttributes <NodeMustHave> {
        return super.getNode();
    }

    constructor(data: number) { 
        super(new NodeData<NodeMustHave>({ data }));

        this.left = null;
        this.right = null;

        let heightResult = 0;
        let balanceResult = 0;

        if (!this.left && !this.right) {
            heightResult = 0;
            balanceResult = 0;
          } else {
            const leftCurHeight = this.left ? (this.getHeight(this.left) + 1) : 0;
            const rightCurHeight = this.right ? (this.getHeight(this.right) + 1) : 0;
            heightResult = Math.max(leftCurHeight, rightCurHeight);
            balanceResult = leftCurHeight - rightCurHeight;
          }
          this.height = heightResult;
          this.balance = balanceResult;
    }

    private getHeight(node: AVLNode | null): number {
        if (!node) {
            return 0;
        } else {
          if (!node.left && !node.right) {
            return 0;
          }
          else if (node.left && !node.right) {
              return this.getHeight(node.left) + 1;
          } else if (!node.left && node.right) {
              return this.getHeight(node.right) + 1;
          } else {
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
            } else {
            const leftHeightFromCurrent = this.left ? this.left.height + 1: 0;
            const rightHeightFromCurrent = this.right ? this.right.height + 1: 0;
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








