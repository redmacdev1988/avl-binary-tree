
const NODE_VALUE_FLAG = 'NodeData';

// change Attributes to generic class
export class NodeData<T> {
    constructor(private value: T) {

    }
  
    get = <K extends keyof T>(key: K): T[K] => {
        return this.value[key];
    };
  
    set(update: T): void {
        Object.assign(this.value, update);
    }
  
    // returns the data object, which houses all properties
    print(): void {}
}