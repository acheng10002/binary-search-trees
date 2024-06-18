import { buildTree } from "./functions.js";

class Node {
  // PROJECT STEP #1
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  // PROJECT STEP #2
  constructor(arr) {
    this.root = buildTree(arr);
  }

  // method to insert a given value into the BST
  insert(data) {
    // PROJECT STEP #4
    this.root = this.insertNode(this.root, data);
  }

  // helper function that recursively finds the correct place to insert a new node
  insertNode(node, data) {
    // if the tree is empty, return a new node
    if (node === null) {
      return new Node(data);
    }

    // otherwise, recur down the tree
    if (data < node.data) {
      node.left = this.insertNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.insertNode(node.right, data);
    }

    // return the (unchanged) node pointer
    return node;
  }

  // method to delete a given value from the BST
  delete(data) {
    // PROJECT STEP #4
    // updates the root of the tree with the result of deleteNode
    this.root = this.deleteNode(this.root, data);
  }

  // helper function that recursively finds and delete the node with given data in BST
  deleteNode(node, data) {
    // base case: if the tree is empty, return node which will be null
    if (node === null) {
      return node;
    }

    // recur down the tree- if the data to be deleted is smaller than the node's data
    if (data < node.data) {
      // call deleteNode recursively on the left subtree
      node.left = this.deleteNode(node.left, data);

      // recur down the tree- if the data to be deleted is greater than the root's data
    } else if (data > node.data) {
      // call deleteNode recursively on the right subtree
      node.right = this.deleteNode(node.right, data);

      // if the data is the same as node's data, then delete this node
    } else {
      /* if the node has only one child - return the non-null child
            or null */
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // if the node has two children: find the in-order successor (smallest in the right subtree)
      node.data = this.minValueNode(node.right);

      // replace the node's data with the in-order successor's data and recursively delete the in-order successor
      node.right = this.deleteNode(node.right, node.data);
    }

    return node;
  }

  // helper function to find the minimum value node in a subtree
  minValueNode(node) {
    let minValue = node.data;

    // loop down to find the leftmost left
    while (node.left != null) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  }

  // method to find a given value in the BST and returns the node with it
  find(data) {
    // PROJECT STEP #5
    return (this.root = this.searchNode(this.root, data));
  }

  // helper function that recursively finds the node with given data in BST
  searchNode(node, data) {
    // if the node is empty or if the node's data matches the given data, return the node
    if (node === null || node.data === data) {
      return node;
    }

    // if the node's data is less than the given data, search in the right subtree
    if (node.data < data) {
      return searchNode(node.right, data);
    }

    // otherwise, search the left subtree
    return this.searchNode(node.left, data);
  }

  // function that takes a root node and takes an optional callback on the data in the nodes in level order callback = console.log
  levelOrder(callback = console.log) {
    // PROJECT STEP #6
    // initializes empty array that will store all node.data values
    let BSTarray = [];

    // takes care of a common case, if the tree/root is empty/null
    if (this.root === null) return;

    // creates a queue of pointer to node
    const q = [];

    // initially starts with one discovered node in the queue, the only one known to me initially is the root node
    // enqueues the address of the root node in the queue
    q.push(this.root);

    // while there is at least one discovered node/while the queue isn't empty
    while (q.length > 0) {
      // dequeues the front node and assigns it it to current
      const current = q.shift();

      // visit the node and pushes node.data into the array
      BSTarray.push(current.data);

      // push the addresses of children of this node into the queue
      // if the left child is not null, enqueue it into the queue
      if (current.left != null) q.push(current.left);

      // if the right child is not null, enqueue it into the queue
      if (current.right != null) q.push(current.right);
    }

    // logs array storing all node.data values that have been traversed in level-roder
    callback(BSTarray);
    return BSTarray;
  }

  // function that does a level order traversal, takes in a callback that defaults to console.log
  levelOrderRecursive(callback = console.log) {
    // PROJECT STEP #6
    // initializes an empty array to store nodes that needs to be processed in level order
    let queue = [];

    // initializes an empty array that stores the values of nodes visited in level order
    let result = [];

    // pushes the root node onto the queue array to start the level-order traversal
    queue.push(this.root);

    // calls helper method that actually does the traversal
    this.levelOrderRecursiveHelper(queue, result);
    callback(result);
    return result;
  }

  levelOrderRecursiveHelper(queue, result) {
    // if the queue is empty, there are no more nodes to process, so the function returns and ends the traversal
    if (queue.length === 0) return;

    // removes and returns the first node from the queue, which will initially be the root node
    let node = queue.shift();

    // visit the node and pushes node.data into the array
    result.push(node.data);

    /* if the current node has a left child, add it to the queue to be processed later 
    ensures that left children are visited before right children */
    if (node.left) {
      queue.push(node.left);
    }

    /* if the current node has a right child, add it to the queue to be processed later, 
    ensures that all nodes at the current level are processed before moving to the next level */
    if (node.right) {
      queue.push(node.right);
    }
    /* recursively calls the levelOrderRecursiveHelper method with the updated queue and results array 
    to continue the level-order traversal for the left and right subtrees of the current node */
    this.levelOrderRecursiveHelper(queue, result);
  }

