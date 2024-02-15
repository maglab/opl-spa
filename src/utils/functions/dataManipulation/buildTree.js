class Tree {
  constructor(objArray) {
    this.objArray = objArray;
    this.nodes = []; // to store the tree nodes (roots)
    this.buildTree(); // build the tree upon instantiation
  }

  buildTree() {
    const map = {};
    let node;
    const roots = [];

    this.objArray.forEach((node, index) => {
      node.children = [];
      map[node.id] = index;
    });

    this.objArray.forEach((node) => {
      if (node.parent !== null) {
        if (this.objArray[map[node.parent]]) {
          this.objArray[map[node.parent]].children.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    this.nodes = roots;
  }

  flattenTree() {
    const result = [];
    const recurse = (nodeArray) => {
      nodeArray.forEach((node) => {
        result.push(node);
        if (node.children && node.children.length > 0) {
          recurse(node.children); // calling the local function for recursion
        }
      });
    };
    recurse(this.nodes);
    return result;
  }
}

export function isHierarchical(objArray) {
  return objArray.some((obj) => obj.parent !== null);
}

export function buildHierarchicalTree(menuItems) {
  const treeBuilder = new Tree(menuItems);
  const flattenedTree = treeBuilder.flattenTree();
  return flattenedTree.filter((item) => item.parent === null);
}

export default Tree;
