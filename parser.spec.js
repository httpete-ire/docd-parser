// load test modules
var chai = require('chai');
var expect = chai.expect;

var Parser = require('./../lib/parser');

describe('Parser class', function() {
  'use strict';

  var parser;

  beforeEach(function() {
    parser = new Parser();
  });

  it('should be an instance of the Parser class', function() {
    expect(parser).to.be.instanceof(Parser);
    expect(parser.rules).to.be.an('object');
  });

});
