
"use strict";

//https://www.cise.ufl.edu/~nemo/cop3530/AVL-Tree-Rotations.pdf

var TRAVERSAL = {
  PREORDER: 1,
  INORDER: 2,
  POSTORDER: 3,
};

var DIRECTION = {
  LEFT: "left",
  RIGHT: "right"
}

var HEAVY = {
  LEFT: "left heavy",
  RIGHT: "right heavy"
}
/***************************************
  NODE OBJECT WE USE TO CREATE OUR TREE
****************************************/


// Using ES6:
class treeNode {
    constructor (left, newData, newHeight, newBalance, right) {
        this.left = left || null;
        this.data = newData;
        this.height = newHeight;
        this.balance = newBalance;
        this.right = right || null;
    }
    display() { console.log("> " +this.data + " height: " + this.height + ", balance: " + this.balance); }
    delete() {
        this.left = null;
        this.data = null;
        this.height = null;
        this.balance = null;
        this.right = null;
    }
}

/******* SEARCHING IN TREE ***********/

// PRIVATE
// O(n)
function traverseSearch(number, node) {
    if (node == null) return null;
    _numOfStepsForSearch++;

    if (number > node.data) {
       return traverseSearch(number, node.right);
    } else if (number < node.data ){
       return traverseSearch(number, node.left);
    } else if (number == node.data) {
       return node;
    }
}


/********** BALANCE AND HEIGHT FOR WHOLE TREE ***********/

// PRIVATE
// O(n)
function balanceIt(node) {
    if (node == null) { return -1; }
    var rightHeight = balanceIt(node.right) + 1;
    var leftHeight = balanceIt(node.left) + 1;
    node.height = (leftHeight > rightHeight) ? leftHeight : rightHeight;
    node.balance = Math.abs(leftHeight - rightHeight);
    return node.height;
}

// PRIVATE
// O(n)
function updateBalanceAndHeightValuesForTree(node) {
    console.log(" ∞ Reassign balance/height for (sub)tree at root: " + node.data);
    if (node) {
        var rightHeight = balanceIt(node.right) + 1;
        var leftHeight = balanceIt(node.left) + 1;
        node.height = (leftHeight > rightHeight) ? leftHeight : rightHeight;
        node.balance = Math.abs(leftHeight - rightHeight);
    }
    return node;
}


/********** INSERTING INTO THE TREE *************/

function getBalance(node) {
    if (node.left == null && node.right == null) { return 0; }
    var leftHeight = 0;
    var rightHeight = 0;
    if (node.left) { leftHeight = getHeight(node.left); }
    if (node.right) { rightHeight = getHeight(node.right); }
    return Math.abs(leftHeight - rightHeight);
}

//The height of a binary tree is the number of edges between the tree's root
// and its furthest leaf node. This means that a tree containing a single node has a height of 0.
function getHeight(node) {
    if (node == null) return 0;
    if (node.left == null && node.right == null) { return 0; }
    var leftHeight = 0;
    var rightHeight = 0;
    if (node.left) { leftHeight = getHeight(node.left) + 1; }
    if (node.right) { rightHeight = getHeight(node.right) + 1; }
    return maxHeight(leftHeight, rightHeight);
}


// PRIVATE
// O(n)
function setHeightAndBalance(node) {
    node.height = getHeight(node);
    node.balance = getBalance(node);
    return node;
}

// PRIVATE
// O(1)
function maxHeight(leftHeight, rightHeight) {
    return (leftHeight > rightHeight) ? leftHeight : rightHeight;
}

// PRIVATE
// O(1)
function updateHeightAndBalanceForSingleNode(node) {
    var leftHeight = 0;
    if (node.left) { leftHeight = node.left.height + 1; }

    var rightHeight = 0;
    if (node.right) { rightHeight = node.right.height + 1; }

    node.height = maxHeight(leftHeight, rightHeight);
    node.balance = Math.abs(leftHeight - rightHeight);
    return node;
}

// PRIVATE
// O(1)
function rotate(node, directionType) {
    var anchor = null;
    var toMove = node;

    if (directionType == DIRECTION.LEFT) {
        anchor = node.right;
        toMove.right = (anchor.left) ? anchor.left : null;
        anchor.left = toMove;

    } else if (directionType == DIRECTION.RIGHT) {
        anchor = node.left;
        toMove.left = (anchor.right) ? anchor.right : null;
        anchor.right = toMove;
    }

    setHeightAndBalance(anchor);
    setHeightAndBalance(toMove);
    console.log("å anchor: " + anchor.data);
    return anchor;
}

