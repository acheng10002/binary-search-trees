/* binary search trees - take a group of data items and turn them into a tree full of nodes
                         each left node being lesser than the parent and the right node 
                         the right node being greater than the parent and left node
                         so everything to the left of the root is less than the root
                         everything to the right of the root is greater than the root
                         starts with the root node 
                         any node with no children is called a leaf node
                         must be no duplicate nodes ( if I do, must follow a consistence process of
                         either storing duplicate values at the left or storing them at the right)
  tree traversal algorithms - breadth-first and depth-first
  balanced binary search trees - because of hierarchical structure, allow fast operations for lookup, 
                                 insertion, and deletion of data items
 1. Searching a node
    1. First, compare the element to be searched with the root element of the tree.
       If root is matched with the target element, then return the node’s location.
       If it is not matched, then check whether the item is less than the root element, if it is smaller than the root element, then move to the left subtree.
       If it is larger than the root element, then move to the right subtree.
    2. Repeat the above procedure recursively until the match is found.
    3. If the element is not found or not present in the tree, then return NULL.
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// utility function to search a key in a BST
function search(root, data) {
  // bases cases: root is null or key is present at root
  if (root === null || root.data === data) {
    return root;
  }

  // key is greater than root's key
  if (root.data < data) {
    return search(root.right, data);
  }

  // key is smaller than root's key
  return search(root.left, data);
}

/*
 2. Insert a node
    A new key is always inserted at the leaf. 
    Start searching a key from the root till a leaf node. 
    Once a leaf node is found, the new node is added as a child of the leaf node.
 */
// a utility function to insert a new node with given key in BST
function insert(node, data) {
  // if the tree is empty, return a new node
  if (node === null) {
    return new Node(data);
  }

  // otherwise, recur down the tree
  if (data < node.data) {
    node.left = insert(node.left, data);
  } else if (data > node.data) {
    node.right = insert(node.right, data);
  }

  // return the (unchanged) node pointer
  return node;
}
/* 
 3. Delete a node
    case A: node to be deleted is a leaf node - simply null it out
    case B: node to be deleted has one child - replace the node with the child node
    case C: node to be deleted has two children - I have to delete the node is such a way, 
                                                  that the resulting tree follows the properties 
                                                  of a BST.  The trick is to find the inorder successor 
                                                  of the node (smallest node in its right subtree). 
                                                  Copy contents of the inorder successor to the node, 
                                                  and delete the inorder successor.

When deleting a node of a BST:
- Need to figure out what will be the replacement of the node to be deleted.
- Want minimal disruption to the existing tree structure
- Can take the replacement node from the deleted nodes left or right subtree.
- If taking if from the left subtree, we have to take the largest value in the left subtree.
- If taking if from the right subtree, we have to take the smallest value in the right subtree.
 */

// utility function to find the minimum value node in the given tree
function minValueNode(node) {
  let minValue = node.data;

  // loop down to find the leftmost left
  while (node.left != null) {
    minValue = node.left.data;
    node = node.left;
  }
  return minValue;
}

// utility function to delete the node with given key in BST
function deleteNode(root, data) {
  // base case: if the tree is empty, return null
  if (root === null) {
    return root;
  }

  /* recur down the tree- if the key to be deleted is smaller than the root's key 
    then it lies in the left subtree */
  if (data < root.data) {
    root.left = deleteNode(root.left, data);

    /* recur down the tree- if the key to be deleted is greater than the root's key 
    then it lies in the right subtree */
  } else if (data > root.data) {
    root.right = deleteNode(root.right, data);

    // if the key is the same as root's key, then delete this node
  } else {
    /* node with only one child - return the non-null child
        or no child */
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }

    // node with two children: get the in-order successor (smallest in the right subtree)
    root.data = minValueNode(root.right);

    // copy the in-order successor's content to this node; replace the root's key with the in-order successor's key

    // delete the in-order successor recursively from the right subtree
    root.right = deleteNode(root.right, root.data);
  }

  return root;
}
/*
 4. Inorder traversal of BST
    1. Traverse the left subtree.
    2. Visit the root node.
    3. Traverse the right subtree.  
*/

/* result array is passed as an argument to accumulate the keys during the traversal
this ensures that the keys are collected in ascending order 
function then returns the result array containing the keys of the BST in sorted order */
function inorderTraversal(root, result = []) {
  // base case: if the current node is null, return without doing anything
  if (root != null) {
    // traverse the left subtree
    inorderTraversal(root.left, result);

    // visit the root node and add its key to the result array
    result.push(root.data);

    // traverse the right subtree
    inorderTraversal(root.right, result);
  }
  return result;
}

/* Sorted Array to Balanced BST by Finding the middle element
- find the middle element of the array and make it the root of the tree
- perform the same operation on the left subarray for the root's left child
  recursively get the middle of the left half and make it the left child of the root
- perform the same operation on the right subarray for the root's right child
  recursively get the middle of the right hald and make ir the right child of the root
- print the preorder of the tree
*/

