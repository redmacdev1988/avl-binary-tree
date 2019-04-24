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

# Insertion

1) do a standard BST insertion at the end of a branch

2) before you recurse back up

- update the node's height. 

The rules of height is:

Node with nothing below is considered to have a height of 0.
Node with one node below is considered to have a height of 1.
Thus, the height of a node, is how many vertices it has.

You calculate the height of the node by +1 to the height of its child with the bigger height.
Also, note that if you only have one node, its children are null and null. make sure to return -1 from these nulls so that the height of the node is 1 + - 1 = 0.

![Test Results](http://chineseruleof8.com/wp-content/uploads/2016/06/subtree-height-e1555899574856.jpg)

- update node's balance. 

Node's balance is simply getting the height of the left node, minus the height of the right node.
This indicates which subtree is heavier.

3) Once you've updated the height and balance, we check to see if there's an imbalance.

Imbalance means the current node's balance >= 2 or balance <= -2.

If the node's balance is 2, this means there the left subtree is heavy. We then check to see if that subtree is heavy on the left or right. The whole purpose of this is to check if the nodes are in the shape of
'/' or '<'.

![Check for Imbalance](http://chineseruleof8.com/wp-content/uploads/2016/06/imbalance-e1555903534602.jpg)


If they are, we need to rotate them accordingly. 

### To rotate '/': 

So we have an imbalance at node 70. It has a balance of +2.
Simply rotate the RIGHT most node (which is largest) down. Then hang the RIGHT subtree of the middle node onto the LEFT side of the RIGHT most node. 

![Rotate /](http://chineseruleof8.com/wp-content/uploads/2016/06/rotation.jpg)


### To rotate '<':

![Rotate <](http://chineseruleof8.com/wp-content/uploads/2016/06/less-than-correct-balance.jpg)

### To rotate '\\':

![Rotate \\](http://chineseruleof8.com/wp-content/uploads/2016/06/rotate.jpg )

We have an imbalance at node 70.. It has a balance of -2.
Simply rotate the LEFT most node (which is largest) down. Then hang the LEFT subtree of the middle node (60) onto the RIGHT side of the LEFT most node. 

### To rotate '>':

![Rotate >](http://chineseruleof8.com/wp-content/uploads/2016/06/more-than-correct-balance-754x1024.jpg)


> Keep in mind that after the rotation, we need to recalculate the height of the two nodes that have been rotated. This time, you cannot simply use max(left, right) + 1. You must do a recusive calculation of the height.

###### running time
It is O( log n )  for the insertion
The running time of 1 insertion:

* O( log n) for updating the heights up to the root
* O( log n ) for binary recursion of inserting
* O( 1 ) for updates on height and balance of nodes

Thus, each insertion is O( log n )


# Deletion

Standard BST deletion involves 4 situations:

![Rotate >](http://chineseruleof8.com/wp-content/uploads/2016/06/bst_deletion.jpg)

1) If there is no children, we just return null and propogate back up the recursion. The previous reference will point to null.

2) If there is a left child node and right child is null, return the left child node. It will propogate back up recursively and the previous reference will point to the left child node.

3) If there is a right child node and the left child is null, return the right child node. It will propogate back up recursively and the previous reference will point to the right child node.

4) If both have nodes, 

- get the value from the left most node of the right subtree, or right most node of the left subtree.
- Copy the value from that node to the current node that needs to be deleted.
- Then remove the node.



