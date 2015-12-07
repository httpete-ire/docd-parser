// load test modules
var chai = require('chai');
var expect = chai.expect;

var Parser = require('./../lib/parser');
var Tree = require('./../lib/tree.js');

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

});
