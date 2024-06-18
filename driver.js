import { prettyPrint } from "./functions.js";
import { Tree } from "./classes.js";

function generateRandomArray(size) {
  // TIAT STEP #1
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

// TIAT STEP #2
randomBST1.isBalanced();

// TIAT STEP #3
randomBST1.levelOrder();
randomBST1.preOrder();
randomBST1.postOrder();
randomBST1.inOrder();

// TIAT STEP #4
for (let i = 0; i < 10; i++) {
  let randomNumber = Math.floor(Math.random() * 100);
  randomBST1.insert(randomNumber);
}

// TIAT STEP #5
randomBST1.isBalanced();

// console.log(randomBST1);

// TIAT STEP #6
randomBST1.rebalance();

// TIAT STEP #7
randomBST1.isBalanced();

// TIAT STEP #8
randomBST1.levelOrder();
randomBST1.preOrder();
randomBST1.postOrder();
randomBST1.inOrder();
