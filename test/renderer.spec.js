// load test modules
var chai = require('chai');
var expect = chai.expect;
var Renderer = require('./../lib/renderer.js');
var Parser = require('./../lib/parser');

describe('renderer class', function() {
  'use strict';

  var renderer;
  var parser;

  beforeEach(function() {
    renderer = new Renderer();
    parser = new Parser();
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
    expect(result).to.equal('<p>hello world</p>');
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
    expect(result).to.equal('<table>\n<thead><th>name</th>\n<th>age</th>\n<th>gender</th>\n</thead>\n<tbody><tr><td>pete</td>\n<td>29</td>\n<td>male</td>\n</tr>\n<tr><td>max</td>\n<td>27</td>\n<td>male</td>\n</tr>\n</tbody>\n</table>\n');
  });

});
