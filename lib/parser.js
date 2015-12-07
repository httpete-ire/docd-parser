'use strict';

var inlineRules = require('./expressions.js').inline;
var Node = require('./node.js');
var Tree = require('./tree.js');

/**
 * Parser component in a Markdown compiler, also known as a syntax
 * analyzer. Responsible for analyzing a stream of tokens and creating
 * an Abstract syntax tree representation of the source code.
 * @param {Object} options [description]
 */
function Parser(options) {

  /**
   * option object
   * @type {object}
   */
  this.options = options || {};

  /**
   * object that contains the Regular Expreesions to match Commonmark
   * inline components
   * @type {Object}
   */
  this.rules = inlineRules;

  /**
   * collection of tokens
   * @type {Array}
   */
  this.tokens = null;

  /**
   * current token
   * @type {Object}
   */
  this.token = null;

  /**
   * index of tokens that have been analyzed
   * @type {Number}
   */
  this.tokenIndex = 0;

  /**
   * Abstract syntax tree representation of the input
   * @type {Tree}
   */
  this.ast = new Tree('document');
}

Parser.prototype = {

  // set the constructor function
  constructor: Parser,

  /**
   * set the token to be the next token in the stream and increase
   * the tokenIndex, return the token
   * @return {Object}
   */
   nextToken: function() {
     this.token = this.tokens[this.tokenIndex++];
     return this.token;
   },

  /**
   * return the next token in the stream without increasing the tokenIndex
   * @return {Object}
   */
  peek: function() {
    return this.tokens[this.tokenIndex];
  }


};

module.exports = Parser;