  // public method that starts the in-order traversal
  inOrder(callback = console.log) {
    // PROJECT STEP #7
    // initializes an empty array to store the nodes being traversed
    let result = [];
    this.inOrderHelper(this.root, result);
    // if a callback is passed in, return the result of callback(result)
    if (callback) {
      return callback(result);

      // otherwise, just return the array created by in-order traversal
    } else {
      return result;
    }
  }

  // left subtree, root node, right subtree: recursive helper method
  inOrderHelper(node, result) {
    // base case: stops the traversal when a leaf node's child, which is null, is reached
    if (node === null) return;

    // recursive call with left child of the current node, traverses the left subtree
    this.inOrderHelper(node.left, result);

    // visit the node and pushes node.data into the array
    result.push(node.data);

    // recursive call with the right child of the current node, traverses the right subtree
    this.inOrderHelper(node.right, result);
    // }
  }

  // public method that starts the pre-order traversal
  preOrder(callback = console.log) {
    // PROJECT STEP #7
    // initializes an empty array to store the nodes being traversed
    let result = [];
    this.preOrderHelper(this.root, result);
    // logs the array;
    callback(result);
    return result;
  }

  // root node, left subtree, right subtree: recursive helper method
  preOrderHelper(node, result) {
    if (node === null) return [];

    // visit the node and pushes node.data into the array
    result.push(node.data);

    // recursive call with the left child of the current node, traverses the left subtree
    this.preOrderHelper(node.left, result);

    // recursive call with the right child of the current node, traverses the right subtree
    this.preOrderHelper(node.right, result);
  }

  preOrderIterative(callback = console.log) {
    // PROJECT STEP #7
    if (this.root === null) return [];

    // initialize an empty array to store the nodes being traversed
    let result = [];

    // initialize a stack to keep track of nodes
    let stack = [];

    // push the root node into the stack first
    stack.push(this.root);

    // process the stack until it's empty
    while (stack.length > 0) {
      // pop out the top node in the stack
      let node = stack.pop();

      // push the top node's value into the result array
      result.push(node.data);

      // if the top node has a right child, push that child into the stack
      if (node.right != null) {
        stack.push(node.right);
      }

      // if the top node has a left child, push that child into the stack
      if (node.left != null) {
        stack.push(node.left);
      }
    }

    // log and return the result array
    callback(result);
    return result;
  }

  // public method that starts the post-order traversal
  postOrder(callback = console.log) {
    // PROJECT STEP #7
    // initializes an empty array to store the nodes being traversed
    let result = [];
    this.postOrderHelper(this.root, result);
    // logs the array;
    callback(result);
    return result;
  }

  // left subtree, right subtree, root node: recursive helper method
  postOrderHelper(node, result) {
    if (node === null) return;

    // recursive call with the left child of the current node, traverses the left subtree
    this.postOrderHelper(node.left, result);

    // recursive call with the right child of the current node, traverses the right subtree
    this.postOrderHelper(node.right, result);

    // visit the node and pushes node.data into the array
    result.push(node.data);
  }

  // returns the given node's height - the number of edges in the longest path from the given node to a leaf node
  height(node) {
    // PROJECT STEP #8
    // returns the node with the given value
    this.find(node);

    // builds the tree or subtree with that node as the root node
    let treeOrSubtree = this.root;

    // calls the function that actually returns the given node's height
    let h = this.heightHelper(treeOrSubtree);

    console.log(h);

    return h;
  }

  heightHelper(node) {
    // if the node doesn't exist in the tree, return -1
    if (node === null) return -1;

    // initialize h
    let h = 0;

    // initialize the queue
    const queue = [];

    // enqueue the given node
    queue.push(node);

    // outer loop to process each level
    while (queue.length > 0) {
      // capture the size of the current level
      let levelSize = queue.length;

      // process all nodes at this level
      for (let i = 0; i < levelSize; i++) {
        // dequeue the next node at this level
        const current = queue.shift();

        // enqueue child nodes for the next level
        if (current.left != null) queue.push(current.left);
        if (current.right != null) queue.push(current.right);
      }

      /* increment height after processing all nodes at the current level
      and only do it if there are more levels to process */
      if (queue.length > 0) {
        h++;
      }
    }
    // console.log(h);
    return h;
  }

