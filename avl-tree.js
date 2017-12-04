
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

function treeNode(left, newData, newHeight, newBalance, right) {
    // this = {}
    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new treeNode');
         return new treeNode(null, newData, newHeight, newBalance, null);
    }
    // assign properties to self
    this.left = left || null;

    this.data = newData;
    this.height = newHeight;
    this.balance = newBalance;

    this.right = right || null;


    this.display = function() {
        console.log("> " +this.data + " height: " + this.height + ", balance: " + this.balance);
    };

    this.delete = function() {
      this.left = null;
      this.right = null;
      this.data = null;
    }
    // return this
}



/***************************************
  AVLTree
****************************************/
function AVLTree() {
    var head = null;
    var numOfStepsForSearch = 0;
    this.displayNumOfStepsForSearch = function() { return numOfStepsForSearch; }
    this.getRoot = function() { return head; }
    this.setRoot = function(newHead) { head = newHead; }

    /***************************************
            SEARCHING IN TREE
    ****************************************/

    // PRIVATE
    // O(n)
     function traverseSearch(number, node) {
       if (node == null) return null;
       numOfStepsForSearch++;

       if (number > node.data) {
          return traverseSearch(number, node.right);
       } else if (number < node.data ){
          return traverseSearch(number, node.left);
       } else if (number == node.data) {
          return node;
       }
     }

     // PUBLIC
     // returns you the node if found
     // null otherwise
     this.search = function(numberToFind) {
        numOfStepsForSearch = 0;
        if (head) { return traverseSearch(numberToFind, head); }
     }

     /***************************************
             BALANCE AND HEIGHT FOR WHOLE TREE
     ****************************************/

     this.updateBalanceAndHeight = function() {
          reAssignBalanceAndHeightValuesForFullTree();
     }

     function balanceIt(node) {
       if (node == null) { return -1; }
       var rightHeight = balanceIt(node.right) + 1;
       var leftHeight = balanceIt(node.left) + 1;
       node.height = (leftHeight > rightHeight) ? leftHeight : rightHeight;
       node.balance = Math.abs(leftHeight - rightHeight);
       return node.height;
     }

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

     /***************************************
             INSERTING INTO THE TREE
     ****************************************/

     function setHeightAndBalance(node) {
         node.height = getHeight(node);
         node.balance = getBalance(node);
         return node;
     }

     function maxHeight(leftHeight, rightHeight) {
         return (leftHeight > rightHeight) ? leftHeight : rightHeight;
     }

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
         console.log("anchor: " + anchor.data);
         return anchor;
     }

    function updateHeightAndBalanceForSingleNode(node) {
        var leftHeight = 0;
        if (node.left) { leftHeight = node.left.height + 1; }

        var rightHeight = 0;
        if (node.right) { rightHeight = node.right.height + 1; }

        node.height = maxHeight(leftHeight, rightHeight);
        node.balance = Math.abs(leftHeight - rightHeight);
        return node;
    }

    this.count = function(node) {
      if(node) {
        console.log("There are a total of: " + nodeCountForTree(node) + " nodes for this tree");
      }
    }

    function nodeCountForTree(node) {
        if (node == null) return 0;
        return nodeCountForTree(node.left) + nodeCountForTree(node.right) + 1;
    }


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

    function balanceTree(node) {
        node = updateHeightAndBalanceForSingleNode(node);
        return (node.balance >= 2) ? correctBalanceness(node) : node;
    }

    // PRIVATE
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


    // PUBLIC
    this.insert = function(number) {

        if (head == null) {
            console.log("(+) Inserted node: " + number);
            head = new treeNode(null, number, 0, 0, null);
        }
        else {
            if (number > head.data) {
                head.right = traverseInsertion(number, head.right);
            }
            else {
                head.left = traverseInsertion(number, head.left);
            }
            head = balanceTree(head);

            console.log("!! Anytime you do rotation in the tree AFTER AN INSERTION, you must update balance and height of WHOLE tree !!");
            updateBalanceAndHeightValuesForTree(head);
            checkForBalanceness(head);
            return head;
        }
    };

    this.checkBalance = function() {
      return checkForBalanceness(head);
    }
    /***************************************
            DEPTH FIRST SEARCH PRINTING
    ****************************************/

    // PRIVATE
    function inOrderPrint(node) {
        if (node == null) return;
        inOrderPrint(node.left);
        if (head == node) {
          console.log("===============  HEAD  ==================");
        }
        node.display();
        if (head == node) {
          console.log("=============================================")
        }
        inOrderPrint(node.right);
    }

    // PUBLIC
    this.print = function(traversalType) {
        console.log("--------------------------------  TREE DISPLAY  --------------------------------");
        if (head) {
          switch (traversalType) {
              case TRAVERSAL.INORDER: inOrderPrint(head);
              break;
            default:
          }
        } else {
          console.log("Tree is currently empty.")
        }
    };



    /***************************************
            BALANCENESS OF A TREE
    ***************************************/

    // PRIVATE
    // will send 'false' to callback for any unbalanceness

    function countBalance(node, balancedCallBack) {
        if (node == null) { return -1; }
            var leftCount = 1 + countBalance(node.left, balancedCallBack);
            var rightCount = 1 + countBalance(node.right, balancedCallBack);
            if (Math.abs(leftCount-rightCount) > 1) {
              balancedCallBack(false, node);
            }
            return (leftCount >= rightCount) ? leftCount : rightCount;
    }

    // PUBLIC
    // Checks to see if an unbalanceness exist in the tree
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



    /***************************************
            REMOVING FROM THE TREE
    ***************************************/

    // PUBLIC
    // if we're removing the root, we take care of it here.
    // if we remove from anywhere else, we use traverseRemove
    this.remove = function(number) {
      console.log("---------- Let's remove: " + number + " -----------------");

      if (head) {
          if (head.data == number && rightChildOnly(head)) {
              var temp = head; head = head.right; temp.delete();
              return head;
          }
          else if (head.data == number && leftChildOnly(head)) {
              var temp = head; head = head.left; temp.delete();
              return head;
          }
          else if (head.data == number && noChildren(head)) {
              head.delete(); head = null;
              return head;
          }
          return traverseRemove(number, head);
      } else {
        console.log("Empty tree. Nothing to remove");
      }
    };

    //PRIVATE
    // Finds the minimum of sub-tree and delete it
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

    //PRIVATE UTILITY FOR CHECKING NODE'S CHILDREN EXISTENCE

    function noChildren(node) {
        return (node.left == null && node.right == null);
    }
    function leftChildOnly(node) {
        return (node.left != null && node.right == null);
    }
    function rightChildOnly(node) {
      return (node.left == null && node.right != null);
    }
    function bothChildExist(node) {
      return (node.left != null && node.right != null);
    }

    // PUBLIC
    //
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

    function findBadNode(node, nodeParent, callBack) {
      if (node == null) return;
      if (node.balance >= 2) { callBack(node, nodeParent); }
      findBadNode(node.left, node, callBack);
      findBadNode(node.right, node, callBack);
    }

    // when we remove ANY nodes, the height and balance of WHOLE TREE MUST BE RE-EVALUATED
    this.removeAndBalance = function (value) {

      node = this.remove(value);

      if (node == null) {
          console.log("TREE EMPTY NOW. NOTHING to rebalance or fix");
          return;
      }
      console.log("◊ After removing value: " + value + ", let's update balance and height");
      updateBalanceAndHeightValuesForTree(node); // THIS IS NEEDED
      this.print(TRAVERSAL.INORDER);

      while (checkForBalanceness(node) == false) { // while its un balanced, we find bad node.
          findBadNode(node, null, function(badNode, parentNode) {
              console.log("(X) FOUND BAD NODE AT: " + badNode.data);

              var anchorToUpdateBalanceAndHeight = null;
              if (parentNode) {
                  console.log("nodeParent exists, PARENT NODE IS: " + parentNode.data);
                  if (parentNode.left === badNode) {
                      console.log(parentNode.data + " left points to " + badNode.data);
                      parentNode.left = balanceTree(badNode);
                      anchorToUpdateBalanceAndHeight = parentNode.left;
                  }
                  else {
                      parentNode.right = balanceTree(badNode);
                      anchorToUpdateBalanceAndHeight = parentNode.right;
                  }

              } else { // nodeParent does not exist, which means we are at ROOT!
                  console.log("No nodeParent, (X) FOUND BAD NODE AT: " + badNode.data);
                  head = balanceTree(badNode);
                  anchorToUpdateBalanceAndHeight = head;
              }

              console.log("!! Anytime you do rotation in the tree AFTER A REMOVAL, you must update balance and height of WHOLE tree !!");
              updateBalanceAndHeightValuesForTree(head);
              checkForBalanceness(head);
          }); // findBadNode

      } // while

    } //removeAndBalance
}


