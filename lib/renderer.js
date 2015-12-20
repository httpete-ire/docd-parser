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
   * return the string value of a node or if not set return an empty string
   * @param {Node} node
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
  }

};

module.exports = Renderer;