  depth(node) {
    // PROJECT STEP #9

    // checks if the tree is empty
    if (this.root === null) return;

    // initialize a stack to manage nodes during traversal
    let stack = [];

    // initialize stack with a tuple of the root node and its depth, which is 0
    stack.push({ node: this.root, depth: 0 });

    // as long as the stack has at least one node
    while (stack.length > 0) {
      // pop the top tuple off the stack
      let { node: nodeToCheck, depth: currentDepth } = stack.pop();

      // if the given given node is equal to the nodeToCheck
      if (node === nodeToCheck.data) {
        // log and return the currentDepth
        console.log(currentDepth);
        return currentDepth;
      }
      /* push children onto the stack with incremented depth values 
      depth relative to the parent node is incremented, not overall depth */
      if (nodeToCheck.right != null) {
        stack.push({ node: nodeToCheck.right, depth: currentDepth + 1 });
      }
      if (nodeToCheck.left != null) {
        stack.push({ node: nodeToCheck.left, depth: currentDepth + 1 });
      }
    }
  }

  // checks if a binary search tree is balanced with an iterative post-order traversal
  isBalanced() {
    // PROJECT STEP #10
    // an empty tree is considered balanced
    if (!this.root) return true;

    // stack to manage the nodes and heights during traversal
    let stack = [];

    // push the root node onto the stack with initial heights for left and right set to -1
    stack.push([this.root, -1, -1]);

    // loop continues until all nodes have been processed
    while (stack.length > 0) {
      // access the top element of the stack without removing it, processes the top node
      let top = stack[stack.length - 1];

      // destructure the array to get the current node and heights of its left and right subtrees
      let [node, leftHeight, rightHeight] = top;

      /* if a node has a children, these children are processed first-pushed onto the stack before 
      their parent's height is finally determined
      process the left child if leftHeight is -1 */
      if (leftHeight === -1) {
        // if the left child exists, push it into the stack with unprocessed/unknown heights
        if (node.left) {
          stack.push([node.left, -1, -1]);
        } else {
          // no left child, set left height to 0 as leaf nodes contribute 0 height
          top[1] = 0;
        }
      }
      // process the right child if rightHeight is -1
      else if (rightHeight === -1) {
        // if right child exists, push it into the stack with unprocessed, =unknown heights
        if (node.right) {
          stack.push([node.right, -1, -1]);
        } else {
          // no right child, set right height to 0
          top[2] = 0;
        }
      }
      // both children processed, now process the parent node
      else {
        // remove the processed current node from the stack;
        stack.pop();

        /* returns the greater of the two values, leftHeight and rightHeight; Math.max determines which subtree 
        is taller because the height of a node is always one more than the height of its tallest child subtree */
        let currentHeight = 1 + Math.max(leftHeight, rightHeight);

        // check balance condition
        if (Math.abs(leftHeight - rightHeight) > 1) {
          console.log("false");
          return false;
        }

        // update the parent node's record of its children's heights, if there are still nodes in the stack
        if (stack.length > 0) {
          // access the last element of the stack, the parent node of the current node
          let peek = stack[stack.length - 1];

          // determine if the current node is the left child of the parent node
          if (peek[0].left === node) {
            // update left child height in the parent node's stack frame
            peek[1] = currentHeight;
          } else {
            // update right child height at parent in the parent node's stack frame
            peek[2] = currentHeight;
          }
        }
      }
    }
    console.log("true");
    // if all nodes are processed without finding an imbalance, the tree is balanced
    return true;
  }

  otherIsBalanced() {
    // PROJECT STEP #10
    if (this.root === null) return true;

    const queue = [];

    queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();

      if (current.left != null) queue.push(current.left);
      if (current.right != null) queue.push(current.right);

      let leftSubtreeHeight = this.heightHelper(current.left);
      let rightSubtreeHeight = this.heightHelper(current.right);
      let heightDifference = Math.abs(leftSubtreeHeight - rightSubtreeHeight);

      if (heightDifference > 1) {
        console.log("false");
        return false;
      }
    }
    console.log("true");
    return true;
  }

  rebalance() {
    // PROJECT STEP #11

    // do an in-order traversal of an unbalanced tree and pass the resulting array to the buildTree callback
    let balancedBST = this.inOrder(buildTree);

    // log buildTree's return value
    console.log(balancedBST);

    // return that return value
    return balancedBST;
  }
  /*

    Node {
      data: 8,
      left: Node {
        data: 4,
        left: Node { 
          data: 1, 
          left: null, 
          right: Node { 
            data: 3,
            left: Node { 
              data: 2,
              left: null,
              right: null 
                        }
            right: null 
                      }

                    },
        right: Node { 
          data: 5, 
          left: null, 
          right: Node { 
            data: 7,
            left: null,
            right: null 
                      } 
                    }
      },
      right: Node { 
        data: 67,
        left: Node { 
          data: 9, 
          left: null, 
          right: Node { 
            data: 23,
            left: null,
            right: null
                      } 
                    },
        right: Node { 
          data: 324, 
          left: null, 
          right: Node { 
            data: 6345,
            left: null,
            right: null
                      }
                    }
                   }
                  }
        }
*/
}

export { Node, Tree };
