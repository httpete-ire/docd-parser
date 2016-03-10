'use strict';

var Lexer = require('./lexer.js');
var Parser = require('./parser.js');
var Renderer = require('./renderer.js');

function DocdParser(opts) {
  this.lexer = new Lexer();
  this.parser = new Parser();
  this.renderer = new Renderer();
}

DocdParser.prototype = {

  constructor: DocdParser,

  render: function(src) {
    var html;

    var tokens = this.lexer.tokenize(src);
    var ast = this.parser.parse(tokens);
    html = this.renderer.render(ast);

    return html;
  }


};

module.exports = DocdParser;

// export DocdParser globally
global.DocdParser = DocdParser;