// PRIVATE
// O(n)
function nodeCountForTree(node) {
    if (node == null) return 0;
    return nodeCountForTree(node.left) + nodeCountForTree(node.right) + 1;
}

// PRIVATE
// O(n)
// this function tells me whether the node is left or right heavy by height.
// if height is same, then it counts number of nodes.

function heaviness(node) {
    var leftHeight = 0; if (node.left) {leftHeight = getHeight(node.left)+1;}
    var rightHeight = 0; if (node.right) {rightHeight = getHeight(node.right)+1;}
    if (leftHeight == rightHeight) {
      return (nodeCountForTree(node.left) > nodeCountForTree(node.right)) ? HEAVY.LEFT : HEAVY.RIGHT;
    }
    return (leftHeight > rightHeight) ? HEAVY.LEFT : HEAVY.RIGHT;
}

// PRIVATE
// O(n)
function correctBalanceness(node) {
    console.log("\nUnbalanceness detected at node: " + node.data);

    if (heaviness(node) == HEAVY.LEFT) {
      if (heaviness(node.left) == HEAVY.RIGHT) {
         console.log("HEAVY left right (<) ");
         node.left = rotate(node.left, DIRECTION.LEFT);
         node = rotate(node, DIRECTION.RIGHT);
      } else {
        console.log("HEAVY left left (/) ");
        node = rotate(node, DIRECTION.RIGHT);
      }
    } else if (heaviness(node) == HEAVY.RIGHT){ // right heavy
      if (heaviness(node.right) == HEAVY.LEFT) {
          console.log("HEAVY right left (>)");
          node.right = rotate(node.right, DIRECTION.RIGHT);
          node = rotate(node, DIRECTION.LEFT);
      } else {
          console.log("HEAVY right right (\\) ");
          node = rotate(node, DIRECTION.LEFT);
      }
    }
    return node;
}

// PRIVATE
// O(n)
function balanceTree(node) {
    node = updateHeightAndBalanceForSingleNode(node);
    return (node.balance >= 2) ? correctBalanceness(node) : node;
}


// PRIVATE
// O(log n)  for insertion
// O(n)    for update height and balance after insertion
function traverseInsertion(numberToInsert, node) {
    if (node == null) {
      console.log("(+) Inserted leaf node: " + numberToInsert);
      return new treeNode(null, numberToInsert, 0, 0, null);
    }
    if (numberToInsert > node.data) {
        node.right = traverseInsertion(numberToInsert, node.right);
    } else {
        node.left = traverseInsertion(numberToInsert, node.left);
    }
    return balanceTree(node);
}

/*********** BALANCENESS OF A TREE *************/

// PRIVATE
// will send 'false' to callback for any unbalanceness
// O(n) - we visit every node in the tree
function countBalance(node, balancedCallBack) {
    if (node == null) { return -1; }
    var leftCount = 1 + countBalance(node.left, balancedCallBack);
    var rightCount = 1 + countBalance(node.right, balancedCallBack);
    if (Math.abs(leftCount-rightCount) > 1) {
        balancedCallBack(false, node);
    }
    return (leftCount >= rightCount) ? leftCount : rightCount;
}


// PRIVATE
// Checks to see if an unbalanceness exist in the tree
// O(n)
function checkForBalanceness (balancedTree) {
    console.log("√ Check for Balanceness at node: " + balancedTree.data);
    var balancenessExist = true;
    countBalance(balancedTree, function(balanced = true, node) {
        if (balanced == false) {
            balancenessExist = balanced
        }
    });
    console.log("∆ Does Balance Exist? : " + balancenessExist);
    return balancenessExist;
}

/*********** REMOVING FROM THE TREE ***********/

//PRIVATE UTILITY FOR CHECKING NODE'S CHILDREN EXISTENCE
// O(1)
function noChildren(node) { return (node.left == null && node.right == null); }
function leftChildOnly(node) { return (node.left != null && node.right == null); }
function rightChildOnly(node) { return (node.left == null && node.right != null); }
function bothChildExist(node) { return (node.left != null && node.right != null); }
function singleNodeLeft(node) { return ((node) && node.left == null && node.right == null); }
// PRIVATE
// Finds the minimum of sub-tree and delete it
// You can get rightmost of left subtree, or leftmost of right subtree
// O (log n)
function deleteMinimum(node, removeCallBack) {
    if (noChildren(node)) {
        removeCallBack(node);
        return null;
    }
    if (rightChildOnly(node)) {
        removeCallBack(node);
        return node.right;
    }
    if (node.left) {
        node.left = deleteMinimum(node.left, removeCallBack);
        return node;
    }
}

