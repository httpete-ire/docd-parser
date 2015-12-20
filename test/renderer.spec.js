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

});
