'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

var AVLTree = require("../avl-tree.js");
var CONSTANTS = require("../constants.js");

describe('AVL tree test 1', function() {

  // GET - List all colors
  it('insert [5 2 8 1 3 7 10 4 6 9 11 12]', function() {
    var avl = AVLTree.CreateObject();

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

    expect(avl.getHead().data).to.equal(5);
    expect(avl.getHead().balance).to.equal(1);
    expect(avl.getHead().height).to.equal(4);
    expect(avl.search(10).data).to.equal(10);
    expect(avl.search(10).balance).to.equal(1);
    expect(avl.search(10).height).to.equal(2);
    expect(avl.search(2).data).to.equal(2);
    expect(avl.search(2).balance).to.equal(1);
    expect(avl.search(2).height).to.equal(2);
    expect(avl.search(12).data).to.equal(12);
    expect(avl.search(12).balance).to.equal(0);
    expect(avl.search(12).height).to.equal(0);
    expect(avl.search(88)).to.not.exist;

  });
});

  describe('AVL tree test 2', function() {

    var avl = AVLTree.CreateObject();

    it('insert [6 2 9 1 4 8 11 3 5 7 10 13 14]', function() {

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

      expect(avl.getHead().data).to.equal(6);
      expect(avl.getHead().balance).to.equal(1);
      expect(avl.getHead().height).to.equal(4);

    });

    it('remove 5, 3', function() {
      avl.removeAndBalance(5);
      avl.removeAndBalance(3);

      expect(avl.getHead().data).to.equal(9);
      expect(avl.getHead().balance).to.equal(0);
      expect(avl.getHead().height).to.equal(3);
      expect(avl.search(5)).to.not.exist;
      expect(avl.search(3)).to.not.exist;
      expect(avl.search(14).data).to.equal(14);
      expect(avl.search(14).balance).to.equal(0);
      expect(avl.search(14).height).to.equal(0);
      expect(avl.search(6).data).to.equal(6);
      expect(avl.search(6).balance).to.equal(0);
      expect(avl.search(6).height).to.equal(2);
    });
  });

  describe('AVL tree test 3', function() {

    var avl = AVLTree.CreateObject();

    it('insert [20 4 26 3 9 21 30 2 7 11 15]', function() {

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

      expect(avl.getHead().data).to.equal(9);
      expect(avl.getHead().balance).to.equal(0);
      expect(avl.getHead().height).to.equal(3);

    });

    it('remove all', function() {
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

      expect(avl.getHead()).to.not.exist;

    });

  });



  describe('AVL tree test 4', function() {

    var avl = AVLTree.CreateObject();

    it('insert [90 80 200 70 100 300 95 310 110 305]', function() {

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

      expect(avl.getHead().data).to.equal(90);
      expect(avl.getHead().balance).to.equal(1);
      expect(avl.getHead().height).to.equal(3);

    });

    it('remove 70, 310, 300, 110, 200, 305', function() {
      avl.removeAndBalance(70);
      avl.removeAndBalance(310);
      avl.removeAndBalance(300);
      avl.removeAndBalance(110);
      avl.removeAndBalance(200);
      avl.removeAndBalance(305);

      expect(avl.getHead().data).to.equal(95);
      expect(avl.getHead().balance).to.equal(1);
      expect(avl.getHead().height).to.equal(2);

    });
    
  });



  describe('AVL tree test 5', function() {

    var avl = AVLTree.CreateObject();

    it('insert [45 100 90 110 85 86 89 88]', function() {

      avl.insertAndBalance(45);
      avl.insertAndBalance(100);
      avl.insertAndBalance(90);
      avl.insertAndBalance(110);
      avl.insertAndBalance(85);
      avl.insertAndBalance(86);
      avl.insertAndBalance(87);
      avl.insertAndBalance(89);
      avl.insertAndBalance(88);

      expect(avl.getHead().data).to.equal(90);
      expect(avl.getHead().balance).to.equal(1);
      expect(avl.getHead().height).to.equal(3);

    });

    it('remove 110, 87', function() {
      avl.removeAndBalance(110);
      avl.removeAndBalance(87);

      expect(avl.getHead().data).to.equal(88);
      expect(avl.getHead().balance).to.equal(0);
      expect(avl.getHead().height).to.equal(2);
      expect(avl.search(87)).to.not.exist;
    });

  });
