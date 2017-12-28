"use strict";

var AVLTree = require("./avl-tree.js");
var CONSTANTS = require("./constants.js");

// var avl = AVLTree.CreateObject();

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
