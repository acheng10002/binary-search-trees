import { buildTree, prettyPrint } from "./functions.js";
import { Tree } from "./classes.js";

const bstRoot = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(bstRoot);

let newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(newTree.root);

newTree.insert(2);
prettyPrint(newTree.root);

newTree.levelOrder();

newTree.delete(8);
prettyPrint(newTree.root);

newTree.delete(20);
prettyPrint(newTree.root);

newTree.find(4);
prettyPrint(newTree.root);