/*
function Rabbit() {
  console.log("Constructor for Rabbit");
  this.name = "Bugs";
  console.log("name is: " + this.name);
  console.log("construction ends");
}
var eating = { eats: true };

Rabbit.prototype = eating;

var rabbit = new Rabbit();

console.log("--Object.getPrototypeOf(rabbit)--");
console.log(Object.getPrototypeOf(rabbit));
console.log("--Rabbit.prototype--");
console.log(Rabbit.prototype);

console.log("--rabbit.constructor--");
console.log(rabbit.constructor);


console.log("....Rabbit.prototype sets to empty object...");
var empty = {};
Rabbit.prototype = empty;

console.log(rabbit.eats); // true

var rabbit2 = new Rabbit();
console.log(Object.getPrototypeOf(rabbit2));
*/


//AVLTree.CreateObject = function() { return new AVLTree(); }
//var avl = AVLTree.CreateObject();

/*
// test case 1 OK
avl.insert(5);
avl.insert(2);
avl.insert(8);
avl.insert(1);
avl.insert(3);
avl.insert(7);
avl.insert(10);
avl.insert(4);
avl.insert(6);
avl.insert(9);
avl.insert(11);
avl.insert(12);
avl.print(TRAVERSAL.INORDER);

avl.removeAndBalance(5);
avl.print(TRAVERSAL.INORDER);
*/


