"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeData = void 0;
const NODE_VALUE_FLAG = 'NodeData';
// change Attributes to generic class
class NodeData {
    constructor(value) {
        this.value = value;
        this.get = (key) => {
            return this.value[key];
        };
    }
    set(update) {
        Object.assign(this.value, update);
    }
    // returns the data object, which houses all properties
    print() { }
}
exports.NodeData = NodeData;
//# sourceMappingURL=NodeData.js.map