// PRIVATE
// O(log n) - for finding the removal and removing it
// O(log n) - for case where both subtree exist. We delete minimum of right subtree.
// total - O(log n)
function traverseRemove(number, node) {
    if (node == null) {
        console.log("Ø You're at leaf end, null. Number " + number + " not found. :P )");
        return null;
    }
    if (number > node.data) {
        node.right = traverseRemove(number, node.right);
        return node;
    } else if (number < node.data) {
        node.left = traverseRemove(number, node.left);
        return node;
    } else if (number == node.data) {
        if (noChildren(node)) {
            console.log("Deleting node " + node.data + ", which HAS NO CHILDREN!");
            node.delete(); return null;
        }
        if (leftChildOnly(node)) {
            var leftNodeRef = node.left; node.delete(); return leftNodeRef;
        }
        if (rightChildOnly(node)) {
            var rightNodeRef = node.right; node.delete(); return rightNodeRef;
        }
        if (bothChildExist(node)) {
            var nodeToDelete;
            node.right = deleteMinimum(node.right, function(toRemove){
                node.data = toRemove.data;
                nodeToDelete = toRemove;
            });
            nodeToDelete.delete();
            return node;
        }
    } // FOUND
} // traverseRemove function


// PRIVATE
// O(log n)
function findBadNode(node, nodeParent, callBack) {
    if (node == null) return;
    if (node.balance >= 2) { callBack(node, nodeParent); }
    findBadNode(node.left, node, callBack);
    findBadNode(node.right, node, callBack);
}

// PRIVATE
// O(n)
function remove(number, head) {
  console.log("---------- Let's remove: " + number + " -----------------");
  if (head) {
      if (head.data == number && rightChildOnly(head)) {
          console.log("Removing " + number + ", right child only");
          var temp = head; head = head.right; temp.delete();
          return head;
      }
      else if (head.data == number && leftChildOnly(head)) {
          var temp = head; head = head.left; temp.delete();
          return head;
      }
      else if (head.data == number && noChildren(head)) {
          head.delete(); head = null;
          return null;
      }
      return traverseRemove(number, head);
  } else {
    console.log("Ø Empty tree. Nothing to remove");
  }
}


// BALANCED AVL TREE
// insert
// delete
// search
var _head = null;
class AVLTree {

    constructor () {
        var _numOfStepsForSearch = 0;
        this.geNumOfStepsForSearch = function() { return _numOfStepsForSearch; }
        console.log(" Constructed AVLTree class ")
    }

    static CreateObject () {
        console.log("Factory function returning you a fresh AVLTree instance.");
        return new AVLTree();
    }

    // PUBLIC
    // returns you the node if found
    // null otherwise
    search (numberToFind) {
       _numOfStepsForSearch = 0;
       if (_head) { return traverseSearch(numberToFind, _head); }
    }

    // PUBLIC
    // O(log n) for insertion
    // O(n) for updating heights and balance values
    insertAndBalance (number) {
        if (_head == null) {
            console.log("(+) Inserted node: " + number);
            _head = new treeNode(null, number, 0, 0, null);

        } else {
            if (number > _head.data) { _head.right = traverseInsertion(number, _head.right); }
            else { _head.left = traverseInsertion(number, _head.left); }

            _head = balanceTree(_head);
            console.log("!! Anytime you do rotation in the tree AFTER AN INSERTION, you must update balance and height of WHOLE tree !!");
            updateBalanceAndHeightValuesForTree(_head);
            checkForBalanceness(_head);
            return _head;
        }
    }

    // PUBLIC
    // when we remove ANY nodes, the height and balance of WHOLE TREE MUST BE RE-EVALUATED
    // O(n) for update balance and height of tree
    // O(n) for balancing tree
    // O(n) + O(n) = 2 * O(n), which is O(n)
    removeAndBalance(value) {
        var node = remove(value, _head);
        if (node == null) { console.log("Ø TREE EMPTY NOW. NOTHING to rebalance or fix"); _head = null; return; }
        if (singleNodeLeft(node)) { _head = node; }

        console.log("◊ After removing value: " + value + ", let's update balance and height");
        updateBalanceAndHeightValuesForTree(node); // THIS IS NEEDED

        while (checkForBalanceness(node) == false) { // while its un balanced, we find bad node.
            findBadNode(node, null, function(badNode, parentNode) {
                console.log("(X) FOUND BAD NODE AT: " + badNode.data);

                if (parentNode) {
                    console.log("nodeParent exists, PARENT NODE IS: " + parentNode.data);
                    if (parentNode.left === badNode) {
                        console.log(parentNode.data + " left points to " + badNode.data);
                        parentNode.left = balanceTree(badNode);
                    } else {
                        parentNode.right = balanceTree(badNode);
                    }
                } else { // nodeParent does not exist, which means we are at ROOT!
                    console.log("No nodeParent, (X) FOUND BAD NODE AT: " + badNode.data);
                    _head = balanceTree(badNode);
                }

                console.log("!! Anytime you do rotation in the tree AFTER A REMOVAL, you must update balance and height of WHOLE tree !!");
                updateBalanceAndHeightValuesForTree(_head);
                checkForBalanceness(_head);
            }); // findBadNode
        } // while

        console.log("All done");
        console.log(_head.data);
    } //removeAndBalance


