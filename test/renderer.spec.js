// load test modules
var chai = require('chai');
var expect = chai.expect;
var Renderer = require('./../lib/renderer.js');
var Parser = require('./../lib/parser');
var Lexer = require('./../lib/lexer');

describe('renderer class', function() {
  'use strict';

  var renderer;
  var parser;
  var lexer;

  beforeEach(function() {
    renderer = new Renderer();
    parser = new Parser();
    lexer = new Lexer();
  });

  it('should parse a text node', function() {
    var input = {
      type: 'text',
      value: 'hello world'
    };
    var result = renderer._renderText(input);
    expect(result).to.equal('hello world');
  });

  it('should render a horizontal rule', function() {
    var result = renderer._renderHorizontalRule();
    expect(result).to.equal('<hr />\n');
  });

  it('should render a paragraph element', function() {
    var input = parser._parseParagraph({value: 'hello world'});
    var result = renderer._renderParagraph(input);
    expect(result).to.equal('<p>hello world</p>\n');
  });

  it('should render a table element', function() {
    var input = parser._parseTable({
      type: 'table',
      headers: ['name', 'age', 'gender'],
      body: [
        ['pete', '29', 'male'],
        ['max', '27', 'male']
      ]
    });
    var result = renderer._renderTable(input);
    expect(result).to.equal('<table class="table table-striped">\n<thead><th>name</th>\n<th>age</th>\n<th>gender</th>\n</thead>\n<tbody><tr><td>pete</td>\n<td>29</td>\n<td>male</td>\n</tr>\n<tr><td>max</td>\n<td>27</td>\n<td>male</td>\n</tr>\n</tbody>\n</table>\n');
  });

  it('should render a strong element', function() {
    var input = parser._parseParagraph({value: '__hello world__'});
    var result = renderer._renderParagraph(input);
    expect(result).to.equal('<p><strong>hello world</strong></p>\n');
  });

  it('should render an anchor element (link)', function() {
    var input = parser._parseParagraph({value: '[google](www.google.ie "Irish google")'});
    var result = renderer._renderParagraph(input);
    expect(result).to.equal('<p><a href="www.google.ie" title="Irish google">google</a></p>\n');
  });

  it('should render a blockquote', function() {
    var input = parser._parseBlockquote({value: '__hello world__'});
    var result = renderer._renderBlockquote(input);
    expect(result).to.equal('<blockquote>\n<p><strong>hello world</strong></p>\n</blockquote>\n');
  });

  it('should render a header', function() {
    var input = parser._parseHeader({ value: 'this is a header', depth: 3});
    var result = renderer._renderHeader(input);
    expect(result).to.equal('<h3>this is a header</h3>\n');
  });

  it('should render a code block', function() {
    var input = parser._parseCode({ value: 'function() { return this; }'});
    var result = renderer._renderCodeBlock(input);
    expect(result).to.equal('<pre><code>function() { return this; }</code></pre>\n');
  });

  it('should render an emphasis tag', function() {
    var input = parser._parseParagraph({value: '_hello_ world'});
    var result = renderer._renderParagraph(input);
    expect(result).to.equal('<p><em>hello</em> world</p>\n');
  });

  it('should render an inline code span', function() {
    var input = parser._parseParagraph({value: 'hello `world`'});
    var result = renderer._renderParagraph(input);
    expect(result).to.equal('<p>hello <code>world</code></p>\n');
  });

  it('should render an ordered list', function() {
    var input = '1. list item one\n  1. nest list';
    var tokens = lexer.tokenize(input);
    var ast = parser.parse(tokens);
    var result = renderer._renderNode(ast.root.children[0]);
    expect(result).to.equal('<ol>\n<li><p>list item one\n</p>\n<ol>\n<li><p>nest list</p>\n</li>\n</ol>\n</li>\n</ol>\n');
  });

  it('should render an unordered list', function() {
    var input = '* hello world\n  * nested list';
    var tokens = lexer.tokenize(input);
    var ast = parser.parse(tokens);
    var result = renderer._renderNode(ast.root.children[0]);

    expect(result).to.equal('<ul>\n<li><p>hello world\n</p>\n<ul>\n<li><p>nested list</p>\n</li>\n</ul>\n</li>\n</ul>\n');
  });

});
