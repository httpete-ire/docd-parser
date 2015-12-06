// load test modules
var chai = require('chai');
var expect = chai.expect;

var Parser = require('./../lib/parser');

describe('Parser class', function() {
  'use strict';

  var parser;

  beforeEach(function() {
    parser = new Parser();
    parser.tokens = [{ type: 'heading' }, { type: 'list' }, { type: 'code block'}];
  });

  it('should be an instance of the Parser class', function() {
    expect(parser).to.be.instanceof(Parser);
    expect(parser.rules).to.be.an('object');
  });

  it('should fetch the next token in the stream and increase the tokenIndex', function() {
    var result = parser.nextToken();
    expect(result.type).to.equal('heading');
    expect(parser.tokenIndex).to.equal(1);
  });

  it('should fetch the next token without increasing the tokenIndex', function() {
    var result = parser.peek();

    expect(result.type).to.equal('heading');
    expect(parser.tokenIndex).to.equal(0);
  });

});