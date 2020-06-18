// Each node in a BST holds a key, a value, and left and right pointers. /// The left and right pointers point to the left and right child nodes.

// represents a single node in the tree
// can optionally pass in a key, a value, and a pointer to the parent node
class BinarySearchTree {
  // If key property is null, object represents an empty tree
  // If parent pointer is null, it is a root node
  // The node starts with the left and right pointers to their child nodes being null
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  // with insertion, you have to iterate to the height of the tree
  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
      // If tree already exists, start at the root, and compare it to the key you want to insert.
    } else if (key < this.key) {
      // If the existing node does not have a left child (`left` pointer is empty), then instantiate and insert the new node as the left child of that node, passing `this` as the parent
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
        // If the node has an existing left child, recursively call the `insert` method so the node is added further down the tree
      } else {
        this.left.insert(key, value);
      }
    // if the new key is greater than the node's key, recursively call the `insert` method so the node is added further down the tree, but on the right-hand side
    } else {
      this.right.insert(key, value);
    }
  }

  // Retrieval of nodes follows the same pattern as insertion
  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
          this.parent.left = node;
      }
      else if (this == this.parent.right) {
          this.parent.right = node;
      }

      if (node) {
          node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

module.exports = BinarySearchTree;

// ----

// Without running this code in your code editor, explain what the following program does. Show with an example the result of executing this program. What is the runtime of this algorithm?
function tree(t){
    // if the tree is empy, return 0
  if(!t){
    return 0;
  }
  // Sums up all the nodes of a tree.
  return tree(t.left) + t.value + tree(t.right)
}
// time complexity is linear
//runtime is O(n), I think
