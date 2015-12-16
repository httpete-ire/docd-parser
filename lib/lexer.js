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
    var i;

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

      // match a code fence
      if((match = this.rules.codeFence.exec(src)) !== null) {

        src = src.substring(match[0].length);

        token = {
          type: 'code fence',
          value: match[2]
        };

        this.tokens.push(token);
        continue;
      }

      // match a horizontal rule
      if ((match = this.rules.horizontalRule.exec(src)) !== null) {
        src = src.substring(match[0].length);

        token = {
          type: 'horizontal rule'
        };

        this.tokens.push(token);
        continue;
      }

      // match a Markdown header and create a 'Heading' token
      if((match = this.rules.heading.exec(src)) !== null) {

        // remove the matched heading from the string
        src = src.substring(match[0].length);

        token = {
          type: 'header',
          value: match[2],
          depth: match[1].length
        };

        this.tokens.push(token);
        continue;
      }

      if((match = this.rules.tables.exec(src)) !== null) {
        src = src.substring(match[0].length);

        token = {
          type: 'table',
          // replace leading and trailing spaces and '|'
          // and convert into array of value
          headers: match[1].replace(/^ *|\| *$/g, '').split(/ *\| */),

          // split the table by newline character
          body: match[2].replace(/\n$/, '').split('\n')
        };

        // remove spaces and '|' at the start and end of each cell
        for(i = 0; i < token.body.length; i++) {
          token.body[i] = token.body[i]
                              .replace(/^ *\| */g,'')    // replace space and '|' at start of string
                              .replace(/ *\| *$/g, '')   // replace space and '|' at end of string
                              .split(/ *\| */);
        }

        this.tokens.push(token);
        continue;
      }

      if((match = this.rules.paragraph.exec(src)) !== null) {

        src = src.substring(match[0].length);

        token = {
          type: 'paragraph',
          value: match[0]
        };

        this.tokens.push(token);
        continue;
      }

    }

    return this.tokens;
  }

};


module.exports = Lexer;
