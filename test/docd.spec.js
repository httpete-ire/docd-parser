// load test modules
var chai = require('chai');
var expect = chai.expect;

var DocdParser = require('./../lib/docdparser');
console.log(DocdParser);

describe('DocdParser class', function() {
  'use strict';

  var docdParser;

  beforeEach(function() {
    docdParser = new DocdParser();
  });

  it('should be an instance of DocdParser', function() {
    expect(docdParser).to.be.instanceof(DocdParser);
  });

  it('should render Markdown into HTML', function() {
    var input = '### hello world\n__this__ is strong';
    var html = docdParser.render(input);
    expect(html).to.equal('<h3>hello world</h3>\n<p><strong>this</strong> is strong</p>\n');
  });

});
