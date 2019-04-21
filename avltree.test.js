
var AVLTree = require("./avltree.js");
var avl = AVLTree.CreateObject();
test('empty tree', () => {
    expect(avl._head).toBe(null);
});

test('single node of 6', () => {
    avl.insert(6);
    let result = avl.searchForExactMatch(6);
    expect(result.data).toBe(6);
    expect(result.height).toBe(0);
    expect(result.balance).toBe(0);
    expect(result.left).toBe(null);
    expect(result.right).toBe(null);
});

test('rotate \\ then >', () => {
    avl.insert(8);
    avl.insert(10);
    avl.insert(12);
    avl.insert(14);
    avl.insert(9);
    expect(avl._head.data).toBe(10);
});

var b = AVLTree.CreateObject();
test('rotate >, /, <', () => {
    b.insert(6);
    b.insert(18);
    b.insert(17);
    b.insert(5);
    b.insert(4);
    b.insert(7);
    expect(b._head.data).toBe(6);
    expect(b._head.balance).toBe(0);
    expect(b._head.height).toBe(2);
});


var c = AVLTree.CreateObject();
test('deletion, rotate <', () => {
    c.insert(68);
    c.insert(30);
    c.insert(99);
    c.insert(0);
    c.insert(50);
    c.insert(110);
    c.insert(40);
    c.delete(110);
    expect(c._head.data).toBe(50);
    expect(c._head.balance).toBe(0);
    expect(c._head.height).toBe(2);
});

var d = AVLTree.CreateObject();
test('deletion, rightmost of left subtree, rotate <', () => {
    d.insert(68);
    d.insert(30);
    d.insert(99);
    d.insert(20);
    d.insert(40);
    d.insert(110);
    d.insert(25);
    d.delete(68);
    expect(d._head.data).toBe(40);
    expect(d._head.balance).toBe(0);
    expect(d._head.height).toBe(2);
});


var e = AVLTree.CreateObject();
test('deletion, leftmost of right subtree', () => {
    e.insert(68);
    e.insert(30);
    e.insert(99);
    e.insert(10);
    e.insert(88);
    e.insert(110);
    e.insert(91);
    e.delete(68);
    expect(e._head.data).toBe(88);
    expect(e._head.balance).toBe(0);
    expect(e._head.height).toBe(2);
});

var f = AVLTree.CreateObject();
test('deletion, leftmost of right subtree, rotate \\', () => {
    f.insert(68);
    f.insert(30);
    f.insert(99);
    f.insert(10);
    f.insert(71);
    f.insert(100);
    f.insert(102);

    f.delete(68);
    expect(f._head.data).toBe(71);
    expect(f._head.balance).toBe(0);
    expect(f._head.height).toBe(2);
});

var g = AVLTree.CreateObject();
test('rotate \\ \\ \\', () => {
    g.insert(50);
    g.insert(60);
    g.insert(70);
    g.insert(80);
    g.insert(90);
    g.insert(100);

    expect(g._head.data).toBe(80);
    expect(g._head.balance).toBe(0);
    expect(g._head.height).toBe(2);
});

test('auto complete, starts with e ', () => {
    g.clearWholeTree();
    expect(g._head).toBe(null);
    g.insert('m');
    g.insert('d');
    g.insert('r');
    g.insert('a');
    g.insert('em');
    g.insert('z');
    expect(g._head.data).toBe('m');

    g.insert('ea');
    g.insert('ez');
    expect(g._head.data).toBe('m');

    let arr = g.searchForAnyMatchStartingWith('e');
    expect(arr.length).toBe(3);
});

test('auto complete, starts with haha hehe hihi ', () => {
    g.clearWholeTree();
    expect(g._head).toBe(null);
    g.insert('haha');
    g.insert('hehe');
    g.insert('hihi');
    expect(g._head.data).toBe('hehe');
    expect(g.searchForAnyMatchStartingWith('h').length).toBe(3);
    g.insert('a');
    g.insert('harold');
    g.insert('z');
    expect(g.searchForAnyMatchStartingWith('h').length).toBe(4);
});
