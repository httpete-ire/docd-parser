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
    var node;
    this.tokens = tokens;

    while(this.token = this.nextToken()) {
      node = this._parseToken(this.token);
      if(node) {
        this.ast.add(node);
      }
    }

    return this.ast;
  },

    /**
     * depending on token type, select the method to parse that
     * particular token
     * @param  {Object} token
     * @return {Node}   node
     */
    _parseToken: function(token) {
      var node = null;

      switch (token.type) {
        case 'header':
          node = this._parseHeader(token);
          break;
        default:
          console.log('we will parse that node type soon');
      }
      return node;
    },


  /**
   * parse a header token and create an internal header node, the nodes value
   * is parsed as children nodes of the header node
   * @param  {Object} token
   * @return {Node}   node
   */
  _parseHeader: function(token) {
    var node = new Node('header', null);

    // set the header depth on the node
    node.depth = token.depth;

    node = this._inlineParse(token.value, node);

    return node;
  },

  /**
   * create a 'codeBlock' node, they cannot have inline components
   * so inline parsing does not need to be done
   * @param  {Object} token
   * @return {Node}
   */
  _parseCode: function(token) {
    var node = new Node('codeBlock', token.value);
    return node;
  },

  /**
   * create a 'codeBlock' node, they cannot have inline components
   * so inline parsing does not need to be done
   * @param  {Object} token
   * @return {Node}
   */
  _parseCodeFence: function(token) {
    return this._parseCode(token);
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

      if((match = this.rules.strong.start.exec(src)) !== null) {
        // either * or _
        delimiter = match[1];

        match = this.rules.strong.end.exec(src);

        // ensure delimiter at end matches delimiter at start
        if(match && delimiter === match[2]) {
          src = src.substring(match[0].length);

          node = new Node('strong', null);

          // recursive parse the value passing the node as the parentNode,
          // new nodes will get attached to it
          this._inlineParse(match[1].substring(delimiter.length), node);

          // attach node to parent
          parentNode.addChild(node);
        }
      }

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
