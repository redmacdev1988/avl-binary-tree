
const NODE_VALUE_FLAG = 'NodeData';

// change Attributes to generic class
export class NodeData<T> {
    constructor(private value: T) {

    }
  
    get = <K extends keyof T>(key: K): T[K] => {
        console.log(NODE_VALUE_FLAG, `get, key ${key} value ${this.value[key]}`);
        return this.value[key];
    };
  
    set(update: T): void {
        console.log(NODE_VALUE_FLAG, 'set')
        Object.assign(this.value, update);
    }
  
    // returns the data object, which houses all properties
    print(): void {
      console.log(NODE_VALUE_FLAG, 'print');
    }
}