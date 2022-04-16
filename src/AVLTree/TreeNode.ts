

// 1) we describe a type NodeMustHave, which says 
// there must exist a property 'data' of type string
export interface NodeMustHave {
    data: number;
}

// 3) We describe a type DataAttributes, which 
// requires you to implement, set/print/get
// where they accept Object of type T.
// that T has no constraints.
export interface DataAttributes<T> {
    set(value: T): void;
    print(): void;
    get <K extends keyof T>(key: K): T[K];
}


// 2) Any generic type T used in class Node must conform to NodeMustHave
// This means T must have property data: string

// the data object passed into data should be NodeData, which implements get/set/print
export class TreeNode<T extends NodeMustHave> {
    constructor(private dataAttr?: DataAttributes<T>) {
        this.dataAttr?.print();
    }

    getNode(): DataAttributes<T> {
        return this.dataAttr!;
    }

    setNode(newDataAttr?:DataAttributes<T>) {
        this.dataAttr = newDataAttr;
    }

    deleteNode() {
        this.dataAttr = undefined;
        delete this.dataAttr;
    }
}

