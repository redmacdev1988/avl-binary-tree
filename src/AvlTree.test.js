
import { AVLTree } from "./AVLTree/AVLTree";

describe("AVL Tree Test #1", () => {
    const tree = new AVLTree(null, "Ricky's implementation", "AVL Tree - 4 rotations for self balancing BTree");
    test("Tree Instantiation", () => {
        expect(tree).toBeDefined();
    });

    test("Tree Insertion", () => {
        tree.insert(50);
        tree.insert(20);
        tree.insert(100);
        tree.insert(10);
        tree.insert(80);
        tree.insert(120);
        tree.insert(90);
        expect(tree.balance()).toBe(-1);
        expect(tree.height()).toBe(3);
    });

    test("Tree Deletion", () => {
        tree.remove(50, (value) => {
            expect(value).toBe(50);
            return value;
        });
    });
});

describe("AVL Tree Test #2", () => {
    const tree = new AVLTree(null, "Ricky's implementation", "AVL Tree - 4 rotations for self balancing BTree");
    test("Tree Instantiation", () => {
        expect(tree).toBeDefined();
    });

    test("Tree Insertion", () => {
        tree.insert(50);
        tree.insert(40);
        tree.insert(60);
        tree.insert(30);
        tree.insert(45);
        expect(tree.balance()).toBe(1);
        expect(tree.height()).toBe(2);
    });

    test("Tree Deletion", () => {
        tree.remove(40, (value) => {
            expect(value).toBe(40);
        });

        tree.remove(60, (value) => {
            expect(value).toBe(60);
        });

        tree.remove(30, (value) => {
            expect(value).toBe(30);
        });

        expect(tree.balance()).toBe(-1);
        expect(tree.height()).toBe(1);

        tree.remove(50, (value) => {
            expect(value).toBe(50);
        });

        tree.remove(45, (value) => {
            expect(value).toBe(45);
        });

        expect(tree.balance()).toBe(0);
        expect(tree.height()).toBe(0);
    });
});


describe("AVL Tree Test #3", () => {
    const tree = new AVLTree(null, "Ricky's implementation", "AVL Tree - 4 rotations for self balancing BTree");
    test("Tree Instantiation", () => {
        expect(tree).toBeDefined();
    });

    test("Tree Insertion", () => {
        tree.insert(50);
        tree.insert(40);
        tree.insert(60);
        tree.insert(100);
        tree.insert(30);
        tree.insert(45);
        tree.insert(42);

        expect(tree.balance()).toBe(1);
        expect(tree.height()).toBe(3);

        tree.remove(50, (value) => {
            expect(value).toBe(50);
            return value;
        });
        tree.remove(tree.rootValue(), (value) => {
            expect(value).toBe(45);
            return value
        });
        tree.remove(tree.rootValue(), (value) => {
            expect(value).toBe(42);
            return value
        });
        tree.remove(tree.rootValue(), (value) => {
            expect(value).toBe(40);
            return value
        });
        tree.remove(tree.rootValue(), (value) => {
            expect(value).toBe(60);
            return value
        });
        tree.remove(tree.rootValue(), (value) => {
            expect(value).toBe(30);
            return value
        });
        tree.remove(tree.rootValue(), (value) => {
            expect(value).toBe(100);
            return value
        });
        tree.remove(tree.rootValue(), (value) => {
            expect(value).toBeUndefined();
            return value
        });

        expect(tree.balance()).toBe(0);
        expect(tree.height()).toBe(0);
    });
});


describe("AVL Tree Test #4", () => {
    const tree = new AVLTree(null, "Ricky's implementation", "AVL Tree - 4 rotations for self balancing BTree");
    test("Tree Instantiation", () => {
        expect(tree).toBeDefined();
    });

    test("deletion, leftmost of right subtree", () => {
        tree.insert(68);
        tree.insert(30);
        tree.insert(99);
        tree.insert(10);
        tree.insert(88);
        tree.insert(110);
        tree.insert(91);
        tree.remove(68, (value) => {
            return value
        });
        expect(tree.balance()).toBe(0);
        expect(tree.height()).toBe(2);
        expect(tree.rootValue()).toBe(88);
    });
});


describe("AVL Tree Test #5", () => {
    const tree = new AVLTree(null, "Ricky's implementation", "AVL Tree - 4 rotations for self balancing BTree");
    test("Tree Instantiation", () => {
        expect(tree).toBeDefined();
    });

    test("deletion, leftmost of right subtree, rotate \\", () => {
        tree.insert(68);
        tree.insert(30);
        tree.insert(99);
        tree.insert(10);
        tree.insert(71);
        tree.insert(100);
        tree.insert(102);
        tree.remove(68, (value) => {
            return value
        });
        expect(tree.rootValue()).toBe(71);
        expect(tree.balance()).toBe(0);
        expect(tree.height()).toBe(2);
    });
});

describe("AVL Tree Test #6", () => {
    const tree = new AVLTree(null, "Ricky's implementation", "AVL Tree - 4 rotations for self balancing BTree");
    test("Tree Instantiation", () => {
        expect(tree).toBeDefined();
    });

    test("rotate \\ \\ \\", () => {
        tree.insert(50);
        tree.insert(60);
        tree.insert(70);
        tree.insert(80);
        tree.insert(90);
        tree.insert(100);
       
        expect(tree.rootValue()).toBe(70);
        expect(tree.balance()).toBe(0);
        expect(tree.height()).toBe(2);
    });
});

describe("AVL Tree Test #7", () => {
    const tree = new AVLTree(null, "Ricky's implementation", "AVL Tree - 4 rotations for self balancing BTree");
    test("Tree Instantiation", () => {
        expect(tree).toBeDefined();
    });

    test("deletion, rightmost of left subtree, rotate <", () => {
        tree.insert(68);
        tree.insert(30);
        tree.insert(99);
        tree.insert(20);
        tree.insert(40);
        tree.insert(110);
        tree.insert(25);
        tree.remove(68, (value) => {
            return value;
        });
       
        expect(tree.rootValue()).toBe(40);
        expect(tree.balance()).toBe(0);
        expect(tree.height()).toBe(2);
    });
});


describe("AVL Tree Test #8", () => {
    const tree = new AVLTree(null, "Ricky's implementation", "AVL Tree - 4 rotations for self balancing BTree");
    test("Tree Instantiation", () => {
        expect(tree).toBeDefined();
    });

    test("Insertion >, /, <", () => {
        tree.insert(6);
        tree.insert(18);
        tree.insert(17);
        tree.insert(5);
        tree.insert(4);
        tree.insert(7);
       
        expect(tree.rootValue()).toBe(6);
        expect(tree.balance()).toBe(0);
        expect(tree.height()).toBe(2);
    });
});
