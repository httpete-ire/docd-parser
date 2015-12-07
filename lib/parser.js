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
  },


  /**
   * parse the string of tokens against the inline production rules
   * to create the Abstract syntax tree (AST), a tree representation of
   * the source code. The AST is returned when the parsing phase has complete
   * @param  {Array} streams of tokens to parse
   * @return {Tree Object} AST
   */
  parse: function(tokens) {
    this.tokens = tokens;

    while(this.token = this.nextToken()) {
      console.log(this.token);
    }

    return this.ast;
  },

  /**
   * parse a header token and create an internal header node, the nodes value
   * is parsed as children nodes of the header node
   * @param  {Object} token
   * @return {Node}   node
   */
  _parseHeader: function(token) {
    if (!token) {
      return null;
    }

    var node = new Node('header', null);

    // set the header depth on the node
    node.depth = token.depth;

    node = this._inlineParse(token.value, node);

    return node;
  },


  /**
   * parse a value for inline Markdown components, attach the new nodes to the
   * parent node and return the parent node
   * @param  {String} src
   * @param  {Node} parentNode
   * @return {Node} parentNode
   */
  _inlineParse: function(src, parentNode) {

    var node;
    var match;
    var delimiter;

    while(src) {

      // match a text
      if((match = this.rules.text.exec(src)) !== null) {
        src = src.substring(match[0].length);

        node = new Node('text', match[0]);
        parentNode.addChild(node);
        continue;
      }

    }

    return parentNode;
  }


};

module.exports = Parser;
