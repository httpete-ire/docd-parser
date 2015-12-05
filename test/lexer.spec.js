// load test modules
var chai = require('chai');
var expect = chai.expect;

var Lexer = require('./../lib/lexer');

describe('Lexer class', function() {
  'use strict';

  var lexer;

  beforeEach(function() {
    lexer = new Lexer();
  });

  it('should be an instance of Lexer', function() {
    expect(lexer).to.be.instanceof(Lexer);
    expect(lexer.rules).to.be.an('object');
  });

});
