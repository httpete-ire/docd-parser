'use strict';

var Node = require('./node');

/**
 * A tree is a data structure that simulates hierarchical data with nodes.
 * Each node of a tree holds its own data and pointers to other nodes.
 * @param {String} rootType type of root node
 */
function Tree(rootType) {

  /**
   * root node of tree
   * @type {Node}
   */
  this.root = new Node(rootType);
}

Tree.prototype = {
  constructor: Tree,

  /**
   * traverse every node in the tree and pass the current Node
   * to the callback function, the traversal is pre-order so
   * the parent node is visted before its children nodes
   *
   * @param  {Function} cb
   */
  traverse: function(cb) {

    (function _traverse(currentNode) {

      // execute callback function with current node
      cb(currentNode);

      // if node has children recursively call the _traverse function
      if (currentNode.hasChildren()) {

        for (var i = 0; i < currentNode.children.length; i++) {
          _traverse(currentNode.children[i]);
        }

      }

    })(this.root);

  },

  /**
   * add a Node to a parent node, if the parentNode is not set
   * default to the root node
   * @param  {Node} node
   * @param  {Node} parentNode
   */
  add: function(node, parentNode) {
    var parent = parentNode || this.root;
    parent.addChild(node);
  }

};

module.exports = Tree;
