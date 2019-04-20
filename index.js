"use strict";

var moment = require('moment');

var AVLTree = require("./avl-tree.js");
var CONSTANTS = require("./constants.js");
var avl = AVLTree.CreateObject();

/*
console.time("timer");

// moment js tests
let a = moment("12-25-1995", "MM-DD-YYYY");
let b = moment("12-26-1995", "MM-DD-YYYY");

avl.insertAndBalance(a);
avl.insertAndBalance(b);
avl.print(CONSTANTS.INORDER);
let res = avl.search(a);
console.log('found data: ' + res.data.toString());

console.timeEnd("timer");

*/


let toFind = null;

console.time("Build Array");

var jsArray = [];

for ( let i = 0; i < 10000; i++) {
    //console.time("random");
    let r = Math.random().toString(36).substring(2);
    //console.timeEnd("random");

    //console.log("inserting: ", r);
    if ( i == 6680) {
        toFind = r;
    }

    //console.time("insertAndBalance");
    //avl.insertAndBalance(r);
    jsArray.push(r);
    //console.timeEnd("insertAndBalance");
}

console.timeEnd("Build Array");

//avl.print(CONSTANTS.INORDER); // alphabetical



console.time("search for ");
let result = jsArray.findIndex(function(value){
    return value === toFind;
});
console.log('result: ' + result);
console.timeEnd("search for ");

// 1126.827ms
// 0.215 ms


/*
// TEST: alphabet sort and reverse sort 
avl.insertAndBalance('ricky');
avl.insertAndBalance('joy');
avl.insertAndBalance('james');
avl.insertAndBalance('stephen');
avl.insertAndBalance('brian');
avl.insertAndBalance('ellen');
avl.insertAndBalance('emman');
avl.insertAndBalance('alex');
//avl.print(CONSTANTS.REVERSE_PRINT); // reverse alphabetical
//avl.print(CONSTANTS.INORDER); // alphabetical
let res = avl.search('ellen');
console.log('found data: ' + res.data);
*/

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
avl.print(CONSTANTS.INORDER);

avl.removeAndBalance(1);
avl.print(CONSTANTS.INORDER);
*/

/*
// test case 2 OK
avl.insertAndBalance(6);
avl.insertAndBalance(8);
avl.insertAndBalance(10);
avl.insertAndBalance(1);
avl.insertAndBalance(4);
avl.insertAndBalance(5);
avl.print(CONSTANTS.INORDER);

avl.removeAndBalance(6);
avl.print(CONSTANTS.INORDER);
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
avl.print(CONSTANTS.INORDER);

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
avl.print(CONSTANTS.INORDER);
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
avl.print(CONSTANTS.INORDER);

avl.removeAndBalance(70);
avl.removeAndBalance(310);
avl.removeAndBalance(300);
avl.removeAndBalance(110);
avl.removeAndBalance(200);
avl.removeAndBalance(305);
avl.print(CONSTANTS.INORDER);
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
avl.print(CONSTANTS.INORDER);
avl.removeAndBalance(110);
avl.removeAndBalance(87);
avl.print(CONSTANTS.INORDER);
*/