/*
// test case 2
avl.insert(6);
avl.insert(2);
avl.insert(9);
avl.insert(1);
avl.insert(4);
avl.insert(8);
avl.insert(11);
avl.insert(3);
avl.insert(5);
avl.insert(7);
avl.insert(10);
avl.insert(13);
avl.insert(14);
avl.print(TRAVERSAL.INORDER);
avl.removeAndBalance(1);
avl.print(TRAVERSAL.INORDER);
*/



// test case 3
/*
avl.insert(20);
avl.insert(4);
avl.insert(26);
avl.insert(3);
avl.insert(9);
avl.insert(21);
avl.insert(30);
avl.insert(2);
avl.insert(7);
avl.insert(11);
avl.insert(15);
avl.removeAndBalance(30);
avl.removeAndBalance(20);
avl.removeAndBalance(15);
avl.removeAndBalance(26);
avl.removeAndBalance(11);
//
avl.removeAndBalance(2);
avl.removeAndBalance(9);
avl.removeAndBalance(3);
avl.removeAndBalance(4);
avl.removeAndBalance(7);
avl.removeAndBalance(21);
avl.print(TRAVERSAL.INORDER);
*/

/*
// test case 4
avl.insert(90);
avl.insert(80);
avl.insert(200);
avl.insert(70);
avl.insert(100);
avl.insert(300);
avl.insert(95);
avl.insert(310);
avl.insert(110);
avl.insert(305);avl.print(TRAVERSAL.INORDER);
avl.removeAndBalance(70);
avl.removeAndBalance(310);
avl.removeAndBalance(300);
avl.removeAndBalance(110);
avl.removeAndBalance(200);
avl.removeAndBalance(305);
avl.print(TRAVERSAL.INORDER);
*/

/*
// TEST CASE 5

avl.insert(45);
avl.insert(100);
avl.insert(90);
avl.insert(110);
avl.insert(85);
avl.insert(86);
avl.insert(87);
avl.insert(89);
avl.insert(88);
avl.print(TRAVERSAL.INORDER);
avl.removeAndBalance(110);
avl.print(TRAVERSAL.INORDER);
*/
