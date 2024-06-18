import { buildTree, prettyPrint } from "./functions.js";
import { Tree } from "./classes.js";

const bstRoot = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(bstRoot);

let newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(newTree.root);

newTree.rebalance();

newTree.levelOrder();

newTree.levelOrderRecursive();

newTree.height(8);

newTree.depth(9);

newTree.isBalanced();

newTree.inOrder();

newTree.insert(2);
prettyPrint(newTree.root);

newTree.rebalance();

// TIAT STEP #1
// TIAT STEP #2
// TIAT STEP #3
// TIAT STEP #4
// TIAT STEP #5
// TIAT STEP #6
// TIAT STEP #7
// TIAT STEP #8

// newTree.preOrder();

// newTree.postOrder();

// newTree.delete(8);
// prettyPrint(newTree.root);

// newTree.delete(20);
// prettyPrint(newTree.root);

// newTree.find(4);
// prettyPrint(newTree.root);
