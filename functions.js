import { Node } from "./classes.js";

// sorts an array
function mergeSort(arr) {
  // if the array has 0 or 1 elements, it's already sorted, so return it
  if (arr.length <= 1) {
    return arr;
  }
  // gets the middle index of the array
  const mid = Math.floor(arr.length / 2);

  // extracts the left half of the array into a new left subarray
  const leftSubArr = arr.slice(0, mid);

  // extracts the right half of the array into a new right subarray
  const rightSubArr = arr.slice(mid);

  // recursively sorts the subarrays
  const sortedLeftSubArr = mergeSort(leftSubArr);
  const sortedRightSubArr = mergeSort(rightSubArr);

  // merges the sorted subarrays
  return merge(sortedLeftSubArr, sortedRightSubArr);
}

// merges arrays
function merge(leftSubArr, rightSubArr) {
  // initializes an empty array, an index for the left subarray, and an index for the right subarray
  let mergedArr = [];
  let i = 0;
  let j = 0;

  // as long as the subarrays' indexes are less than the subarrays' lengths
  while (i < leftSubArr.length && j < rightSubArr.length) {
    // if the current element in the left subarray is less than the current element in the right subarray
    if (leftSubArr[i] < rightSubArr[j]) {
      if (
        // checks if the current element in the left subarray is a duplicate of the last element in mergedArr
        mergedArr.length === 0 ||
        mergedArr[mergedArr.length - 1] !== leftSubArr[i]
      ) {
        // if not, add the current length in the left subarray
        mergedArr.push(leftSubArr[i]);
      }
      i++;

      // if the current element in the left subarray is less than the current element in the right subarray
    } else if (leftSubArr[i] > rightSubArr[j]) {
      if (
        // checks if the current element in the right subarray is a duplicate of the last element in mergedArr
        mergedArr.length === 0 ||
        mergedArr[mergedArr.length - 1] !== rightSubArr[j]
      ) {
        // if not, add the current length in the right subarray
        mergedArr.push(rightSubArr[j]);
      }
      j++;
      // if both elements in the subarrays are the same, add one and skip the duplicate
    } else {
      // checks if the current element in the left subarray is a duplicate of the last element in mergedArr
      if (
        mergedArr.length === 0 ||
        mergedArr[mergedArr.length - 1] !== leftSubArr[i]
      ) {
        mergedArr.push(leftSubArr[i]);
      }
      i++;
      j++;
    }
  }

  // while there are elements left in the left subarray
  while (i < leftSubArr.length) {
    // again, checks that duplicates are not added to the merged array
    if (
      mergedArr.length === 0 ||
      mergedArr[mergedArr.length - 1] !== leftSubArr[i]
    ) {
      // adds any remaining elements from the left subarray to the merged array
      mergedArr.push(leftSubArr[i]);
    }
    i++;
  }

  // while there are elements left in the right subarray
  while (j < rightSubArr.length) {
    // again, checks that duplicates are not added to the merged array
    if (
      mergedArr.length === 0 ||
      mergedArr[mergedArr.length - 1] !== rightSubArr[j]
    ) {
      // adds any remaining elements from the right subarray to the merged array
      mergedArr.push(rightSubArr[j]);
    }
    j++;
  }

  return mergedArr;
}

// function that takes an array and turns it into a balanced BST and returns the root node
function buildTree(arr) {
  // project step #3
  let mergedArr = mergeSort(arr);

  // inner function performs recursive tree construction
  function createBST(mergedArr, start, end) {
    if (start > end) return null; // base case: subarray being processed is invalid or empty
    const mid = Math.floor((start + end) / 2); // find the middle index of the current array/subarray

    const root = new Node(mergedArr[mid]); // new Node is created with the middle element as data

    root.left = createBST(mergedArr, start, mid - 1); // recursively creates left subtree
    root.right = createBST(mergedArr, mid + 1, end); // recursively creates right subtree

    return root;
  }

  // initial call to the inner function with start and end parameters
  return createBST(mergedArr, 0, mergedArr.length - 1);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export { buildTree, prettyPrint };
