/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0; // Tree is empty, so minimum depth is 0.

    let queue = [[this.root, 1]]; // Queue now stores both the node and its depth.

    while (queue.length > 0) {
      const [current, depth] = queue.shift();

      if (!current.left && !current.right) return depth; // Found a leaf node, return the current depth.
      if (current.left) queue.push([current.left, depth + 1]); // Enqueue left child with depth increased by 1.
      if (current.right) queue.push([current.right, depth + 1]); // Enqueue right child with depth increased by 1.
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0; // Tree is empty, so minimum depth is 0.

    let queue = [[this.root]]; // Queue now stores both the node and its depth.
    let depth = 1;

    while (queue[0]) {
      const [current] = queue.pop();

      if (current.left || current.right) depth++; // increase depth
      if (current.right) queue.push([current.right]); // Enqueue right child
      if (current.left) queue.push([current.left]); // Enqueue left child
    }

    return depth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    // Initialize a variable to keep track of the maximum sum found so far
    let result = 0;

    // Helper function to find the maximum sum along a path in the binary tree
    function maxSumHelper(node) {
      // Base case: If the node is null, return 0 (no sum for a null node)
      if (node === null) return 0;

      // Recursively calculate the maximum sum of the left subtree
      const leftSum = maxSumHelper(node.left);

      // Recursively calculate the maximum sum of the right subtree
      const rightSum = maxSumHelper(node.right);

      // Calculate the sum considering the current node and its subtrees
      const currentSum = node.val + leftSum + rightSum;

      // Update the overall maximum sum (result) if a larger sum is found
      result = Math.max(result, currentSum);

      // Return the maximum sum possible considering either the left or right subtree,
      // and the current node. If either leftSum + node.val or rightSum + node.val is negative,
      // we just return 0, discarding negative paths and only considering non-negative paths.
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    // Call the helper function to start the recursive traversal from the root of the binary tree
    maxSumHelper(this.root);

    // Return the maximum sum found along any path in the binary tree
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null; // Empty tree, return null.

    let current = this.root;
    let nextLargerValue = null;
    let stack = [];

    while (current || stack.length) {
      // Traverse to the leftmost node.
      while (current) {
        stack.push(current);
        current = current.left;
      }

      // Process the leftmost node.
      current = stack.pop();
      if (current.val > lowerBound) {
        // Update nextLargerValue if the current node's value is larger than lowerBound.
        if (nextLargerValue === null || current.val < nextLargerValue) {
          nextLargerValue = current.val;
        }
      }

      // Move to the right subtree.
      current = current.right;
    }

    return nextLargerValue;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {}

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

let smallLeft = new BinaryTreeNode(5);
let smallRight = new BinaryTreeNode(5);
let smallRoot = new BinaryTreeNode(6, smallLeft, smallRight);
smallTree = new BinaryTree(smallRoot);

// build large tree
let node6 = new BinaryTreeNode(1);
let node5 = new BinaryTreeNode(1);
let node4 = new BinaryTreeNode(2);
let node3 = new BinaryTreeNode(3, node4, node6);
let node20 = new BinaryTreeNode(5, node3, node5);
let node1 = new BinaryTreeNode(5);
let root1 = new BinaryTreeNode(6, node1, node20);
largeTree = new BinaryTree(root1);

// this one
let node100 = new BinaryTreeNode(100);
let node8 = new BinaryTreeNode(8);
let nodeNeg4 = new BinaryTreeNode(-4);
let node2 = new BinaryTreeNode(2, nodeNeg4);
let nodeNeg3 = new BinaryTreeNode(-3, node8, node100);
let root = new BinaryTreeNode(10, node2, nodeNeg3);
let tree = new BinaryTree(root);

console.log(largeTree.maxSum(), "- should be: 21"); // 21
console.log(smallTree.maxSum(), "- should be 16"); // 16
console.log(tree.maxSum(), "- should be 109"); // 109

module.exports = { BinaryTree, BinaryTreeNode };