function createBST(arr, start, end) {
  if (start > end) return null; // base case: subarray being processed is invalid or empty

  const mid = Math.floor((start + end) / 2); // find the middle index of the current array/subarray
  const root = new Node(arr[mid]); // new Node is created with the middle element as data

  root.left = createBST(arr, start, mid - 1); // recursively creates left subtree
  root.right = createBST(arr, mid + 1, end); // recursively creates right subtree

  return root;
}

/* Since I am calling createBST recursively, I store function states in a call stack, so that
when execution of call for left subarray returns, I can resume execution for current function. */

const sortedArray = [1, 2, 3, 4, 5, 6, 7];
const bstRoot = createBST(sortedArray, 0, sortedArray.length - 1);

console.log(bstRoot);

deleteNode(bstRoot, 2);
console.log(bstRoot);

let root = null;

function sortedArrayToBST(arr, start, end) {
  // base case
  if (start > end) {
    return null;
  }

  // get the middle element and make it the root
  let mid = parseInt((start + end) / 2);
  let node = new Node(arr[mid]);

  // recursively construct the left subtree and make it left child of the root
  node.left = sortedArrayToBST(arr, start, mid - 1);

  // recursively construct the right subtree and make it the right child of the root
  node.right = sortedArrayToBST(arr, mid + 1, end);
  return node;
}

// utility function to print preorder traversal of BST
function preOrder(node) {
  // if tree is either empty or the function has reached a leaf node's child
  if (node == null) {
    // returns, ends current call, and backtracks to previous node in the call stack
    return;
  }
  console.log(node.data + " ");
  preOrder(node.left);
  preOrder(node.right);
}

let arr = [1, 2, 3, 4, 5, 6, 7];
let n = arr.length;
root = sortedArrayToBST(arr, 0, n - 1);
console.log("Preorder traversal of constructed BST:");
preOrder(root); // 4 / 2 / 1 / 3 / 6 / 5 / 7

/* First initialize a queue with root node and loop until the queue is empty.
Remove first node from the queue and find mid element of the sorted array.
Create new node with previously find middle node 
and set left child to the dequeue node left child if present and 
also set the right child with dequeue node right child. 
Enqueue the new node onto the queue. 
Set the right child of the dequeued node to the middle element on the left side of the sorted array. 
If the dequeued node has a left child, enqueue it onto the queue. Return the root node.


constructs a balanced BST from a sorted array using in iterative approach with a queue 
it processes each subarray iteratively, creating nodes and attaching them as children to their respective parent nodes */
function sortedArrayToBSTIteratively(nums) {
  // if the array is empty, return null
  if (nums.length === 0) {
    return null;
  }

  // calculates the middle index of the array
  const mid = Math.floor(nums.length / 2);

  // creates a new Node with the value at the middle index, this node becomes the root of the BST
  const root = new Node(nums[mid]);

  // initializes queue with two elements
  const q = [
    // first element is a pair, representing the left subtree of the root
    [root, [0, mid - 1]],

    // second element is a pair, representing the right subtree of the root
    [root, [mid + 1, nums.length - 1]],

    /* each element in the queue is a tuple where the first part is a parent node and the
       second part is a range (subarray indices) that needs to be processed to build the subtree 
    */
  ];

  // while loop that continues as long as the queue q is not empty
  while (q.length > 0) {
    /* dequeues the first element from the queue q using shift() and destructures it into 
       parent (the current parent node) and [left, right] (indices of the current subarray to be processed) */
    const [parent, [left, right]] = q.shift();

    // if there are elements to process/still elements in the subarray and parent node is not null
    if (left <= right && parent != null) {
      // calculates the middle index of the current subarray and creates a new Node with the value at the middle index
      const mid = Math.floor((left + right) / 2);

      // this node becomes the child node to be attached to the parent
      const child = new Node(nums[mid]);

      // checks if the child node's key is less than the parent's key
      if (nums[mid] < parent.data) {
        // if it is, it attaches as the left child of the parent
        parent.left = child;
      } else {
        // otherwise, it attaches as the right child
        parent.right = child;
      }

      // enqueues two new elements to the queue q for further processing
      // enqueues the left subarray of the current child node
      q.push([child, [left, mid - 1]]);

      // enquques the right subarray of the current child node
      q.push([child, [mid + 1, right]]);
    }
  }
  return root;
}

// function to print the preorder traversal of the constructed BST
function printBST(root) {
  if (root === null) {
    return;
  }
  console.log(root.data + " ");
  printBST(root.left);
  printBST(root.right);
}

const nums = [1, 2, 3, 4, 5, 6, 7];
const root1 = sortedArrayToBSTIteratively(nums);
printBST(root); // 4 / 2 / 1 / 3 / 6 / 5 / 7

/* Algorithm
1. Initialize: start = 0
               end = length of the array - 1
2. mid = (start + end) / 2
3. Create a tree node with mid as root, call it A.
4. Recursively do the following steps:
5. Calculate mid of left subarray and make it root of the left subtree of A.
6. Calculate mid of right subarray and make it root of the right subtree of A.

private static TreeNode createBST(int[] array, int start, int end) {
    if (start > end) return null;
    int mid = (start + end) / 2;
    TreeNode root = newTreeNode(array[mid]);

    root.setLeft(createBST(array, start, mid - 1));
    root.setRight(createBST(array, mid + 1, end));

    return root;
} 
*/
