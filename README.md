# AVL Binary search tree

### Running Tests

After you have cloned the project, in the root directory, install the modules, then run the tests:

```
npm install
npm test
```

You should see the results of the passed tests:

![Test Results](http://chineseruleof8.com/wp-content/uploads/2016/06/avl-tree-test.png)

reference:
https://www.geeksforgeeks.org/avl-tree-set-1-insertion/


The reason for an AVL tree is to avoid the situation of a Binary Search Tree that may degrade into a linked list.

For example, we create a tree out of a group of data that is sorted, say 1, 2, 3, 4, 5. If you were to create a standard BST out of it, you'll basically have a linked list. Thus, we then won't be able to use the specialty of a log n search time on the BST.

In order to remedy this, the AVL tree solves this problem by reconfiguring the tree via rotating nodes.

### Insertion

1) do a standard BST insertion at the end of a branch

before you recurse back up

2) update the node's height. 

The rules of height is:

Node with nothing below is considered to have a height of 0.
Node with one node below is considered to have a height of 1.
Thus, the height of a node, is how many vertices it has.

Thus, you calculate the height of the node by +1 to the height of its child with the bigger height.
Also, note that if you only have one node, its children are null and null. make sure to return -1 from these nulls so that the height of the node is 1 + - 1 = 0.

![Test Results](http://chineseruleof8.com/wp-content/uploads/2016/06/subtree-height.jpg)

3) update node's balance. 

/ O( log n )  for the insertion
// running time of 1 insertion:
// O( log n) , for updating the heights up to the root
// O( log n ) for binary recursion of inserting
// Thus, each insertion is O( log n )

// 1) BST standard insert to the end
// before you recurse back up:
// 2) update node's height 
// 3) update node's balance. Balance it with rotate if unbalanced