import { buildTree } from "./functions.js";

class Node {
  // project step #1
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  // project step #2
  constructor(arr) {
    this.root = buildTree(arr);
  }

  // method to insert a given value into the BST
  insert(data) {
    // project step #4
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
    // project step #4
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
    // project step #5
    this.root = this.searchNode(this.root, data);
  }

  // helper function that recursively finds the node with given data in BST
  searchNode(node, data) {
    if (node === null || node.data === data) {
      return node;
    }

    if (node.data < data) {
      return searchNode(node.right, data);
    }

    return this.searchNode(node.left, data);
  }

  // function that takes a root node and takes an optional callback on the data in the nodes in level order
  levelOrder(callback = console.log) {
    // project step #6
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

      // visit the node and calls the callback function on it
      callback(current.data);

      // push the addresses of children of this node into the queue
      // if the left child is not null, enqueue it into the queue
      if (current.left != null) q.push(current.left);

      // if the right child is not null, enqueue it into the queue
      if (current.right != null) q.push(current.right);
    }
  }
}

export { Node, Tree };
