import { AVLTree } from "./AVLTree/AVLTree";

const tree = new AVLTree(null, "Ricky's implementation", "AVL Tree - 4 rotations for self balancing BTree");
tree.insert(50);
        tree.insert(60);
        tree.insert(70);
        tree.insert(80);
        tree.insert(90);
        tree.insert(100);
console.log(tree.balance()); // 0
console.log(tree.height()); // 2
console.log(tree.rootValue()); // 88

console.log('end');



