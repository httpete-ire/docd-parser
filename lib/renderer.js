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

};

module.exports = Renderer;
