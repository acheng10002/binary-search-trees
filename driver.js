import { prettyPrint } from "./functions.js";
import { Tree } from "./classes.js";

function generateRandomArray(size) {
  // TIAT STEP #1 - creates a BST from an array of random #s < 100
  const randomNumbers = [];
  for (let i = 0; i < size; i++) {
    /* generates a random number less than 100 
          Math.random() generates a floating-point random number in range 0 = 1 
          Math.floor() rounds a number down to nearest integer */
    const randomNumber = Math.floor(Math.random() * 100);
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
}

let randomArray1 = generateRandomArray(13);

// TIAT STEP #1
let randomBST1 = new Tree(randomArray1);
prettyPrint(randomBST1.root);

// TIAT STEP #2 - confirm that the tree is balanced
randomBST1.isBalanced();

// TIAT STEP #3 - print out all elements in level, pre, post, and in order
randomBST1.levelOrder();
randomBST1.preOrder();
randomBST1.postOrder();
randomBST1.inOrder();

// TIAT STEP #4 - unbalance the tree by adding several numbers > 100
for (let i = 0; i < 10; i++) {
  let randomNumber = Math.floor(Math.random() * 100);
  randomBST1.insert(randomNumber);
}

// TIAT STEP #5 - confirm that the tree is unbalanced
randomBST1.isBalanced();

// console.log(randomBST1);

// TIAT STEP #6 - balance the tree
randomBST1.rebalance();

// TIAT STEP #7 - confirm that the tree is balanced
randomBST1.isBalanced();

// TIAT STEP #8 - print out all elements in level, pre, post, and in order
randomBST1.levelOrder();
randomBST1.preOrder();
randomBST1.postOrder();
randomBST1.inOrder();
