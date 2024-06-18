import { buildTree, prettyPrint } from "./functions.js";
import { Node, Tree } from "./classes.js";

// PROJECT STEP #1 - data, left, and right attributes
let node = new Node(10);

console.log(node);

// PROJECT STEP #2 - accepts an array when initialized; has root att which uses the return value of buildTree
let newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(newTree.root);

// PROJECT STEP #3 - takes an array of data and turns it into a balanced BST, returns the level-0 root node
const bstRoot = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(bstRoot);

// PROJECT STEP #5 - returns the node with the given value
newTree.find(4);
prettyPrint(newTree.root);

// PROJECT STEP #6 - accepts an option callback, traverse the tree in breadth-first level order and provide each node as an argument to the callback
newTree.levelOrder();

// PROJECT STEP #7 - accepts optional callback and does a in-order traversal
newTree.inOrder();

// PROJECT STEP #7 - accepts optional callback and does a pre-order traversal
newTree.preOrder();

// PROJECT STEP #7 - accepts optional callback and does a post-order traversal
newTree.postOrder();

// PROJECT STEP #8 - returns the given node's height
newTree.height(4);

// PROJECT STEP #9 - returns the given node's depth
newTree.depth(5);

// PROJECT STEP #10 - checks if the tree is balanced
newTree.isBalanced();

// PROJECT STEP #4 - inserts given value into the balanced BST
newTree.insert(42);

newTree.insert(53);

newTree.insert(60);

newTree.insert(71);

newTree.insert(5600);

newTree.isBalanced();

// PROJECT STEP #11 - rebalances an unbalanced tree
newTree.rebalance();

newTree.isBalanced();

// PROJECT STEP #4 - deletes given value from the balanced BST
newTree.delete(60);
prettyPrint(newTree.root);

newTree.delete(3);
prettyPrint(newTree.root);
