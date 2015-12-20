'use strict';

/**
 * Renderer component of the markdown compiler. Will traverse the AST
 * and output valid HTML based on the node type eg 'Header', 'List' etc
 * @param {Object} opts
 */
function Renderer(opts) {
  this.options = opts || {};
}

Renderer.prototype = {

  constructor: Renderer,

  /**
   * traverse an AST and render HTML
   * @param  {Tree} ast AST to traverse and render
   * @return {String}     [description]
   */
  render: function(ast) {
    return this._renderNodes(ast.root);
  },

  /**
   * render a html string representation of an AST, if the rootNode has child
   * nodes these are traversed and the HTML is built. Otherwise render the rootNode itself
   * @param  {Node} rootNode AST node object
   * @return {String} string representation of a HMTL element
   */
  _renderNodes: function (rootNode) {
    var self = this;
    var output = '';

    if (rootNode.hasChildren()) {
      rootNode.children.forEach(function(childNode){
        output += self._renderNode(childNode);
      });
    } else {
      output += self._renderNode(rootNode);
    }

    return output;
  },

  /**
   * based on the node type, call a specific render function
   * @param  {Node} node AST node object
   * @return {String} string representation of a HMTL element
   */
  _renderNode: function(node) {
    var output = '';

    switch (node.type) {
      case 'text':
        output += this._renderText(node);
        break;
      default:
        output = '';
    }

    return output;
  },

  /**
   * return the string value of a node or if not set return an empty string
   * @param  {Node} node AST node object
   * @return {String} string value of node
   */
  _renderText: function(node) {
    return node.value || '';
  },

  /**
   * return a horizontal rule and
   * @return {String} string representation of a 'hr' HTML element
   */
  _renderHorizontalRule: function() {
    return '<hr />\n';
  },

  /**
   * return a paragraph element and render its inner value
   * @param  {Node} node AST node object
   * @return {String} string representation of a 'p' HTML element
   */
  _renderParagraph: function(node) {
    return '<p>' + this._renderNodes(node) + '</p>';
  }

};

module.exports = Renderer;
