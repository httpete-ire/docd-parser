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

  describe('tokenize method', function() {

    describe('Header component', function() {

      it('should return a valid "Heading" token', function() {
        var input = '# hello world';
        var result = lexer.tokenize(input);
        var token = result[0];

        expect(result.length).to.equal(1);
        expect(token.type).to.equal('Heading');
        expect(token.value).to.equal('hello world');
      });

      it('should not accept a invalid heading', function() {
        var input = '#abcshbschbs';
        var result = lexer.tokenize(input);

        expect(result.length).to.equal(0);
      });

    });


  });

});
