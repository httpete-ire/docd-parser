// load test modules
var chai = require('chai');
var expect = chai.expect;

var Parser = require('./../lib/parser');
var Tree = require('./../lib/tree.js');
var Node = require('./../lib/node');

describe('Parser class', function() {
  'use strict';

  var parser;

  beforeEach(function() {
    parser = new Parser();
    parser.tokens = [{ type: 'header' }, { type: 'list' }, { type: 'code block'}];
  });

  it('should be an instance of the Parser class', function() {
    expect(parser).to.be.instanceof(Parser);
    expect(parser.rules).to.be.an('object');
    expect(parser.ast).to.be.instanceOf(Tree);
  });

  it('should fetch the next token in the stream and increase the tokenIndex', function() {
    var result = parser.nextToken();
    expect(result.type).to.equal('header');
    expect(parser.tokenIndex).to.equal(1);
  });

  it('should fetch the next token without increasing the tokenIndex', function() {
    var result = parser.peek();
    expect(result.type).to.equal('header');
    expect(parser.tokenIndex).to.equal(0);
  });

  describe('parse method', function() {

    it('should return an AST', function() {
      var result = parser.parse(parser.tokens);
      expect(result).to.be.instanceOf(Tree);
    });

  });

  it('parse a header block', function() {
    var result = parser._parseHeader({ value: 'this is a header __bold__', depth: 3});
    expect(result).to.be.instanceOf(Node);
    expect(result.type).to.equal('header');
    expect(result.depth).to.equal(3);

    expect(result.children.length).to.equal(2);

    expect(result.children[0].type).to.equal('text');
    expect(result.children[1].type).to.equal('strong');
    expect(result.children[1].children[0].type).to.equal('text');
  });

  it('parse a code block', function() {
    var result = parser._parseCode({ value: 'function(){}'});
    expect(result).to.be.instanceOf(Node);
    expect(result.type).to.equal('codeBlock');
    expect(result.value).to.equal('function(){}');
    expect(result.children.length).to.equal(0);
  });

  it('parse a code fence', function() {
    var result = parser._parseCodeFence({ value: 'function(){}'});
    expect(result).to.be.instanceOf(Node);
    expect(result.type).to.equal('codeBlock');
    expect(result.value).to.equal('function(){}');
    expect(result.children.length).to.equal(0);
  });

  it('parse a paragraph block', function() {
    var result = parser._parseParagraph({value: 'this is a __asdcnadsjn__'});
    expect(result).to.be.instanceOf(Node);
    expect(result.type).to.equal('paragraph');
    expect(result.children.length).to.be.above(0);
  });

  it('parse a table', function() {
    var result = parser._parseTable({
      type: 'table',
      headers: ['name', 'age'],
      body: [
        ['pete', '29'],
        ['max', '27']
      ]
    });

    expect(result).to.be.instanceOf(Node);
    expect(result.type).to.equal('table');
    // console.log(result);
  });

  it('parse a horizontal rule', function() {
    var result = parser._parseHorizontalRule({
      type: 'horizontal rule'
    });

    expect(result).to.be.instanceOf(Node);
    expect(result.type).to.equal('horizontal rule');
  });

  it('parse a emphasis tag', function() {
    var result = parser._parseParagraph({value: '_asdcnadsjn_'});
    expect(result).to.be.instanceOf(Node);
    expect(result.children[0].type).to.equal('em');
  });

  it('parse a link', function() {
    var result = parser._parseParagraph({value: '[httpete](www.httpete "httpete")'});
    expect(result).to.be.instanceOf(Node);
    expect(result.children[0].type).to.equal('link');
    expect(result.children[0].href).to.equal('www.httpete');
    expect(result.children[0].title).to.equal('httpete');
  });

});