    // PUBLIC
    inOrderPrint(node) {
        if (node == null) return;
        this.inOrderPrint(node.left);
        if (_head == node) {
          console.log("===============  HEAD  ==================");
        }
        node.display();
        if (_head == node) {
          console.log("=============================================")
        }
        this.inOrderPrint(node.right);
    }

    // PUBLIC
    print(traversalType) {
        console.log("--------------------------------  TREE DISPLAY  --------------------------------");

        if (_head) {
          switch (traversalType) {
              case TRAVERSAL.INORDER: this.inOrderPrint(_head); break;
            default:
          }
        } else { console.log("Nothing to display. Empty Tree") }
    }

} // end of AVLTree


var avl = AVLTree.CreateObject();

/*
// test case 1 OK
avl.insertAndBalance(5);
avl.insertAndBalance(2);
avl.insertAndBalance(8);
avl.insertAndBalance(1);
avl.insertAndBalance(3);
avl.insertAndBalance(7);
avl.insertAndBalance(10);
avl.insertAndBalance(4);
avl.insertAndBalance(6);
avl.insertAndBalance(9);
avl.insertAndBalance(11);
avl.insertAndBalance(12);
avl.print(TRAVERSAL.INORDER);
avl.removeAndBalance(1);
avl.print(TRAVERSAL.INORDER);
*/


/*
// test case 2 OK
avl.insertAndBalance(6);
avl.insertAndBalance(2);
avl.insertAndBalance(9);
avl.insertAndBalance(1);
avl.insertAndBalance(4);
avl.insertAndBalance(8);
avl.insertAndBalance(11);
avl.insertAndBalance(3);
avl.insertAndBalance(5);
avl.insertAndBalance(7);
avl.insertAndBalance(10);
avl.insertAndBalance(13);
avl.insertAndBalance(14);
avl.print(TRAVERSAL.INORDER);
avl.removeAndBalance(5);
avl.removeAndBalance(3);
avl.print(TRAVERSAL.INORDER);
*/


/*
// test case 3 OK

avl.insertAndBalance(20);
avl.insertAndBalance(4);
avl.insertAndBalance(26);
avl.insertAndBalance(3);
avl.insertAndBalance(9);
avl.insertAndBalance(21);
avl.insertAndBalance(30);
avl.insertAndBalance(2);
avl.insertAndBalance(7);
avl.insertAndBalance(11);
avl.insertAndBalance(15);
avl.print(TRAVERSAL.INORDER);

avl.removeAndBalance(30);
avl.removeAndBalance(20);
avl.removeAndBalance(15);
avl.removeAndBalance(26);
avl.removeAndBalance(11);
avl.removeAndBalance(2);
avl.removeAndBalance(9);
avl.removeAndBalance(3);
avl.removeAndBalance(4);
avl.removeAndBalance(7);
avl.removeAndBalance(21);
avl.print(TRAVERSAL.INORDER);
*/

/*
// test case 4 OK
avl.insertAndBalance(90);
avl.insertAndBalance(80);
avl.insertAndBalance(200);
avl.insertAndBalance(70);
avl.insertAndBalance(100);
avl.insertAndBalance(300);
avl.insertAndBalance(95);
avl.insertAndBalance(310);
avl.insertAndBalance(110);
avl.insertAndBalance(305);
avl.print(TRAVERSAL.INORDER);

avl.removeAndBalance(70);
avl.removeAndBalance(310);
avl.removeAndBalance(300);
avl.removeAndBalance(110);
avl.removeAndBalance(200);
avl.removeAndBalance(305);
avl.print(TRAVERSAL.INORDER);
*/


// TEST CASE 5
/*
avl.insertAndBalance(45);
avl.insertAndBalance(100);
avl.insertAndBalance(90);
avl.insertAndBalance(110);
avl.insertAndBalance(85);
avl.insertAndBalance(86);
avl.insertAndBalance(87);
avl.insertAndBalance(89);
avl.insertAndBalance(88);
avl.print(TRAVERSAL.INORDER);
avl.removeAndBalance(110);
avl.removeAndBalance(87);
avl.print(TRAVERSAL.INORDER);
*/
