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

    describe('heading', function() {

      it('should return a valid "Heading" token', function() {
        var input = '# hello world';
        var result = lexer.tokenize(input);
        var token = result[0];

        expect(result.length).to.equal(1);
        expect(token.type).to.equal('header');
        expect(token.value).to.equal('hello world');
      });

    });

    describe('Code block', function() {

      it('should match a code block by 4 spaces', function() {

        var input  = '    function() {}';
        var result = lexer.tokenize(input);
        var token = result[0];

        expect(result.length).to.equal(1);
        expect(token.type).to.equal('code block');

        // removes whitespace
        expect(token.value[0]).to.equal('f');
      });

    });

    describe('Code fences', function() {

      it('should match with three ` open tags and three ` closing tags', function(){

        var input = '``` \n code block ```';
        var result = lexer.tokenize(input);
        var token = result[0];

        expect(result.length).to.equal(1);
        expect(token.type).to.equal('code fence');
      });

    });

    describe('Paragraph', function() {

      it('should match a paragraph', function() {
        var input = 'this is a paragraph';
        var result = lexer.tokenize(input);
        var token = result[0];

        expect(result.length).to.equal(1);
        expect(token.type).to.equal('paragraph');
      });

    });

    describe('Horizontal Rule', function() {
      it('should match a horizontal rule', function() {
        var input = '--------';
        var result = lexer.tokenize(input);
        var token = result[0];

        expect(result.length).to.equal(1);
        expect(token.type).to.equal('horizontal rule');
      });
    });

    describe('Table', function() {
      it('should match a table', function() {
        var input = '| name | age |\n |------|-----|\n | Pete | 29  |\n | Max  | 0   |';
        var result = lexer.tokenize(input);
        var token = result[0];

        expect(result.length).to.equal(1);
        expect(token.type).to.equal('table');
      });
    });

  });

});
