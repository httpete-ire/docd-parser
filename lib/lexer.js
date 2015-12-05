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

  /**
   * convert a string into a sequence of tokens, the tokens become input for the parser
   * eg Token: { type: 'Heading', value: 'hello world', depth: 3}
   * @param  {String}    src
   * @return {Array}     tokens
   */
  tokenize: function(src) {

    var token;
    var match;

    // continue analzing the text while it has a value
    while(src) {

      // skip over empty lines
      if((match = this.rules.newline.exec(src)) !== null) {
        src = src.substring(match[0].length);
        continue;
      }

      // match a code block
      if((match = this.rules.codeBlock.exec(src)) !== null) {
        src = src.substring(match[0].length);
        match = match[0].replace(/^ {4}/gm,'');

        token = {
          type: 'code block',
          value: match
        };

        this.tokens.push(token);
        continue;
      }


      // match a Markdown header and create a 'Heading' token
      if((match = this.rules.heading.exec(src)) !== null) {

        // remove the matched heading from the string
        src = src.substring(match[0].length);

        token = {
          type: 'Heading',
          value: match[2],
          depth: match[1].length
        };

        this.tokens.push(token);
        continue;
      }

      src = '';

    }

    return this.tokens;
  }

};


module.exports = Lexer;
