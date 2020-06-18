const BinarySearchTree = require('./BSTclass');

function main() {
  let bst = new BinarySearchTree();
  let values = [3, 1, 4, 6, 9, 2, 5, 7];
  for (let value of values) {
    bst.insert(value, null);
  }
  console.log(bst);
}

// Write an algorithm to find the height of a binary search tree. What is the time complexity of your algorithm?
function findHeight(bst) {
  if (!bst) {
    return 0;
    // no tree
  } else if (findHeight(bst.left) > findHeight(bst.right)) {
    return findHeight(bst.left) + 1;
    // if there is a tree, and there is a left key but
  } else {
    return findHeight(bst.right) + 1;
  }
}

function findHeight(bst) {
  let counter = 0;
  if (bst.left && bst.right) {
    return Math.max(
      ...[
        findHeight(
          bst.left,
          counter + 1
        ),
        findHeight(
          bst.right,
          counter + 1
        )
      ]
    );
  } else if (bst.left && !bst.right) {
    return findHeight(
      bst.left,
      counter + 1
    );
  } else if (!bst.left && bst.right) {
    return findHeight(
      bst.right,
      counter + 1
    );
  } else {
    return counter;
  }
}

//maybe

// Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming the tree does not contain duplicates.

function isItBST(bst) {
  if (!bst) {
    return null;
    // no tree
  }
  if (bst.left === null && bst.right === null) {
    return null; //there are no children...does that make it a binary search tree? if so, return true;
  }
  if (bst.left !== null && bst.right === null) {
    return isItBST(t.left);
  }
  if (bst.right !== null && bst.left === null) {
    return isItBST(bst.right);
  }
  if (bst.left !== null && bst.right !== null) {
    if (bst.left.value < bst.right.value) { //if the left node value is less than the right node value
      return isItBST(bst.left) && isItBST(bst.right);
    } else {
      return false;
    }
  }
}

// Write an algorithm that checks if a BST is balanced (i.e., a tree where no 2 leaves differ in distance from the root by more than 1).
function isItBalanced(bst) {
  let distance = 0
  if (bst.parent === null) {
    let leaves = [
      ...isItBalanced(bst.left, distance),
      ...isItBalanced(bst.right, distance)
    ];

    for (let leaf of leaves) {
      for (let leaf2 of leaves) {
        if (
          // ath.abs function returns the absolute value of a number
          Math.abs(leaf - leaf2) > 1
        ) {
          return false;
        }
      }
    }
  }
  if (bst.left && bst.right) {
    return [
      ...isItBalanced(
        bst.left,
        ++distance
      ),
      ...isItBalanced(bst.right, distance)
    ];
  } else if (bst.left) {
    return [
      ...isItBalanced(
        bst.left,
        ++distance
      )
    ];
  } else if (bst.right) {
    return [
      ...isItBalanced(
        bst.right,
        ++distance
      )
    ];
  } else {
    return [++distance];
  }
}

// You are given two arrays which represent two sequences of keys that are used to create two binary search trees.
// Write a program that will tell whether two BSTs will be identical or not without actually constructing the tree. You may use another data structure such as an array or a linked list but don't construct the BST.

//What is the time complexity of your algorithm?

// E.g., 3, 5, 4, 6, 1, 0, 2 and 3, 1, 5, 2, 4, 6, 0 are two sequences of arrays but will create the exact same BSTs and your program should return true.
function identicalBST(arrA, arrB) {
  // will not work if numbers are sorted as strings!
  arrA.sort();
  arrB.sort();
  if (arrA.length !== arrB.length) {
    // if the lengths of the arrays are not equal, then they can't be identical
    return false;
  }
  for (let i = 0; i < arrA.length; i++) {
    //iterate over each item in arrA and compare that item with the corresponding item in arrB....I think
    if (arrA[i] !== arrB[i]) {
      return false;
    } else {
      return true;
    }
  }
}

// this probably works, linear time complexity, depends on amount of items in the array, so worst case scenario is O(n), I think
