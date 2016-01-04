'use strict';

/**
 * implmentation of a node of a tree which contains a value
 * and a refence to its children
 *
 * @param {String} type   type of Node eg 'Heading'
 * @param {String} value  value for Node eg 'hello world'
 * @param {Node} parent   pointer to the parent node
 */
function Node(type, value, parent) {

  /**
   * type of the node
   * @type {String}
   */
  this.type = type;

  /**
   * value of the node
   * @type {String}
   */
  this.value = value;

  /**
   * pointer to a parent node
   * @type {Object}
   */
  this.parent = parent || null;

  /**
   * pointer to children nodes
   * @type {Array}
   */
  this.children = [];
}

Node.prototype = {

  // restore the constructor
  constructor: Node,

  /**
   * return if the node has any children node
   * @return {Boolean}
   */
  hasChildren: function() {
    return this.children.length > 0;
  },

  addChild: function(node) {
    // set the parent of the new node to point to the current node
    node.parent = this;
    this.children.push(node);
  },

};

module.exports = Node;
