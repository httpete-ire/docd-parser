'use strict';

var blockRules = require('./expressions.js').block;

/**
 * lexical analyzer to convert a string input into a collection of tokens
 * which can be consumed by the parser
 * @param {Object} options [description]
 */
function Lexer(options) {

  /**
   * option object
   * @type {object}
   */
  this.options = options || {};

  /**
   * collection of tokens
   * @type {Array}
   */
  this.tokens = [];

  /**
   * object that contains the Regular Expreesions to match Commonmark
   * block level components
   * @type {Object}
   */
  this.rules = blockRules;
}

Lexer.prototype = {

  constructor: Lexer,
};


module.exports = Lexer;
